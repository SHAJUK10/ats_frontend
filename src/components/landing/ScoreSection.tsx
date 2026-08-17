import { motion, useReducedMotion } from 'framer-motion';

export function ScoreSection() {
  const reduce = useReducedMotion();
  const score = 87;
  const size = 280;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section className="overflow-hidden border-y border-ink-200/60 bg-gradient-to-b from-ink-100/30 to-transparent py-24 dark:border-ink-800/60 dark:from-ink-900/20 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left: score visualization */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
              {/* Glow */}
              <div className="absolute inset-8 rounded-full bg-score-high/10 blur-2xl" />
              <svg width={size} height={size} className="-rotate-90 relative">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  className="stroke-ink-200/50 dark:stroke-ink-800"
                />
                <motion.circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  stroke="#34d399"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={reduce ? false : { strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-7xl font-extrabold tabular-nums text-score-high">
                  {score}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
                  ATS Score
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-4"
            >
              The Score
            </motion.p>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
            >
              Understand your resume's compatibility before you send it.
            </motion.h2>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-lg leading-relaxed text-ink-600 dark:text-ink-400"
            >
              One number that reflects how well your resume passes automated screening —
              backed by a detailed breakdown across 14 categories so you know exactly
              where to focus.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ink-200/70 bg-ink-200/70 dark:border-ink-800/70 dark:bg-ink-800/70"
            >
              {[
                { label: 'ATS Probability', value: '92%' },
                { label: 'Rule-Based', value: '83' },
                { label: 'Semantic', value: '79' },
              ].map((m, i) => (
                <div key={i} className="bg-white px-4 py-3 dark:bg-ink-950">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-ink-400 dark:text-ink-500">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold tabular-nums text-ink-900 dark:text-ink-50">
                    {m.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
