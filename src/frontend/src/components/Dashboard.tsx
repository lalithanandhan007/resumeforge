import {
  Briefcase,
  Calendar,
  Edit2,
  FilePlus,
  Loader2,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Resume } from "../backend.d";
import { useActor } from "../hooks/useActor";
import type {
  EducationItem,
  ExperienceItem,
  ResumeData,
} from "../types/resume";
import AnalyticsStats from "./AnalyticsStats";

interface Props {
  onEditResume: (resume: Resume) => void;
  onCreateNew: () => void;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ResumeCardSkeleton({ id }: { id: string }) {
  return (
    <div
      className="rounded-xl p-4 animate-pulse"
      style={{
        backgroundColor: "oklch(0.17 0.03 255)",
        border: "1px solid oklch(0.22 0.035 255)",
      }}
      aria-hidden="true"
      data-skeleton-id={id}
    >
      <div
        className="h-4 rounded w-3/4 mb-2"
        style={{ backgroundColor: "oklch(0.22 0.04 255)" }}
      />
      <div
        className="h-3 rounded w-1/2 mb-4"
        style={{ backgroundColor: "oklch(0.20 0.03 255)" }}
      />
      <div className="flex gap-2">
        <div
          className="h-7 rounded w-16"
          style={{ backgroundColor: "oklch(0.20 0.03 255)" }}
        />
        <div
          className="h-7 rounded w-16"
          style={{ backgroundColor: "oklch(0.20 0.03 255)" }}
        />
      </div>
    </div>
  );
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c"];

export default function Dashboard({ onEditResume, onCreateNew }: Props) {
  const { actor, isFetching: isActorFetching } = useActor();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    if (!actor || isActorFetching) return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line
      const data = await (actor as any).getMyResumes();
      setResumes(data as Resume[]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resumes");
    } finally {
      setIsLoading(false);
    }
  }, [actor, isActorFetching]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  async function handleDelete(id: string) {
    if (!actor) return;
    setDeletingId(id);
    try {
      // eslint-disable-next-line
      const result = await (actor as any).deleteResume(id);
      if (result && "ok" in result) {
        toast.success("Resume deleted");
        setResumes((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error(result?.err ?? "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resume");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-6"
      style={{ backgroundColor: "oklch(0.12 0.025 255)" }}
    >
      {/* Analytics Stats */}
      <AnalyticsStats />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "oklch(0.95 0.015 255)" }}
          >
            My Resumes
          </h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "oklch(0.55 0.022 255)" }}
          >
            {isLoading
              ? "Loading..."
              : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        <button
          type="button"
          data-ocid="dashboard.create.primary_button"
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
        >
          <FilePlus className="w-4 h-4" />
          New Resume
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="dashboard.loading_state"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SKELETON_KEYS.map((k) => (
            <ResumeCardSkeleton key={k} id={k} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && resumes.length === 0 && (
        <motion.div
          data-ocid="dashboard.empty_state"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.18 0.04 260)" }}
          >
            <Briefcase
              className="w-8 h-8"
              style={{ color: "oklch(0.65 0.15 260)" }}
            />
          </div>
          <div>
            <p
              className="font-semibold text-base"
              style={{ color: "oklch(0.85 0.015 255)" }}
            >
              No resumes yet
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.55 0.022 255)" }}
            >
              Create your first resume and start building your career story.
            </p>
          </div>
          <button
            type="button"
            data-ocid="dashboard.empty.create.primary_button"
            onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
          >
            <FilePlus className="w-4 h-4" />
            Create New Resume
          </button>
        </motion.div>
      )}

      {/* Resume list */}
      {!isLoading && resumes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume, idx) => (
            <motion.div
              key={resume.id}
              data-ocid={`dashboard.item.${idx + 1}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{
                backgroundColor: "oklch(0.15 0.028 255)",
                border: "1px solid oklch(0.22 0.035 255)",
              }}
            >
              {/* Title */}
              <div className="flex-1">
                <p
                  className="font-semibold text-sm leading-tight"
                  style={{ color: "oklch(0.90 0.015 255)" }}
                >
                  {resume.personalName || "Untitled"}
                </p>
                {resume.personalTitle && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.60 0.022 255)" }}
                  >
                    {resume.personalTitle}
                  </p>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: "oklch(0.20 0.06 260)",
                    color: "oklch(0.75 0.15 260)",
                    border: "1px solid oklch(0.30 0.08 260)",
                  }}
                >
                  {resume.template}
                </span>
                <div
                  className="flex items-center gap-1"
                  style={{ color: "oklch(0.48 0.02 255)" }}
                >
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px]">
                    {formatDate(resume.createdAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  data-ocid={`dashboard.edit_button.${idx + 1}`}
                  onClick={() => onEditResume(resume)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: "oklch(0.20 0.05 260)",
                    color: "oklch(0.78 0.12 260)",
                    border: "1px solid oklch(0.28 0.07 260)",
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>

                {confirmDeleteId === resume.id ? (
                  <div className="flex-1 flex gap-1">
                    <button
                      type="button"
                      data-ocid={`dashboard.confirm_button.${idx + 1}`}
                      onClick={() => handleDelete(resume.id)}
                      disabled={deletingId === resume.id}
                      className="flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: "rgba(239,68,68,0.15)",
                        color: "#F87171",
                        border: "1px solid rgba(239,68,68,0.3)",
                      }}
                    >
                      {deletingId === resume.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "Yes"
                      )}
                    </button>
                    <button
                      type="button"
                      data-ocid={`dashboard.cancel_button.${idx + 1}`}
                      onClick={() => setConfirmDeleteId(null)}
                      className="flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: "oklch(0.20 0.03 255)",
                        color: "oklch(0.60 0.02 255)",
                        border: "1px solid oklch(0.28 0.04 255)",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    data-ocid={`dashboard.delete_button.${idx + 1}`}
                    onClick={() => setConfirmDeleteId(resume.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: "rgba(239,68,68,0.08)",
                      color: "#F87171",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper to convert a backend Resume back to form ResumeData
export function resumeToFormData(resume: Resume): ResumeData {
  let experience: ExperienceItem[] = [];
  let education: EducationItem[] = [];
  let skills: string[] = [];

  try {
    experience = JSON.parse(resume.experienceJson);
  } catch {
    experience = [];
  }
  try {
    education = JSON.parse(resume.educationJson);
  } catch {
    education = [];
  }
  try {
    skills = JSON.parse(resume.skillsJson);
  } catch {
    skills = [];
  }

  return {
    name: resume.personalName,
    title: resume.personalTitle,
    email: resume.personalEmail,
    phone: resume.personalPhone,
    location: resume.personalLocation,
    linkedin: resume.personalLinkedin,
    summary: resume.summary,
    experience,
    education,
    skills,
  };
}
