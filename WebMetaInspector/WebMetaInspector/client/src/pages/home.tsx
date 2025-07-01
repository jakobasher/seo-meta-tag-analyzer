import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Search, Globe } from "lucide-react";
import type { SeoAnalysisResult, AnalyzeUrlRequest } from "@/types/seo";
import UrlInputForm from "@/components/url-input-form";
import SeoScoreOverview from "@/components/seo-score-overview";
import SearchPreview from "@/components/search-preview";
import SocialPreviews from "@/components/social-previews";
import DetailedAnalysis from "@/components/detailed-analysis";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (data: AnalyzeUrlRequest): Promise<SeoAnalysisResult> => {
      const response = await apiRequest("POST", "/api/analyze", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
  });

  const handleAnalyze = (url: string) => {
    setAnalysisResult(null);
    analyzeMutation.mutate({ url });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    analyzeMutation.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-3 rounded-lg">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral">SEO Meta Tag Analyzer</h1>
                <p className="text-gray-600">Analyze and optimize your website's SEO performance</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Free Analysis</div>
                <div className="text-lg font-semibold text-neutral">100/100 Score Possible</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-neutral mb-2">Enter Website URL to Analyze</h2>
              <p className="text-gray-600">Get instant SEO insights and social media preview analysis</p>
            </div>
            
            <UrlInputForm onSubmit={handleAnalyze} isLoading={analyzeMutation.isPending} />
            
            {analyzeMutation.isPending && <LoadingState />}
          </div>
        </section>

        {/* Error State */}
        {analyzeMutation.isError && (
          <ErrorState 
            error={analyzeMutation.error} 
            onRetry={handleReset}
          />
        )}

        {/* Results Section */}
        {analysisResult && (
          <>
            {/* SEO Score Overview */}
            <SeoScoreOverview analysis={analysisResult} />

            {/* Preview Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <SearchPreview analysis={analysisResult} />
              <SocialPreviews analysis={analysisResult} />
            </div>

            {/* Detailed Analysis */}
            <DetailedAnalysis analysis={analysisResult} onReanalyze={() => handleAnalyze(analysisResult.url)} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-white p-2 rounded">
                  <Search className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral">SEO Analyzer</span>
              </div>
              <p className="text-gray-600 text-sm">Professional SEO analysis tool for optimizing your website's search engine visibility and social media presence.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Meta tag analysis</li>
                <li>• Social media previews</li>
                <li>• SEO scoring system</li>
                <li>• Actionable recommendations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Documentation</li>
                <li>• API Reference</li>
                <li>• Best Practices Guide</li>
                <li>• Contact Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 SEO Meta Tag Analyzer. Built for modern web optimization.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
