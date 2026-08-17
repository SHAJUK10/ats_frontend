import type {
  AnalyzeResponse,
  ConfigResponse,
  HealthResponse,
  ApiError,
} from './types';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'http://localhost:8000';

export { API_BASE_URL };

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as ApiError | { message?: string };
    if (typeof data === 'object' && data !== null) {
      if ('detail' in data && typeof data.detail === 'string') return data.detail;
      if ('message' in data && typeof data.message === 'string') return data.message;
    }
  } catch {
    // non-JSON body
  }
  return `Request failed with status ${res.status}`;
}

export async function getHealth(): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return (await res.json()) as HealthResponse;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getConfig(): Promise<ConfigResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${API_BASE_URL}/config`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return (await res.json()) as ConfigResponse;
  } finally {
    clearTimeout(timeout);
  }
}

export interface AnalyzeParams {
  resume: File;
  jdText?: string;
  jdFile?: File;
  useLlm?: boolean;
}

export async function analyzeResume(params: AnalyzeParams): Promise<AnalyzeResponse> {
  const form = new FormData();
  form.append('resume', params.resume);
  if (params.jdText) form.append('jd_text', params.jdText);
  if (params.jdFile) form.append('jd_file', params.jdFile);
  if (params.useLlm) form.append('use_llm', 'true');

  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as AnalyzeResponse;
}

export async function analyzeResumeHtml(params: AnalyzeParams): Promise<string> {
  const form = new FormData();
  form.append('resume', params.resume);
  if (params.jdText) form.append('jd_text', params.jdText);
  if (params.jdFile) form.append('jd_file', params.jdFile);
  if (params.useLlm) form.append('use_llm', 'true');

  const res = await fetch(`${API_BASE_URL}/analyze/html`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) throw new Error(await parseError(res));
  return res.text();
}
