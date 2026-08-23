import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Lightbulb, TrendingUp, Eye } from 'lucide-react';

const POINTS = [
  {
    icon: Eye,
    title: 'Understand the why',
    desc: 'Go beyond the score to see which categories helped and which held you back.',
  },
  {
    icon: Lightbulb,
    title: 'Prioritized suggestions',
    desc: 'Clear, actionable recommendations focused on the highest-impact improvements.',
  },
  {
    icon: TrendingUp,
    title: 'Track your readiness',
    desc: 'Re-analyze after each revision to watch your compatibility score climb.',
  },
];

export function AISection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-500/6 blur-3xl dark:bg-brand-500/8" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            AI Feedback
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
          >
            More than a score.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-ink-600 dark:text-ink-400"
          >
            Understand why your resume scored the way it did and what you can improve.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-ink-200/70 bg-white p-7 dark:border-ink-800/70 dark:bg-ink-950"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-ink-900 dark:text-ink-50">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 max-w-xl text-center text-sm text-ink-400 dark:text-ink-500"
        >
          AI feedback is optional and available when configured on the server. The core
          analysis works without it.
        </motion.p>
      </div>
    </section>
  );
}
