import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Radar, ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
];

export function LandingNav() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goAnalyze = () => navigate('/analyze');

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-200/60 bg-white/80 backdrop-blur-xl dark:border-ink-800/60 dark:bg-ink-960/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: brand */}
        <Link to="/" className="group flex items-center gap-3" aria-label="ResumeIQ home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Radar className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[16px] font-extrabold tracking-tight text-ink-900 dark:text-ink-50">
                ResumeIQ
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500 sm:inline">
                ATS Intelligence
              </span>
            </div>
            <span className="mt-0.5 hidden text-[10px] font-medium text-ink-400 dark:text-ink-500 lg:block">
              by CometCode Innovations
            </span>
          </div>
        </Link>

        {/* Center: nav links (desktop) */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: theme + CTA (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50"
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
          <button onClick={goAnalyze} className="btn-primary">
            Analyze My Resume
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile: theme + menu */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-ink-200/60 bg-white dark:border-ink-800/60 dark:bg-ink-960 md:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  goAnalyze();
                }}
                className="btn-primary mt-2 w-full"
              >
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
