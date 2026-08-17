import { motion, useReducedMotion } from 'framer-motion';

export function ProductStory() {
  const reduce = useReducedMotion();

  return (
    <section id="product" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-6 text-center"
        >
          What ResumeIQ Does
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-6xl"
        >
          Your resume.
          <br />
          <span className="text-ink-400 dark:text-ink-600">Decoded.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-xl leading-relaxed text-ink-600 dark:text-ink-400"
        >
          ResumeIQ looks beyond keywords to understand the structure, quality and relevance
          of your resume. It evaluates how an Applicant Tracking System would parse it, how
          well it aligns with a specific job description, and what you can improve — all before
          you hit submit.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm font-medium text-ink-500 dark:text-ink-400"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            14 evaluation categories
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Semantic skill matching
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Keyword gap analysis
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Actionable insights
          </span>
        </motion.div>
      </div>
    </section>
  );
}
