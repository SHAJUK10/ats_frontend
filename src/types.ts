export interface AnalyzeMeta {
  file_name: string;
  page_count: number;
  word_count: number;
  elapsed_seconds: number;
}

export interface SemanticMatch {
  jd_skill: string;
  resume_match: string;
  similarity: number;
  confidence: string;
}

export interface CategoryBreakdown {
  contact: CategoryScore;
  sections: CategoryScore;
  formatting: CategoryScore;
  grammar: CategoryScore;
  readability: CategoryScore;
  exact_keywords: CategoryScore;
  semantic_match: CategoryScore;
  experience: CategoryScore;
  projects: CategoryScore;
  education: CategoryScore;
  achievements: CategoryScore;
  action_verbs: CategoryScore;
  duplicates: CategoryScore;
  formatting_penalty: CategoryScore;
}

export interface CategoryScore {
  score: number;
  max: number;
  note?: string;
}

export interface AnalyzeReport {
  overall_score: number;
  rule_based_score: number;
  semantic_score: number;
  ats_probability: number;
  jd_provided: boolean;
  contact_score: number;
  sections_score: number;
  formatting_score: number;
  grammar_score: number;
  readability_score: number;
  keyword_score: number;
  experience_score: number;
  projects_score: number;
  education_score: number;
  achievements_score: number;
  action_verbs_score: number;
  duplicates_score: number;
  formatting_penalty_score: number;
  semantic_matches: SemanticMatch[];
  missing_keywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  issues: string[];
  category_breakdown: CategoryBreakdown;
}

export interface LlmFeedback {
  provider_used?: string;
  [key: string]: unknown;
}

export interface AnalyzeResponse {
  meta: AnalyzeMeta;
  report: AnalyzeReport;
  llm_feedback?: LlmFeedback;
}

export interface HealthResponse {
  status?: string;
  [key: string]: unknown;
}

export interface ConfigResponse {
  llm_configured: boolean;
  [key: string]: unknown;
}

export interface ApiError {
  detail: string;
}
