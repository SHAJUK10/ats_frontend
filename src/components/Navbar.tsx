import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Radar } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  backendOnline: boolean;
}

export function Navbar({ backendOnline }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-white/75 backdrop-blur-xl dark:border-ink-800/60 dark:bg-ink-960/75">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: brand */}
        <Link to="/" className="flex items-center gap-3" aria-label="ResumeIQ home">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
            <Radar className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[15px] font-extrabold tracking-tight text-ink-900 dark:text-ink-50">
                ResumeIQ
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500 sm:inline">
                ATS Intelligence
              </span>
            </div>
            <span className="mt-0.5 hidden text-[10px] font-medium text-ink-400 dark:text-ink-500 sm:block">
              by CometCode Innovations
            </span>
          </div>
        </Link>

        {/* Right: functional controls only */}
        <div className="flex items-center gap-2">
          {/* Backend status — compact */}
          <div
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-ink-500 dark:text-ink-400"
            title={backendOnline ? 'Backend connected' : 'Backend offline'}
          >
            <span className="relative flex h-2 w-2">
              {backendOnline && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-score-high/70" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  backendOnline ? 'bg-score-high' : 'bg-score-low'
                }`}
              />
            </span>
            <span className="hidden sm:inline">{backendOnline ? 'Connected' : 'Offline'}</span>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="moon"
                  initial={{ y: 18, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -18, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ y: 18, opacity: 0, rotate: 30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -18, opacity: 0, rotate: -30 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
