import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

persistent actor {

  // ─── Types ────────────────────────────────────────────────────────────────

  type User = {
    id        : Principal;
    name      : Text;
    email     : Text;
    createdAt : Int;
  };

  type Resume = {
    id               : Text;
    userId           : Principal;
    personalName     : Text;
    personalTitle    : Text;
    personalEmail    : Text;
    personalPhone    : Text;
    personalLocation : Text;
    personalLinkedin : Text;
    summary          : Text;
    experienceJson   : Text;
    educationJson    : Text;
    skillsJson       : Text;
    template         : Text;
    createdAt        : Int;
    updatedAt        : Int;
  };

  type Analytics = {
    visitorCount : Nat;
    userCount    : Nat;
    resumeCount  : Nat;
  };

  // ─── Stable Storage ───────────────────────────────────────────────────────

  var userEntries   : [(Principal, User)] = [];
  var resumeEntries : [(Text, Resume)]    = [];
  var resumeCounter : Nat                 = 0;

  // Analytics counters (persist across upgrades as stable vars)
  var visitorCount : Nat = 0;
  var userCount    : Nat = 0;
  var resumeCount  : Nat = 0;

  // ─── Transient maps ────────────────────────────────────────────────────────

  transient var users   = HashMap.fromIter<Principal, User>(userEntries.vals(),   16, Principal.equal, Principal.hash);
  transient var resumes = HashMap.fromIter<Text, Resume>(resumeEntries.vals(), 64, Text.equal, Text.hash);

  system func preupgrade() {
    userEntries   := Iter.toArray(users.entries());
    resumeEntries := Iter.toArray(resumes.entries());
  };

  system func postupgrade() {
    users   := HashMap.fromIter<Principal, User>(userEntries.vals(), 16, Principal.equal, Principal.hash);
    resumes := HashMap.fromIter<Text, Resume>(resumeEntries.vals(), 64, Text.equal, Text.hash);
  };

  // ─── Analytics Functions ──────────────────────────────────────────────────

  public func incrementVisitorCount() : async () {
    visitorCount += 1;
  };

  public func incrementUserCount() : async () {
    userCount += 1;
  };

  public func incrementResumeCount() : async () {
    resumeCount += 1;
  };

  public query func getAnalytics() : async Analytics {
    { visitorCount; userCount; resumeCount }
  };

  // ─── User Functions ───────────────────────────────────────────────────────

  public shared(msg) func createUser(name : Text, email : Text) : async { #ok : User; #err : Text } {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?existing) { #ok(existing) };
      case null {
        let user : User = {
          id        = caller;
          name      = name;
          email     = email;
          createdAt = Time.now();
        };
        users.put(caller, user);
        #ok(user)
      };
    };
  };

  public shared(msg) func getMe() : async { #ok : User; #err : Text } {
    switch (users.get(msg.caller)) {
      case (?u) { #ok(u) };
      case null { #err("User not found") };
    };
  };

  // ─── Resume Functions ─────────────────────────────────────────────────────

  public shared(msg) func createResume(
    personalName     : Text,
    personalTitle    : Text,
    personalEmail    : Text,
    personalPhone    : Text,
    personalLocation : Text,
    personalLinkedin : Text,
    summary          : Text,
    experienceJson   : Text,
    educationJson    : Text,
    skillsJson       : Text,
    template         : Text,
  ) : async { #ok : Text; #err : Text } {
    let caller = msg.caller;
    resumeCounter += 1;
    let id = Principal.toText(caller) # "-" # Nat.toText(resumeCounter);
    let now = Time.now();
    let resume : Resume = {
      id; userId = caller;
      personalName; personalTitle; personalEmail; personalPhone;
      personalLocation; personalLinkedin;
      summary; experienceJson; educationJson; skillsJson;
      template; createdAt = now; updatedAt = now;
    };
    resumes.put(id, resume);
    #ok(id)
  };

  public shared(msg) func getMyResumes() : async [Resume] {
    let caller = msg.caller;
    let all = Iter.toArray(resumes.vals());
    Array.filter<Resume>(all, func(r) { Principal.equal(r.userId, caller) })
  };

  public shared(msg) func updateResume(
    id               : Text,
    personalName     : Text,
    personalTitle    : Text,
    personalEmail    : Text,
    personalPhone    : Text,
    personalLocation : Text,
    personalLinkedin : Text,
    summary          : Text,
    experienceJson   : Text,
    educationJson    : Text,
    skillsJson       : Text,
    template         : Text,
  ) : async { #ok; #err : Text } {
    let caller = msg.caller;
    switch (resumes.get(id)) {
      case null { #err("Resume not found") };
      case (?r) {
        if (not Principal.equal(r.userId, caller)) {
          return #err("Unauthorized");
        };
        let updated : Resume = {
          id; userId = caller;
          personalName; personalTitle; personalEmail; personalPhone;
          personalLocation; personalLinkedin;
          summary; experienceJson; educationJson; skillsJson;
          template; createdAt = r.createdAt; updatedAt = Time.now();
        };
        resumes.put(id, updated);
        #ok
      };
    };
  };

  public shared(msg) func deleteResume(id : Text) : async { #ok; #err : Text } {
    let caller = msg.caller;
    switch (resumes.get(id)) {
      case null { #err("Resume not found") };
      case (?r) {
        if (not Principal.equal(r.userId, caller)) {
          return #err("Unauthorized");
        };
        resumes.delete(id);
        #ok
      };
    };
  };

}
