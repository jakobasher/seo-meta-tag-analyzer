export interface SeoAnalysisResult {
  id: number;
  url: string;
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  robotsMeta: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogUrl: string | null;
  ogSiteName: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  score: number;
  recommendations: Recommendation[];
  createdAt: string;
}

export interface Recommendation {
  priority: "high" | "medium" | "low";
  category: string;
  issue: string;
  recommendation: string;
  impact: string;
}

export interface AnalyzeUrlRequest {
  url: string;
}
