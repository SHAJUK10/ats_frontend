import { motion, useReducedMotion } from 'framer-motion';
import { Check, Minus, ArrowRight } from 'lucide-react';

const JD_SKILLS = ['Python', 'FastAPI', 'Machine Learning', 'Docker'];
const RESUME_MATCH = [
  { skill: 'Python', found: true },
  { skill: 'FastAPI', found: true },
  { skill: 'Machine Learning', found: true },
  { skill: 'Docker', found: false },
];

export function JobMatching() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-ink-200/60 bg-ink-100/30 py-24 dark:border-ink-800/60 dark:bg-ink-900/20 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            Job Description Matching
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
          >
            See how your resume aligns with the job.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-ink-600 dark:text-ink-400"
          >
            ResumeIQ compares your resume against a job description using both exact keyword
            matching and semantic similarity — so "ML models" still matches "Machine Learning."
          </motion.p>
        </div>

        {/* Comparison */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
        >
          {/* JD side */}
          <div className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800/70 dark:bg-ink-950">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
              Job Description
            </p>
            <div className="flex flex-wrap gap-2">
              {JD_SKILLS.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-lg border border-ink-200 bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-center sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
          {/* Mobile arrow */}
          <div className="flex items-center justify-center sm:hidden">
            <ArrowRight className="h-5 w-5 rotate-90 text-brand-500" />
          </div>

          {/* Resume side */}
          <div className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800/70 dark:bg-ink-950">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
              Your Resume
            </p>
            <div className="space-y-2.5">
              {RESUME_MATCH.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-700 dark:text-ink-300">
                    {m.skill}
                  </span>
                  {m.found ? (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-score-high">
                      <Check className="h-4 w-4" /> Match
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-score-mid">
                      <Minus className="h-4 w-4" /> Missing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-center text-sm text-ink-500 dark:text-ink-400"
        >
          Missing keywords are surfaced as actionable suggestions — add them naturally where
          they accurately represent your experience.
        </motion.p>
      </div>
    </section>
  );
}
