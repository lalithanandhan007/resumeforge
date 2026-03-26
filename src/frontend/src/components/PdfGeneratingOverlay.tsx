import { motion } from "motion/react";

export default function PdfGeneratingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.78)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          minWidth: "320px",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "4px solid #E5E7EB",
            borderTopColor: "#2D7FF9",
            animation: "spin 0.9s linear infinite",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
              marginBottom: "6px",
            }}
          >
            Generating your resume...
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#6B7280",
              margin: 0,
            }}
          >
            Please wait while we prepare your PDF
          </p>
        </div>

        {/* Indeterminate progress bar */}
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#E5E7EB",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "40%",
              background: "linear-gradient(135deg, #2D7FF9, #7C3AED)",
              borderRadius: "99px",
              animation: "slide 1.4s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slide {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(250%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </motion.div>
  );
}
