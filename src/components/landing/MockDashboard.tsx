import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  ScanLine,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Radar,
} from 'lucide-react';

type Variant = 'hero' | 'showcase';

interface MockDashboardProps {
  variant?: Variant;
  score?: number;
}

const BAR_COLOR = (pct: number) =>
  pct < 50 ? 'bg-score-low' : pct < 75 ? 'bg-score-mid' : 'bg-score-high';

const CATEGORIES = [
  { label: 'Contact', score: 10, max: 10 },
  { label: 'Sections', score: 9, max: 10 },
  { label: 'Formatting', score: 8, max: 10 },
  { label: 'Readability', score: 8, max: 10 },
  { label: 'Exact Keywords', score: 12, max: 15 },
  { label: 'Semantic Match', score: 14, max: 15 },
  { label: 'Experience', score: 8, max: 10 },
  { label: 'Achievements', score: 6, max: 10 },
];

const MISSING = ['Docker', 'Kubernetes', 'CI/CD Pipeline'];

const STRENGTHS = [
  'Strong action verb usage throughout experience section',
  'Clear contact information with professional email',
];

const WEAKNESSES = [
  'Missing measurable achievements in 2 bullet points',
  'No CI/CD or containerization keywords found',
];

export function MockDashboard({ variant = 'hero', score = 87 }: MockDashboardProps) {
  const reduce = useReducedMotion();
  const compact = variant === 'hero';

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-pop dark:border-ink-800/80 dark:bg-ink-950">
      {/* Window header */}
      <div className="flex items-center gap-2 border-b border-ink-200/70 px-4 py-2.5 dark:border-ink-800/70">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300 dark:bg-ink-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300 dark:bg-ink-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300 dark:bg-ink-700" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 text-[10px] font-medium text-ink-400">
          <Radar className="h-3 w-3" />
          resumeiq.cometcode.app/analyze
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        {/* Score + metrics */}
        <div className={`grid gap-4 ${compact ? 'lg:grid-cols-[200px_1fr]' : 'lg:grid-cols-[220px_1fr]'} mb-5`}>
          {/* Score ring */}
          <div className="flex items-center justify-center rounded-xl border border-ink-200/70 bg-ink-50/40 py-6 dark:border-ink-800/70 dark:bg-ink-900/30">
            <div className="relative flex flex-col items-center">
              <ScoreRing score={score} size={compact ? 150 : 170} animate={!reduce} />
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
                ATS Score
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ink-200/70 bg-ink-200/70 dark:border-ink-800/70 dark:bg-ink-800/70">
            {[
              { icon: ShieldCheck, label: 'ATS Probability', value: '92', suffix: '%' },
              { icon: ScanLine, label: 'Rule-Based', value: '83', suffix: '' },
              { icon: KeyRound, label: 'Keywords', value: '78', suffix: '%' },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-white px-3 py-3 dark:bg-ink-950">
                  <div className="mb-1.5 flex items-center gap-1 text-ink-400 dark:text-ink-500">
                    <Icon className="h-3 w-3" />
                    <span className="text-[9px] font-medium leading-tight">{m.label}</span>
                  </div>
                  <p className="font-display text-xl font-extrabold tabular-nums text-ink-900 dark:text-ink-50">
                    {m.value}
                    {m.suffix && (
                      <span className="ml-0.5 text-xs font-bold text-ink-300 dark:text-ink-600">
                        {m.suffix}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-5">
          <p className="eyebrow mb-3">Category Analysis</p>
          <div className={`grid gap-x-6 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {CATEGORIES.slice(0, compact ? 6 : 8).map((cat, i) => {
              const pct = (cat.score / cat.max) * 100;
              return (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="truncate text-xs font-medium text-ink-700 dark:text-ink-300">
                        {cat.label}
                      </span>
                      <span className="ml-2 font-mono text-[10px] text-ink-400">
                        {cat.score}/{cat.max}
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${BAR_COLOR(pct)}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights + Missing — side by side */}
        {!compact && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-ink-200/70 bg-ink-50/30 p-4 dark:border-ink-800/70 dark:bg-ink-900/20">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-score-high">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Strengths
              </div>
              <ul className="space-y-1.5">
                {STRENGTHS.map((s, i) => (
                  <li key={i} className="text-xs leading-relaxed text-ink-600 dark:text-ink-400">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-3 mb-2 flex items-center gap-1.5 text-xs font-semibold text-score-mid">
                <AlertTriangle className="h-3.5 w-3.5" />
                Weaknesses
              </div>
              <ul className="space-y-1.5">
                {WEAKNESSES.map((w, i) => (
                  <li key={i} className="text-xs leading-relaxed text-ink-600 dark:text-ink-400">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-ink-200/70 bg-ink-50/30 p-4 dark:border-ink-800/70 dark:bg-ink-900/20">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <Lightbulb className="h-3.5 w-3.5" />
                Missing Keywords
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MISSING.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-600 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-score-mid" />
                    {kw}
                  </span>
                ))}
              </div>
              <div className="mt-4 mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <KeyRound className="h-3.5 w-3.5" />
                Semantic Matches
              </div>
              <div className="space-y-2">
                {[
                  { jd: 'Python', match: 'Python (backend)', sim: 98 },
                  { jd: 'FastAPI', match: 'FastAPI', sim: 95 },
                  { jd: 'Machine Learning', match: 'ML models', sim: 87 },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ink-700 dark:text-ink-300 w-28 shrink-0">
                      {m.jd}
                    </span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${m.sim}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                        className="h-full rounded-full bg-brand-500"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-ink-400 w-8 text-right">
                      {m.sim}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreRing({ score, size, animate }: { score: number; size: number; animate: boolean }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score < 50 ? '#f472b6' : score < 75 ? '#fbbf24' : '#34d399';
  const textColor = score < 50 ? 'text-score-low' : score < 75 ? 'text-score-mid' : 'text-score-high';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-ink-200/60 dark:stroke-ink-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animate ? { strokeDashoffset: circumference } : false}
          whileInView={animate ? { strokeDashoffset: offset } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={animate ? undefined : { strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <div className="flex items-baseline">
          <span className={`font-display text-4xl font-extrabold tabular-nums ${textColor}`}>
            {score}
          </span>
          <span className="ml-0.5 font-display text-base font-bold text-ink-300 dark:text-ink-600">
            /100
          </span>
        </div>
      </div>
    </div>
  );
}
