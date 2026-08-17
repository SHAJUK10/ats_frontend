import { motion, useReducedMotion } from 'framer-motion';
import {
  Contact,
  LayoutList,
  Type,
  SpellCheck,
  BookOpen,
  KeyRound,
  Sparkles,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Trophy,
  Zap,
  Copy,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryScore } from '../types';

const LABELS: Record<string, { label: string; icon: LucideIcon; desc: string }> = {
  contact: { label: 'Contact', icon: Contact, desc: 'Reachability & details' },
  sections: { label: 'Sections', icon: LayoutList, desc: 'Standard structure' },
  formatting: { label: 'Formatting', icon: Type, desc: 'Layout & consistency' },
  grammar: { label: 'Grammar', icon: SpellCheck, desc: 'Language correctness' },
  readability: { label: 'Readability', icon: BookOpen, desc: 'Clarity & flow' },
  exact_keywords: { label: 'Exact Keywords', icon: KeyRound, desc: 'Direct JD keyword hits' },
  semantic_match: { label: 'Semantic Match', icon: Sparkles, desc: 'Conceptual similarity' },
  experience: { label: 'Experience', icon: Briefcase, desc: 'Work history depth' },
  projects: { label: 'Projects', icon: FolderGit2, desc: 'Applied work' },
  education: { label: 'Education', icon: GraduationCap, desc: 'Academic credentials' },
  achievements: { label: 'Achievements', icon: Trophy, desc: 'Measurable impact' },
  action_verbs: { label: 'Action Verbs', icon: Zap, desc: 'Strong phrasing' },
  duplicates: { label: 'Duplicates', icon: Copy, desc: 'Redundancy control' },
  formatting_penalty: { label: 'Format Penalty', icon: AlertTriangle, desc: 'ATS parse issues' },
};

export function humanize(key: string): string {
  return LABELS[key]?.label ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function barColor(pct: number): string {
  if (pct < 50) return 'bg-score-low';
  if (pct < 75) return 'bg-score-mid';
  return 'bg-score-high';
}

interface CategoryCardProps {
  labelKey: string;
  data: CategoryScore;
  index?: number;
}

export function CategoryCard({ labelKey, data, index = 0 }: CategoryCardProps) {
  const meta = LABELS[labelKey];
  const Icon = meta?.icon ?? LayoutList;
  const notEvaluated = data.max === 0 || !!data.note;
  const pct = data.max > 0 ? (data.score / data.max) * 100 : 0;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: reduceMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center gap-3 py-3"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-ink-800 dark:text-ink-400 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-semibold text-ink-800 dark:text-ink-100">
            {meta?.label ?? humanize(labelKey)}
          </p>
          {!notEvaluated && (
            <span className="font-mono text-xs font-medium text-ink-600 dark:text-ink-300">
              {data.score}
              <span className="text-ink-300 dark:text-ink-600">/{data.max}</span>
            </span>
          )}
        </div>
        {notEvaluated ? (
          <p className="mt-1 text-[11px] italic text-ink-400 dark:text-ink-500">
            {data.note ?? 'Not evaluated'}
          </p>
        ) : (
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.15 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${barColor(pct)}`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
