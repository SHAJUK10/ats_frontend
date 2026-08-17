import { Link } from 'react-router-dom';
import { Radar } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
];

export function LandingFooter() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-ink-200/60 py-12 dark:border-ink-800/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="ResumeIQ home">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Radar className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-sm font-extrabold tracking-tight text-ink-900 dark:text-ink-50">
                    ResumeIQ
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">
                    ATS Intelligence
                  </span>
                </div>
                <span className="mt-0.5 block text-[10px] font-medium text-ink-400 dark:text-ink-500">
                  A product by CometCode Innovations
                </span>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-ink-200/60 pt-6 text-center dark:border-ink-800/60">
          <p className="text-xs text-ink-400 dark:text-ink-500">
            © 2026 CometCode Innovations
          </p>
        </div>
      </div>
    </footer>
  );
}
