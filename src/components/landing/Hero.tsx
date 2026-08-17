import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileText, ScanLine, KeyRound, Sparkles } from 'lucide-react';
import { MockDashboard } from './MockDashboard';

const TRUST_ITEMS = [
  { icon: FileText, label: 'PDF & DOCX Support' },
  { icon: ScanLine, label: 'ATS Compatibility Analysis' },
  { icon: KeyRound, label: 'Job Description Matching' },
  { icon: Sparkles, label: 'AI-Powered Feedback' },
];

export function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const scrollToHow = () => {
    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* Background depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/8 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-highlight-400/6 blur-3xl dark:bg-highlight-400/5" />
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.18) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* Left: copy */}
          <div className="max-w-xl">
            <motion.p {...fadeUp(0)} className="eyebrow mb-5">
              ResumeIQ / ATS Intelligence
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-6xl"
            >
              Your resume gets one chance
              <br />
              to make the cut.
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 text-lg leading-relaxed text-ink-600 dark:text-ink-400"
            >
              Make sure it gets past the ATS. ResumeIQ analyzes your resume for ATS
              compatibility, keywords, structure, readability and job-description alignment
              before you apply.
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={() => navigate('/analyze')}
                className="btn-primary text-base"
              >
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={scrollToHow}
                className="btn-secondary text-base"
              >
                See How It Works
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.p
              {...fadeUp(0.32)}
              className="mt-6 text-sm text-ink-400 dark:text-ink-500"
            >
              No sign-up required. Files are processed in real time and never stored.
            </motion.p>
          </div>

          {/* Right: product preview */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Floating accent behind */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/10 to-highlight-400/5 blur-2xl" />
            <div className="transform-gpu lg:rotate-[1.2deg] lg:transition-transform lg:hover:rotate-0">
              <MockDashboard variant="hero" />
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-ink-200/60 pt-8 dark:border-ink-800/60 sm:mt-20"
        >
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-400"
              >
                <Icon className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                {item.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
