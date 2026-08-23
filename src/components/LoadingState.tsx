import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, ScanLine, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

const STAGES = [
  { label: 'Reading Resume', icon: FileSearch },
  { label: 'Analyzing Structure', icon: ScanLine },
  { label: 'Checking ATS Compatibility', icon: ShieldCheck },
  { label: 'Evaluating Keywords', icon: KeyRound },
  { label: 'Generating Insights', icon: Sparkles },
];

export function LoadingState() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % STAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-2xl bg-brand-500/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
            <motion.span
              className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-5 font-display text-lg font-bold text-ink-800 dark:text-ink-100"
          >
            {STAGES[idx].label}…
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          This usually takes a few seconds.
        </p>
      </div>

      {/* Stage progress — open row with dividers */}
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-200/70 dark:border-ink-800/70 dark:bg-ink-800/70 sm:grid-cols-5">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const done = i < idx;
          const active = i === idx;
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-1.5 bg-white px-3 py-4 text-center transition-colors dark:bg-ink-950 ${
                active ? 'bg-brand-50/40 dark:bg-brand-500/10' : ''
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors ${
                  done
                    ? 'text-score-high'
                    : active
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-ink-300 dark:text-ink-700'
                }`}
              />
              <span
                className={`text-[11px] font-medium leading-tight ${
                  done || active
                    ? 'text-ink-700 dark:text-ink-200'
                    : 'text-ink-400 dark:text-ink-600'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Skeleton report */}
      <div className="mb-6 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
        <div className="flex items-center justify-center rounded-2xl border border-ink-200/70 bg-white py-8 dark:border-ink-800/70 dark:bg-ink-950">
          <div className="skeleton h-44 w-44 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-200/70 dark:border-ink-800/70 dark:bg-ink-800/70 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white p-5 dark:bg-ink-950">
              <div className="skeleton mb-3 h-4 w-24" />
              <div className="skeleton h-8 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton categories — two columns */}
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((col) => (
          <div key={col}>
            <div className="skeleton mb-3 h-4 w-32 rounded" />
            <div className="space-y-3">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <div className="skeleton h-9 w-9 rounded-lg" />
                  <div className="flex-1">
                    <div className="skeleton mb-2 h-3.5 w-28" />
                    <div className="skeleton h-1.5 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
