import { Loader2, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "oklch(0.12 0.025 255)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, oklch(0.20 0.06 260 / 0.25) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-6"
          style={{
            backgroundColor: "oklch(0.15 0.028 255)",
            border: "1px solid oklch(0.24 0.04 255)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #2D7FF9, #7C3AED)",
              }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: "oklch(0.95 0.015 255)" }}
              >
                ResumeForge
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.58 0.022 255)" }}
              >
                Build your career story
              </p>
            </div>
          </div>

          {/* Features list */}
          <div className="w-full space-y-2">
            {[
              "✏️  Build beautiful resumes in minutes",
              "🎨  8 professional templates (ATS + Premium)",
              "📄  Download as PDF — print-ready",
              "☁️  Save & manage multiple resumes",
            ].map((feat) => (
              <div
                key={feat}
                className="text-xs px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "oklch(0.18 0.03 255)",
                  color: "oklch(0.68 0.025 255)",
                }}
              >
                {feat}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            type="button"
            data-ocid="login.primary_button"
            onClick={() => {
              console.log("Login button clicked");
              login();
            }}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {isLoading ? "Signing in..." : "Sign in with Internet Identity"}
          </button>

          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.45 0.02 255)" }}
          >
            Decentralized & secure · No passwords needed
          </p>
        </div>

        {/* Footer */}
        <p
          className="text-center text-[10px] mt-4"
          style={{ color: "oklch(0.40 0.02 255)" }}
        >
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.58 0.22 260)" }}
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
