import { motion, useReducedMotion } from 'framer-motion';
import { Upload, ScanLine, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Upload',
    desc: 'Drop your PDF or DOCX resume. No sign-up, no account, no storage.',
    icon: Upload,
  },
  {
    num: '02',
    title: 'Analyze',
    desc: 'ResumeIQ evaluates ATS compatibility, structure, readability and job alignment across 14 categories.',
    icon: ScanLine,
  },
  {
    num: '03',
    title: 'Improve',
    desc: 'Get a clear score, identified gaps, semantic matches and actionable insights before you apply.',
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="border-y border-ink-200/60 bg-ink-100/30 py-24 dark:border-ink-800/60 dark:bg-ink-900/20 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-4 text-center"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
        >
          From resume to readiness.
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Large number */}
                <span className="pointer-events-none absolute -top-8 -left-2 font-display text-7xl font-extrabold leading-none text-ink-200/50 dark:text-ink-800/50 select-none">
                  {step.num}
                </span>

                <div className="relative">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
                    Step {step.num}
                  </p>
                  <h3 className="mb-2 font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-600 dark:text-ink-400">
                    {step.desc}
                  </p>
                </div>

                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="absolute right-[-16px] top-12 hidden h-px w-8 bg-gradient-to-r from-brand-400/40 to-transparent lg:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
