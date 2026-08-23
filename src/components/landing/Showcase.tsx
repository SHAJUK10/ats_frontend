import { motion, useReducedMotion } from 'framer-motion';
import { MockDashboard } from './MockDashboard';

export function Showcase() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            Product Showcase
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
          >
            See what your resume looks like to an ATS.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-ink-600 dark:text-ink-400"
          >
            A complete breakdown — overall score, category performance, semantic matches,
            missing keywords and prioritized insights.
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/8 to-highlight-400/4 blur-3xl" />
          <MockDashboard variant="showcase" />
        </motion.div>
      </div>
    </section>
  );
}
