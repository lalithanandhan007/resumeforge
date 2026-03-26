import type { Principal } from "@icp-sdk/core/principal";

export interface Some<T> {
  __kind__: "Some";
  value: T;
}
export interface None {
  __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface User {
  id: Principal;
  name: string;
  email: string;
  createdAt: bigint;
}

export interface Resume {
  id: string;
  userId: Principal;
  personalName: string;
  personalTitle: string;
  personalEmail: string;
  personalPhone: string;
  personalLocation: string;
  personalLinkedin: string;
  summary: string;
  experienceJson: string;
  educationJson: string;
  skillsJson: string;
  template: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Analytics {
  visitorCount: bigint;
  userCount: bigint;
  resumeCount: bigint;
}

export interface backendInterface {
  _initializeAccessControlWithSecret(secret: string): Promise<void>;
  // Analytics
  incrementVisitorCount(): Promise<void>;
  incrementUserCount(): Promise<void>;
  incrementResumeCount(): Promise<void>;
  getAnalytics(): Promise<Analytics>;
  // Users
  createUser(name: string, email: string): Promise<{ ok: User } | { err: string }>;
  getMe(): Promise<{ ok: User } | { err: string }>;
  // Resumes
  createResume(
    personalName: string,
    personalTitle: string,
    personalEmail: string,
    personalPhone: string,
    personalLocation: string,
    personalLinkedin: string,
    summary: string,
    experienceJson: string,
    educationJson: string,
    skillsJson: string,
    template: string,
  ): Promise<{ ok: string } | { err: string }>;
  getMyResumes(): Promise<Resume[]>;
  updateResume(
    id: string,
    personalName: string,
    personalTitle: string,
    personalEmail: string,
    personalPhone: string,
    personalLocation: string,
    personalLinkedin: string,
    summary: string,
    experienceJson: string,
    educationJson: string,
    skillsJson: string,
    template: string,
  ): Promise<{ ok: null } | { err: string }>;
  deleteResume(id: string): Promise<{ ok: null } | { err: string }>;
}
