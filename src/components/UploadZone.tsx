import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, X, FileCheck2, RefreshCw } from 'lucide-react';

const ACCEPTED = ['.pdf', '.docx'];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isValid(file: File): boolean {
  const lower = file.name.toLowerCase();
  return ACCEPTED.some((ext) => lower.endsWith(ext));
}

interface UploadZoneProps {
  file: File | null;
  onFile: (file: File | null) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
}

export function UploadZone({ file, onFile, onError, disabled }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File | undefined) => {
      if (!f) return;
      if (!isValid(f)) {
        onError('Unsupported file type. Please upload a .pdf or .docx file.');
        return;
      }
      onFile(f);
    },
    [onFile, onError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile, disabled]
  );

  return (
    <AnimatePresence mode="wait">
      {file ? (
        <motion.div
          key="selected"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-950"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
              <FileText className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{formatBytes(file.size)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1 rounded-full bg-score-high/10 px-2 py-0.5 text-[11px] font-semibold text-score-high sm:inline-flex">
                <FileCheck2 className="h-3 w-3" />
                Ready
              </span>
              <button
                type="button"
                onClick={() => !disabled && inputRef.current?.click()}
                disabled={disabled}
                className="btn-ghost h-8 px-2"
                aria-label="Replace file"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden text-xs sm:inline">Replace</span>
              </button>
              <button
                type="button"
                onClick={() => onFile(null)}
                disabled={disabled}
                className="btn-ghost h-8 px-2 text-ink-400 hover:text-score-low"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="dropzone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
            dragging
              ? 'border-brand-500 bg-brand-50/40 scale-[1.01] dark:bg-brand-500/10'
              : 'border-ink-300 bg-white hover:border-brand-400 hover:bg-brand-50/20 dark:border-ink-700 dark:bg-ink-950/50 dark:hover:border-brand-600 dark:hover:bg-brand-500/5'
          } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
          <motion.div
            animate={dragging ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
              dragging
                ? 'bg-brand-600 text-white'
                : 'bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-500'
            }`}
          >
            <UploadCloud className="h-6 w-6" />
          </motion.div>
          <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">
            {dragging ? 'Drop to upload' : 'Drop your resume here'}
          </p>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            or <span className="font-medium text-brand-600 dark:text-brand-400">browse files</span>
            <span className="mx-1.5 text-ink-300 dark:text-ink-600">·</span>
            PDF, DOCX
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
