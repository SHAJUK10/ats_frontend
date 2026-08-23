import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

function scoreMeta(score: number) {
  if (score < 50)
    return { stroke: '#f472b6', label: 'Needs Improvement', text: 'text-score-low' };
  if (score < 75)
    return { stroke: '#fbbf24', label: 'Moderate Compatibility', text: 'text-score-mid' };
  return { stroke: '#34d399', label: 'Excellent ATS Compatibility', text: 'text-score-high' };
}

export function ScoreGauge({ score, size = 200 }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(0);
  const reduceMotion = useReducedMotion();
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = scoreMeta(score);

  useEffect(() => {
    if (reduceMotion) {
      setAnimated(score);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(score * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, reduceMotion]);

  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90 relative">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-ink-200/60 dark:stroke-ink-800"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke={color.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <div className="flex items-baseline">
            <span className={`font-display text-5xl font-extrabold tabular-nums ${color.text}`}>
              {Math.round(animated)}
            </span>
            <span className="ml-0.5 font-display text-xl font-bold text-ink-300 dark:text-ink-600">
              /100
            </span>
          </div>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
            ATS Score
          </span>
        </div>
      </div>
      <p className={`mt-3 text-sm font-semibold ${color.text}`}>{color.label}</p>
    </div>
  );
}
