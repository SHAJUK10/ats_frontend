import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  Layers,
  RotateCcw,
  Type,
  Sparkles,
  ShieldCheck,
  ScanLine,
  Heart,
  Target,
  Award,
  ShieldAlert,
} from 'lucide-react';
import type { AnalyzeResponse, SemanticMatch, CategoryBreakdown } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { CategoryCard } from './CategoryCard';
import { InsightsTabs, IssuesBanner } from './Feedback';

interface DashboardProps {
  data: AnalyzeResponse;
  onReset: () => void;
  onDownloadHtml: () => void;
  downloading: boolean;
}

function ConfidencePill({ value }: { value: string }) {
  const v = value.toLowerCase();
  const cls = v.includes('high')
    ? 'bg-score-high/10 text-score-high'
    : v.includes('low')
    ? 'bg-score-low/10 text-score-low'
    : 'bg-score-mid/10 text-score-mid';
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {value}
    </span>
  );
}

const CATEGORY_GROUPS: {
  title: string;
  icon: typeof Heart;
  keys: (keyof CategoryBreakdown)[];
}[] = [
  {
    title: 'Resume Health',
    icon: Heart,
    keys: ['contact', 'sections', 'formatting', 'grammar', 'readability'],
  },
  {
    title: 'Job Alignment',
    icon: Target,
    keys: ['exact_keywords', 'semantic_match', 'experience', 'projects'],
  },
  {
    title: 'Credibility',
    icon: Award,
    keys: ['education', 'achievements', 'action_verbs'],
  },
  {
    title: 'Quality Control',
    icon: ShieldAlert,
    keys: ['duplicates', 'formatting_penalty'],
  },
];

export function Dashboard({ data, onReset, onDownloadHtml, downloading }: DashboardProps) {
  const { meta, report, llm_feedback } = data;
  const reduce = useReducedMotion();
  const breakdown = report.category_breakdown;

  const fade = {
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  };

  return (
    <motion.div {...fade} className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Report header — open section, not a card */}
      <div className="mb-6 border-b border-ink-200 pb-6 dark:border-ink-800">
        <p className="eyebrow mb-2">Resume Intelligence Report</p>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
          {meta.file_name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-500 dark:text-ink-400">
          {[
            { icon: Layers, label: `${meta.page_count} pages` },
            { icon: Type, label: `${meta.word_count.toLocaleString()} words` },
            { icon: Clock, label: `${meta.elapsed_seconds.toFixed(2)}s analysis` },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <span key={i} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {m.label}
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          {report.jd_provided
            ? 'Scored against the provided job description.'
            : 'No job description — keyword & semantic categories not evaluated.'}
          {llm_feedback?.provider_used ? ` AI feedback via ${llm_feedback.provider_used}.` : ''}
        </p>
      </div>

      {/* Actions row */}
      <div className="mb-8 flex flex-wrap justify-end gap-2">
        <button onClick={onDownloadHtml} disabled={downloading} className="btn-secondary">
          <Download className="h-4 w-4" />
          {downloading ? 'Preparing…' : 'Download Full HTML Report'}
        </button>
        <button onClick={onReset} className="btn-primary">
          <RotateCcw className="h-4 w-4" />
          New Analysis
        </button>
      </div>

      {/* Score + Metrics — asymmetric composition */}
      <div className="mb-10 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center rounded-2xl border border-ink-200/70 bg-white py-8 dark:border-ink-800/70 dark:bg-ink-950"
        >
          <ScoreGauge score={report.overall_score} size={200} />
        </motion.div>

        {/* Metrics — open row with dividers, not cards */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-200/70 dark:border-ink-800/70 dark:bg-ink-800/70 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              label: 'ATS Probability',
              value: `${Math.round(report.ats_probability)}`,
              suffix: '%',
            },
            {
              icon: ScanLine,
              label: 'Rule-Based Score',
              value: `${Math.round(report.rule_based_score)}`,
              suffix: '',
            },
            {
              icon: Sparkles,
              label: 'Semantic Score',
              value: `${Math.round(report.semantic_score)}`,
              suffix: '',
            },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center gap-2 bg-white px-5 py-5 dark:bg-ink-950"
              >
                <div className="flex items-center gap-2 text-ink-400 dark:text-ink-500">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{m.label}</span>
                </div>
                <p className="font-display text-3xl font-extrabold tabular-nums text-ink-900 dark:text-ink-50">
                  {m.value}
                  {m.suffix && (
                    <span className="ml-0.5 text-base font-bold text-ink-300 dark:text-ink-600">
                      {m.suffix}
                    </span>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Issues */}
      {report.issues.length > 0 && (
        <div className="mb-10">
          <IssuesBanner issues={report.issues} />
        </div>
      )}

      {/* Category Analysis — grouped open sections */}
      <section className="mb-10">
        <h2 className="eyebrow mb-5">Category Analysis</h2>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {CATEGORY_GROUPS.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-1 flex items-center gap-2 border-b border-ink-200 pb-2 dark:border-ink-800">
                  <GroupIcon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="font-display text-sm font-bold text-ink-800 dark:text-ink-100">
                    {group.title}
                  </h3>
                </div>
                <div className="divide-y divide-ink-100 dark:divide-ink-800/60">
                  {group.keys.map((key, i) => (
                    <CategoryCard key={key} labelKey={key} data={breakdown[key]} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Insights */}
      <section className="mb-10">
        <h2 className="eyebrow mb-4">Insights</h2>
        <InsightsTabs
          strengths={report.strengths}
          weaknesses={report.weaknesses}
          suggestions={report.suggestions}
        />
      </section>

      {/* Semantic Matches */}
      {report.semantic_matches.length > 0 && (
        <section className="mb-10">
          <h2 className="eyebrow mb-4">Semantic Skill Matches</h2>
          <div className="overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-800/70">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500 dark:border-ink-800 dark:bg-ink-900/40 dark:text-ink-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">JD Skill</th>
                    <th className="px-5 py-3 font-semibold">Resume Match</th>
                    <th className="px-5 py-3 font-semibold">Similarity</th>
                    <th className="px-5 py-3 font-semibold">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100 bg-white dark:divide-ink-800/60 dark:bg-ink-950">
                  {report.semantic_matches.map((m: SemanticMatch, i) => (
                    <motion.tr
                      key={i}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.4) }}
                      className="transition-colors hover:bg-ink-50/60 dark:hover:bg-ink-900/30"
                    >
                      <td className="px-5 py-3 font-medium text-ink-800 dark:text-ink-100">
                        {m.jd_skill}
                      </td>
                      <td className="px-5 py-3 text-ink-600 dark:text-ink-300">{m.resume_match}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                            <motion.div
                              initial={reduce ? false : { width: 0 }}
                              animate={{ width: `${Math.round(m.similarity)}%` }}
                              transition={{ duration: 0.6, delay: 0.2 + i * 0.03 }}
                              className="h-full rounded-full bg-brand-500"
                            />
                          </div>
                          <span className="font-mono text-xs text-ink-600 dark:text-ink-300">
                            {Math.round(m.similarity)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <ConfidencePill value={m.confidence} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Missing Keywords */}
      {report.missing_keywords.length > 0 && (
        <section className="mb-10">
          <h2 className="eyebrow mb-4">Missing Keywords</h2>
          <div className="rounded-2xl border border-ink-200/70 bg-ink-50/40 p-5 dark:border-ink-800/70 dark:bg-ink-900/30">
            <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">
              Consider adding relevant terms naturally where they accurately represent your experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {report.missing_keywords.map((kw, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                  whileHover={{ y: -2 }}
                  className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-score-mid/40 hover:bg-score-mid/5 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-score-mid" />
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LLM feedback */}
      {llm_feedback && llm_feedback.provider_used && (
        <section className="mb-10">
          <h2 className="eyebrow mb-4 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            AI Feedback
          </h2>
          <div className="rounded-2xl border border-ink-200/70 bg-ink-50/40 p-5 dark:border-ink-800/70 dark:bg-ink-900/30">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-400">
              Provider: {llm_feedback.provider_used}
            </p>
            <pre className="overflow-x-auto rounded-lg bg-ink-960 p-4 text-xs leading-relaxed text-ink-300 dark:bg-ink-960/60">
              {JSON.stringify(llm_feedback, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* Analyze another */}
      <div className="flex justify-center border-t border-ink-200 pt-8 dark:border-ink-800">
        <button onClick={onReset} className="btn-secondary">
          <ArrowRight className="h-4 w-4 rotate-180" />
          Analyze Another Resume
        </button>
      </div>
    </motion.div>
  );
}
