import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { UploadZone } from './UploadZone';
import { JobDescription } from './JobDescription';
import { Dashboard } from './Dashboard';
import { LoadingState } from './LoadingState';
import { Toasts, type Toast } from './Feedback';
import {
  analyzeResume,
  analyzeResumeHtml,
  getHealth,
  getConfig,
} from '../api';
import type { AnalyzeResponse, HealthResponse, ConfigResponse } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Analyzer() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [useLlm, setUseLlm] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [config, setConfig] = useState<ConfigResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  const pushToast = useCallback((message: string, type: Toast['type'] = 'error') => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), message, type }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    getHealth()
      .then((h) => setHealth(h))
      .catch(() => setHealth(null));
    getConfig()
      .then((c) => setConfig(c))
      .catch(() => setConfig(null));
  }, []);

  const onAnalyze = async () => {
    if (!file) return;
    setStatus('loading');
    try {
      const res = await analyzeResume({
        resume: file,
        jdText: jdFile ? undefined : jdText || undefined,
        jdFile: jdFile ?? undefined,
        useLlm: useLlm && (config?.llm_configured ?? false),
      });
      setResult(res);
      setStatus('success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Analysis failed.';
      pushToast(msg);
      setStatus('error');
    }
  };

  const onDownloadHtml = async () => {
    if (!file) return;
    setDownloading(true);
    try {
      const html = await analyzeResumeHtml({
        resume: file,
        jdText: jdFile ? undefined : jdText || undefined,
        jdFile: jdFile ?? undefined,
        useLlm: useLlm && (config?.llm_configured ?? false),
      });
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to download report.';
      pushToast(msg);
    } finally {
      setDownloading(false);
    }
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setFile(null);
    setJdText('');
    setJdFile(null);
    setUseLlm(false);
  };

  const llmAvailable = config?.llm_configured ?? false;
  const backendOnline = health !== null;
  const isLoading = status === 'loading';

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-960">
      <Navbar backendOnline={backendOnline} />

      <main>
        <AnimatePresence mode="wait">
          {status === 'success' && result ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Dashboard
                data={result}
                onReset={reset}
                onDownloadHtml={onDownloadHtml}
                downloading={downloading}
              />
            </motion.div>
          ) : status === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <LoadingState />
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8"
            >
              {/* Back to home + product intro */}
              <div className="mb-8 max-w-2xl">
                <Link
                  to="/"
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Home
                </Link>
                <p className="eyebrow mb-3">ResumeIQ / ATS Intelligence</p>
                <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">
                  Know how your resume
                  <br />
                  performs before you apply.
                </h1>
                <p className="mt-3 text-base leading-relaxed text-ink-500 dark:text-ink-400">
                  Upload your resume and optionally a job description to get an instant ATS
                  compatibility score, keyword analysis, and actionable insights.
                </p>
              </div>

              {/* Two-column workspace */}
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                {/* LEFT: Resume upload */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                      Resume
                    </h2>
                    <span className="text-xs text-ink-400">PDF or DOCX</span>
                  </div>
                  <UploadZone
                    file={file}
                    onFile={setFile}
                    onError={(m) => pushToast(m, 'warning')}
                    disabled={isLoading}
                  />
                </div>

                {/* RIGHT: JD + AI + Analyze */}
                <div className="space-y-4">
                  <JobDescription
                    jdText={jdText}
                    jdFile={jdFile}
                    onText={setJdText}
                    onFile={setJdFile}
                    onError={(m) => pushToast(m, 'warning')}
                    disabled={isLoading}
                  />

                  {/* AI toggle — open surface, not a card */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-ink-200/70 bg-ink-100/40 px-4 py-3.5 dark:border-ink-800/70 dark:bg-ink-900/30">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          llmAvailable
                            ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                            : 'bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-500'
                        }`}
                      >
                        {llmAvailable ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">
                          AI Feedback
                        </p>
                        <p className="text-xs text-ink-500 dark:text-ink-400">
                          {llmAvailable
                            ? 'LLM-powered suggestions alongside the report.'
                            : 'Not configured on the server.'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={useLlm}
                      disabled={!llmAvailable}
                      onClick={() => setUseLlm((v) => !v)}
                      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
                        useLlm ? 'bg-brand-600' : 'bg-ink-300 dark:bg-ink-700'
                      }`}
                    >
                      <motion.span
                        layout
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`inline-block h-4 w-4 rounded-full bg-white shadow ${
                          useLlm ? 'ml-4' : 'ml-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 rounded-xl border border-score-low/30 bg-score-low/5 px-3.5 py-2.5 text-sm text-score-low"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Analysis failed. Check the message and try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Analyze CTA */}
                  <button
                    onClick={onAnalyze}
                    disabled={!file || isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        Analyze Resume
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-ink-400 dark:text-ink-500">
                    Files are processed in real time and never stored.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
