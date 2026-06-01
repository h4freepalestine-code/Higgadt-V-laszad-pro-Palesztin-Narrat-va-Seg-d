export interface PresetTrollComment {
  id: string;
  category: string;
  commentText: string;
  mythSummary: string;
  localDebunk?: {
    rebuttal: string;
    keyFacts: string[];
    lawsApplicable: string[];
    furtherReading?: string;
  };
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

export interface PropagandaTactic {
  id: string;
  name: string;
  description: string;
  example: string;
  counterStrategy: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export interface OsintNarrative {
  narrativeTitle: string;
  commonHungarianPhrases: string[];
  tacticalPurpose: string;
  manipulationIntensity: string;
}

export interface OsintFinding {
  issueTitle: string;
  mediaQuotationExample: string;
  factCheckDebunk: string;
  internationalLawHivatalosReferencia: string;
}

export interface OsintResult {
  analysisTime: string;
  riskLevel: string;
  confidenceScore: number;
  biasRating: string;
  detectedNarratives: OsintNarrative[];
  keyFindings: OsintFinding[];
  verdict: string;
}
