import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white px-8 py-16 text-center dark:border-ink-800/70 dark:bg-ink-950 sm:px-16 sm:py-20"
        >
          {/* Background accent */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/8 blur-3xl dark:bg-brand-500/10" />
            <div
              className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.15) 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl">
            Ready to see how your resume scores?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-600 dark:text-ink-400">
            Upload your resume and get a clear picture of its ATS readiness.
          </p>
          <div className="mt-8 flex justify-center">
            <button onClick={() => navigate('/analyze')} className="btn-primary text-base">
              Analyze My Resume
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-6 text-sm text-ink-400 dark:text-ink-500">
            No sign-up required. Files are never stored.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
