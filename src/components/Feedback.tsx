import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  AlertOctagon,
  CircleAlert,
  type LucideIcon,
} from 'lucide-react';

export interface Toast {
  id: number;
  message: string;
  type: 'error' | 'warning';
}

interface ToastsProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export function Toasts({ toasts, onDismiss }: ToastsProps) {
  useEffect(() => {
    const timers = toasts.map((t) => setTimeout(() => onDismiss(t.id), 7000));
    return () => timers.forEach(clearTimeout);
  }, [toasts, onDismiss]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3 rounded-xl border border-ink-200/70 bg-white p-3.5 shadow-pop dark:border-ink-700 dark:bg-ink-950"
          >
            <div
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                t.type === 'error'
                  ? 'bg-score-low/10 text-score-low'
                  : 'bg-score-mid/10 text-score-mid'
              }`}
            >
              {t.type === 'error' ? (
                <AlertOctagon className="h-4 w-4" />
              ) : (
                <CircleAlert className="h-4 w-4" />
              )}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
              {t.message}
            </p>
            <button
              onClick={() => onDismiss(t.id)}
              className="-mr-1 -mt-1 rounded-md p-1 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

type InsightVariant = 'strengths' | 'weaknesses' | 'suggestions';

const INSIGHT_CONFIG: Record<
  InsightVariant,
  { icon: LucideIcon; color: string; bg: string; label: string; empty: string }
> = {
  strengths: {
    icon: CheckCircle2,
    color: 'text-score-high',
    bg: 'bg-score-high/10',
    label: 'Strengths',
    empty: 'No specific strengths were flagged for this resume.',
  },
  weaknesses: {
    icon: AlertTriangle,
    color: 'text-score-mid',
    bg: 'bg-score-mid/10',
    label: 'Weaknesses',
    empty: 'No specific weaknesses were flagged. Excellent work!',
  },
  suggestions: {
    icon: Lightbulb,
    color: 'text-brand-600 dark:text-brand-400',
    bg: 'bg-brand-50 dark:bg-brand-500/15',
    label: 'Suggestions',
    empty: 'No suggestions at this time — your resume is in strong shape.',
  },
};

export function InsightsTabs({
  strengths,
  weaknesses,
  suggestions,
}: {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}) {
  const [tab, setTab] = useState<InsightVariant>('strengths');
  const items = { strengths, weaknesses, suggestions }[tab];
  const config = INSIGHT_CONFIG[tab];
  const Icon = config.icon;
  const counts = {
    strengths: strengths.length,
    weaknesses: weaknesses.length,
    suggestions: suggestions.length,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white dark:border-ink-800/70 dark:bg-ink-950">
      <div className="flex items-center gap-1 border-b border-ink-200 px-2 dark:border-ink-800">
        {(Object.keys(INSIGHT_CONFIG) as InsightVariant[]).map((v) => {
          const cfg = INSIGHT_CONFIG[v];
          const VIcon = cfg.icon;
          const active = tab === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => setTab(v)}
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'text-ink-900 dark:text-ink-50'
                  : 'text-ink-500 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-200'
              }`}
            >
              <VIcon className={`h-3.5 w-3.5 ${active ? cfg.color : ''}`} />
              {cfg.label}
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  active
                    ? 'bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900'
                    : 'bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400'
                }`}
              >
                {counts[v]}
              </span>
              {active && (
                <motion.span
                  layoutId="insights-tab"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-600"
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {items.length === 0 ? (
              <div className="flex items-start gap-2.5 py-2">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${config.bg}`}>
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                </span>
                <p className="text-sm italic text-ink-400 dark:text-ink-500">{config.empty}</p>
              </div>
            ) : (
              <ul className="divide-y divide-ink-100 dark:divide-ink-800/60">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04 }}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${config.bg}`}
                    >
                      <Icon className={`h-3 w-3 ${config.color}`} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function IssuesBanner({ issues }: { issues: string[] }) {
  if (issues.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-score-mid/25 bg-score-mid/5 p-5"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-score-mid/15 text-score-mid">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-ink-800 dark:text-ink-100">
            Attention Needed
          </h3>
          <ul className="mt-2 space-y-1.5">
            {issues.map((issue, i) => (
              <li key={i} className="text-sm text-ink-600 dark:text-ink-300">
                · {issue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
