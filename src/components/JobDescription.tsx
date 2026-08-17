import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Pencil, Upload, X, Sparkles } from 'lucide-react';

interface JobDescriptionProps {
  jdText: string;
  jdFile: File | null;
  onText: (v: string) => void;
  onFile: (f: File | null) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
}

export function JobDescription({
  jdText,
  jdFile,
  onText,
  onFile,
  onError,
  disabled,
}: JobDescriptionProps) {
  const [tab, setTab] = useState<'paste' | 'upload'>('paste');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const lower = f.name.toLowerCase();
    if (!lower.endsWith('.txt')) {
      onError('Job description file must be a .txt file.');
      return;
    }
    onFile(f);
    onText('');
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
            Target Job Description
          </h2>
          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-500 dark:bg-ink-800 dark:text-ink-400">
            Optional
          </span>
        </div>
        <p className="hidden text-xs text-ink-400 dark:text-ink-500 sm:block">
          Improves keyword & semantic matching
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-3 inline-flex rounded-lg bg-ink-100 p-0.5 dark:bg-ink-800">
        {([
          { id: 'paste', label: 'Paste Text', icon: Pencil },
          { id: 'upload', label: 'Upload .TXT', icon: Upload },
        ] as const).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              disabled={disabled}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'text-ink-900 dark:text-ink-50'
                  : 'text-ink-500 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-200'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="jd-tab"
                  className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-ink-700"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon className="relative h-3.5 w-3.5" />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'paste' ? (
          <motion.div
            key="paste"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <textarea
              value={jdFile ? '' : jdText}
              disabled={disabled || !!jdFile}
              onChange={(e) => onText(e.target.value)}
              placeholder="Paste the job description to get keyword match scores and semantic similarity…"
              rows={5}
              className="input-base resize-y leading-relaxed"
            />
            {jdFile && (
              <p className="mt-2 flex items-center gap-1 text-xs text-ink-400">
                <Sparkles className="h-3 w-3" /> A .txt file is uploaded — it overrides pasted text.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => {
                handleFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            {jdFile ? (
              <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50/50 px-3.5 py-2.5 dark:border-ink-700 dark:bg-ink-960/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-800 dark:text-ink-200">
                  {jdFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => onFile(null)}
                  disabled={disabled}
                  className="btn-ghost h-7 px-1.5 text-ink-400 hover:text-score-low"
                  aria-label="Remove job description file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => !disabled && inputRef.current?.click()}
                disabled={disabled}
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-300 bg-ink-50/30 px-4 py-7 text-center transition hover:border-brand-400 hover:bg-brand-50/20 disabled:opacity-50 dark:border-ink-700 dark:bg-ink-960/30 dark:hover:border-brand-600"
              >
                <Upload className="mb-2 h-5 w-5 text-ink-400" />
                <span className="text-sm font-medium text-ink-600 dark:text-ink-300">
                  Click to upload a .txt file
                </span>
                <span className="mt-0.5 text-xs text-ink-400">Overrides pasted text</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
