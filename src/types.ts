export interface PresetTrollComment {
  id: string;
  category: string;
  commentText: string;
  mythSummary: string;
}

export interface GeneratedCounter {
  response: string;
  tacticalAdvice: string;
  keyFactsUsed: string[];
  pitfallsToAvoid: string[];
}

export interface SavedResponse {
  id: string;
  originalComment: string;
  tone: string;
  generatedAt: string;
  response: string;
  tacticalAdvice: string;
  keyFactsUsed: string[];
  pitfallsToAvoid: string[];
}

export interface ResourceItem {
  title: string;
  description: string;
  linkText: string;
  url: string;
  category: "un" | "ngo" | "law";
}
