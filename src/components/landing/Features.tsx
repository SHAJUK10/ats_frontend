import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Target,
  Heart,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  visual: React.ReactNode;
}

function MiniBars() {
  const cats = [
    { label: 'Contact', pct: 100 },
    { label: 'Sections', pct: 90 },
    { label: 'Formatting', pct: 80 },
    { label: 'Grammar', pct: 85 },
    { label: 'Readability', pct: 80 },
  ];
  return (
    <div className="space-y-2">
      {cats.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-16 text-[10px] font-medium text-ink-500 dark:text-ink-400">{c.label}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${c.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="h-full rounded-full bg-score-high"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MatchViz() {
  return (
    <div className="space-y-1.5">
      {[
        { kw: 'Python', match: 'Python', sim: 98 },
        { kw: 'FastAPI', match: 'FastAPI', sim: 95 },
        { kw: 'Docker', match: '—', sim: 0 },
      ].map((m, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-20 font-medium text-ink-600 dark:text-ink-300">{m.kw}</span>
          <span className={`w-20 ${m.sim > 0 ? 'text-score-high' : 'text-score-low'}`}>
            {m.match} {m.sim > 0 ? '✓' : '—'}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${m.sim}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`h-full rounded-full ${m.sim > 0 ? 'bg-brand-500' : 'bg-score-low/30'}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HealthViz() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg width={80} height={80} className="-rotate-90">
          <circle cx={40} cy={40} r={34} fill="none" strokeWidth={7} className="stroke-ink-200/60 dark:stroke-ink-800" />
          <motion.circle
            cx={40} cy={40} r={34} fill="none" strokeWidth={7} stroke="#34d399" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 34}
            initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
            whileInView={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - 0.82) }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute font-display text-lg font-extrabold text-score-high">82</span>
      </div>
      <div className="text-xs text-ink-500 dark:text-ink-400">
        <p className="font-semibold text-ink-700 dark:text-ink-200">Resume Health</p>
        <p className="mt-0.5">Formatting · Readability · Grammar</p>
      </div>
    </div>
  );
}

function AiViz() {
  return (
    <div className="space-y-2">
      {[
        { icon: '✓', text: 'Strong action verb usage', color: 'text-score-high' },
        { icon: '!', text: 'Add measurable achievements', color: 'text-score-mid' },
        { icon: '→', text: 'Include CI/CD keywords', color: 'text-brand-500' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="flex items-start gap-2 text-xs"
        >
          <span className={`font-bold ${item.color}`}>{item.icon}</span>
          <span className="text-ink-600 dark:text-ink-300">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'ATS Compatibility',
    desc: 'Understand how your resume performs against automated screening systems — parsing, structure and formatting that machines care about.',
    visual: <MiniBars />,
  },
  {
    icon: Target,
    title: 'Job Alignment',
    desc: 'Compare your resume against the requirements that matter. Paste a job description and get keyword and semantic matching scores.',
    visual: <MatchViz />,
  },
  {
    icon: Heart,
    title: 'Resume Health',
    desc: 'Evaluate formatting, readability, grammar and structure. Catch issues that hold your resume back before a human ever sees it.',
    visual: <HealthViz />,
  },
  {
    icon: Sparkles,
    title: 'AI Feedback',
    desc: 'Get deeper recommendations when AI feedback is available. Understand why your resume scored the way it did and what to improve.',
    visual: <AiViz />,
  },
];

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl"
          >
            Four perspectives on your resume.
          </motion.h2>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`grid items-center gap-8 rounded-2xl border border-ink-200/70 bg-white p-8 dark:border-ink-800/70 dark:bg-ink-950 lg:grid-cols-2 lg:p-10 ${
                  reversed ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Copy */}
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-ink-600 dark:text-ink-400">
                    {feature.desc}
                  </p>
                </div>
                {/* Visual */}
                <div className="rounded-xl border border-ink-200/60 bg-ink-50/50 p-6 dark:border-ink-800/60 dark:bg-ink-900/30">
                  {feature.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
