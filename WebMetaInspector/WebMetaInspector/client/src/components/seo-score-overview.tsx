import { ArrowRight } from "lucide-react";
import type { SeoAnalysisResult } from "@/types/seo";

interface SeoScoreOverviewProps {
  analysis: SeoAnalysisResult;
}

export default function SeoScoreOverview({ analysis }: SeoScoreOverviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#388E3C";
    if (score >= 60) return "#F57C00";
    return "#D32F2F";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent optimization";
    if (score >= 60) return "Good optimization with room for improvement";
    return "Needs significant improvement";
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (analysis.score / 100) * circumference;

  const stats = {
    present: 0,
    partial: 0,
    missing: 0,
  };

  // Calculate stats
  if (analysis.title) stats.present++;
  else stats.missing++;

  if (analysis.metaDescription) stats.present++;
  else stats.missing++;

  // Open Graph
  const ogTags = [analysis.ogTitle, analysis.ogDescription, analysis.ogImage, analysis.ogUrl].filter(Boolean);
  if (ogTags.length === 4) stats.present++;
  else if (ogTags.length > 0) stats.partial++;
  else stats.missing++;

  // Twitter Cards
  const twitterTags = [analysis.twitterCard, analysis.twitterTitle, analysis.twitterDescription, analysis.twitterImage].filter(Boolean);
  if (twitterTags.length === 4) stats.present++;
  else if (twitterTags.length > 0) stats.partial++;
  else stats.missing++;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none"/>
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke={getScoreColor(analysis.score)}
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-neutral">{analysis.score}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-neutral mb-1">Overall SEO Score</h3>
          <p className="text-sm text-gray-600">{getScoreLabel(analysis.score)}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-neutral mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Title Tag</span>
            <div className="flex items-center">
              {analysis.title ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Present</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Missing</span>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Meta Description</span>
            <div className="flex items-center">
              {analysis.metaDescription ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Present</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Missing</span>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Open Graph</span>
            <div className="flex items-center">
              {ogTags.length === 4 ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Present</span>
                </>
              ) : ogTags.length > 0 ? (
                <>
                  <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Partial</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Missing</span>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Twitter Cards</span>
            <div className="flex items-center">
              {twitterTags.length === 4 ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Present</span>
                </>
              ) : twitterTags.length > 0 ? (
                <>
                  <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Partial</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Missing</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-neutral mb-4">Analysis Summary</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
            <span className="text-gray-600">{stats.present} tags optimized</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
            <span className="text-gray-600">{stats.partial} need improvement</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
            <span className="text-gray-600">{stats.missing} missing tags</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-primary text-sm font-medium hover:text-blue-700 flex items-center gap-1">
            View Detailed Report <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
