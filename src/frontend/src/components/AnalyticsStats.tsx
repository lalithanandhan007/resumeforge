import { Skeleton } from "@/components/ui/skeleton";
import { Eye, FileText, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  border: string;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const displayValue = useCountUp(stat.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-center gap-4 rounded-2xl px-5 py-4"
      style={{
        backgroundColor: "oklch(0.15 0.028 255)",
        border: `1px solid ${stat.border}`,
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: stat.bg }}
      >
        {stat.icon}
      </div>
      <div className="min-w-0">
        <p
          className="text-2xl font-bold tabular-nums"
          style={{ color: stat.accent }}
        >
          {displayValue.toLocaleString()}
        </p>
        <p
          className="text-xs mt-0.5 truncate"
          style={{ color: "oklch(0.60 0.022 255)" }}
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

function StatCardSkeleton() {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl px-5 py-4"
      style={{
        backgroundColor: "oklch(0.15 0.028 255)",
        border: "1px solid oklch(0.22 0.035 255)",
      }}
    >
      <Skeleton
        className="w-11 h-11 rounded-xl"
        style={{ backgroundColor: "oklch(0.20 0.035 255)" }}
      />
      <div className="space-y-2">
        <Skeleton
          className="h-6 w-16 rounded"
          style={{ backgroundColor: "oklch(0.20 0.035 255)" }}
        />
        <Skeleton
          className="h-3 w-24 rounded"
          style={{ backgroundColor: "oklch(0.18 0.03 255)" }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsStats() {
  const { actor, isFetching: isActorFetching } = useActor();
  const [visitors, setVisitors] = useState(0);
  const [users, setUsers] = useState(0);
  const [resumes, setResumes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActorFetching || !actor) return;

    let cancelled = false;
    (async () => {
      try {
        const data = await (actor as any).getAnalytics();
        if (cancelled) return;
        setVisitors(Number(data.visitorCount));
        setUsers(Number(data.userCount));
        setResumes(Number(data.resumeCount));
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [actor, isActorFetching]);

  const stats: Stat[] = [
    {
      label: "Total Visitors",
      value: visitors,
      icon: (
        <Eye className="w-5 h-5" style={{ color: "oklch(0.65 0.18 220)" }} />
      ),
      accent: "oklch(0.72 0.18 220)",
      bg: "oklch(0.18 0.05 220)",
      border: "oklch(0.26 0.07 220)",
    },
    {
      label: "Total Users",
      value: users,
      icon: (
        <Users className="w-5 h-5" style={{ color: "oklch(0.65 0.18 290)" }} />
      ),
      accent: "oklch(0.72 0.18 290)",
      bg: "oklch(0.18 0.05 290)",
      border: "oklch(0.26 0.07 290)",
    },
    {
      label: "Resumes Created",
      value: resumes,
      icon: (
        <FileText
          className="w-5 h-5"
          style={{ color: "oklch(0.65 0.18 155)" }}
        />
      ),
      accent: "oklch(0.72 0.18 155)",
      bg: "oklch(0.18 0.05 155)",
      border: "oklch(0.26 0.07 155)",
    },
  ];

  return (
    <div className="mb-6">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "oklch(0.50 0.022 255)" }}
      >
        Platform Stats
      </p>
      <div
        data-ocid="analytics.section"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {isLoading
          ? ["a", "b", "c"].map((k) => <StatCardSkeleton key={k} />)
          : stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 0.08} />
            ))}
      </div>
    </div>
  );
}
