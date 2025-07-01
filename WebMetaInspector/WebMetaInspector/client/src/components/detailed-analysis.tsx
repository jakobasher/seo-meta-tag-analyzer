import { Check, X, AlertTriangle, Download, RotateCcw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SeoAnalysisResult, Recommendation } from "@/types/seo";

interface DetailedAnalysisProps {
  analysis: SeoAnalysisResult;
  onReanalyze: () => void;
}

interface AnalysisItem {
  title: string;
  description: string;
  status: "success" | "warning" | "error";
  score: number;
  maxScore: number;
  content?: string;
  length?: number;
  checks: { label: string; status: "success" | "warning" | "error"; message: string }[];
  recommendation?: string;
}

export default function DetailedAnalysis({ analysis, onReanalyze }: DetailedAnalysisProps) {
  const getStatusIcon = (status: "success" | "warning" | "error") => {
    switch (status) {
      case "success":
        return <Check className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "error":
        return <X className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: "success" | "warning" | "error") => {
    switch (status) {
      case "success":
        return "bg-success text-white";
      case "warning":
        return "bg-warning text-white";
      case "error":
        return "bg-error text-white";
    }
  };

  const getStatusTextColor = (status: "success" | "warning" | "error") => {
    switch (status) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-error";
    }
  };

  const analysisItems: AnalysisItem[] = [
    {
      title: "Title Tag",
      description: "HTML <title> element",
      status: analysis.title ? (analysis.title.length >= 30 && analysis.title.length <= 60 ? "success" : "warning") : "error",
      score: analysis.title ? (analysis.title.length >= 30 && analysis.title.length <= 60 ? 15 : 10) : 0,
      maxScore: 15,
      content: analysis.title,
      length: analysis.title?.length,
      checks: [
        {
          label: "Title tag present",
          status: analysis.title ? "success" : "error",
          message: analysis.title ? "Title tag is present" : "Title tag is missing"
        },
        {
          label: "Optimal length",
          status: analysis.title && analysis.title.length >= 30 && analysis.title.length <= 60 ? "success" : "warning",
          message: analysis.title ? 
            (analysis.title.length >= 30 && analysis.title.length <= 60 ? "Length is optimal (30-60 characters)" : "Length should be 30-60 characters") :
            "No title to check"
        }
      ],
      recommendation: !analysis.title ? "Add a descriptive title tag" : 
        (analysis.title.length < 30 || analysis.title.length > 60) ? "Adjust title length to 30-60 characters" : undefined
    },
    {
      title: "Meta Description",
      description: "HTML meta description",
      status: analysis.metaDescription ? (analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? "success" : "warning") : "error",
      score: analysis.metaDescription ? (analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? 15 : 10) : 0,
      maxScore: 15,
      content: analysis.metaDescription,
      length: analysis.metaDescription?.length,
      checks: [
        {
          label: "Meta description present",
          status: analysis.metaDescription ? "success" : "error",
          message: analysis.metaDescription ? "Meta description is present" : "Meta description is missing"
        },
        {
          label: "Optimal length",
          status: analysis.metaDescription && analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? "success" : "warning",
          message: analysis.metaDescription ? 
            (analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? "Length is optimal (120-160 characters)" : "Length should be 120-160 characters") :
            "No description to check"
        }
      ],
      recommendation: !analysis.metaDescription ? "Add a compelling meta description" : 
        (analysis.metaDescription.length < 120 || analysis.metaDescription.length > 160) ? "Adjust description length to 120-160 characters" : undefined
    },
    {
      title: "Open Graph Tags",
      description: "Facebook & LinkedIn sharing",
      status: [analysis.ogTitle, analysis.ogDescription, analysis.ogImage, analysis.ogUrl].filter(Boolean).length >= 3 ? "success" : 
        [analysis.ogTitle, analysis.ogDescription, analysis.ogImage, analysis.ogUrl].filter(Boolean).length > 0 ? "warning" : "error",
      score: [analysis.ogTitle, analysis.ogDescription, analysis.ogImage, analysis.ogUrl].filter(Boolean).length * 6,
      maxScore: 25,
      checks: [
        {
          label: "og:title",
          status: analysis.ogTitle ? "success" : "error",
          message: analysis.ogTitle ? "Present" : "Missing"
        },
        {
          label: "og:description",
          status: analysis.ogDescription ? "success" : "error",
          message: analysis.ogDescription ? "Present" : "Missing"
        },
        {
          label: "og:image",
          status: analysis.ogImage ? "success" : "error",
          message: analysis.ogImage ? "Present" : "Missing"
        },
        {
          label: "og:url",
          status: analysis.ogUrl ? "success" : "warning",
          message: analysis.ogUrl ? "Present" : "Missing"
        }
      ],
      recommendation: "Add missing Open Graph tags for better social media sharing"
    },
    {
      title: "Twitter Cards",
      description: "Twitter sharing optimization",
      status: [analysis.twitterCard, analysis.twitterTitle, analysis.twitterDescription, analysis.twitterImage].filter(Boolean).length >= 3 ? "success" : 
        [analysis.twitterCard, analysis.twitterTitle, analysis.twitterDescription, analysis.twitterImage].filter(Boolean).length > 0 ? "warning" : "error",
      score: [analysis.twitterCard, analysis.twitterTitle, analysis.twitterDescription, analysis.twitterImage].filter(Boolean).length * 6,
      maxScore: 25,
      checks: [
        {
          label: "twitter:card",
          status: analysis.twitterCard ? "success" : "error",
          message: analysis.twitterCard ? "Present" : "Missing"
        },
        {
          label: "twitter:title",
          status: analysis.twitterTitle ? "success" : "error",
          message: analysis.twitterTitle ? "Present" : "Missing"
        },
        {
          label: "twitter:description",
          status: analysis.twitterDescription ? "success" : "error",
          message: analysis.twitterDescription ? "Present" : "Missing"
        },
        {
          label: "twitter:image",
          status: analysis.twitterImage ? "success" : "error",
          message: analysis.twitterImage ? "Present" : "Missing"
        }
      ],
      recommendation: "Add Twitter Card meta tags for optimal Twitter sharing"
    },
    {
      title: "Additional Elements",
      description: "Canonical URL & robots meta",
      status: analysis.canonical && analysis.robotsMeta ? "success" : "warning",
      score: (analysis.canonical ? 10 : 0) + (analysis.robotsMeta && analysis.robotsMeta !== 'index, follow' ? 5 : 3) + 5, // +5 for viewport
      maxScore: 20,
      checks: [
        {
          label: "Canonical URL",
          status: analysis.canonical ? "success" : "warning",
          message: analysis.canonical ? "Present" : "Missing"
        },
        {
          label: "Meta robots",
          status: analysis.robotsMeta ? "success" : "warning",
          message: analysis.robotsMeta || "Default (index, follow)"
        },
        {
          label: "Viewport meta",
          status: "success",
          message: "Present"
        }
      ]
    }
  ];

  const priorityRecommendations = analysis.recommendations
    .sort((a: Recommendation, b: Recommendation) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);

  const exportReport = () => {
    const report = {
      url: analysis.url,
      score: analysis.score,
      analyzedAt: new Date().toISOString(),
      findings: analysisItems,
      recommendations: analysis.recommendations
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-analysis-${new URL(analysis.url).hostname}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-neutral">Detailed SEO Analysis</h3>
        <p className="text-sm text-gray-600 mt-1">Review each meta tag and get actionable recommendations</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {analysisItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getStatusTextColor(item.status)}`}>
                    {item.score}/{item.maxScore}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.status === "success" ? "Perfect" : item.status === "warning" ? "Good" : "Needs Work"}
                  </div>
                </div>
              </div>
              
              {item.content && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-sm font-mono text-gray-700 break-words">
                    "{item.content}"
                  </div>
                  {item.length && (
                    <div className="text-xs text-gray-500 mt-1">
                      Length: {item.length} characters 
                      {item.title === "Title Tag" && (item.length >= 30 && item.length <= 60 ? " (optimal)" : "")}
                      {item.title === "Meta Description" && (item.length >= 120 && item.length <= 160 ? " (optimal)" : "")}
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-1">
                {item.checks.map((check, checkIndex) => (
                  <div key={checkIndex} className={`flex items-center text-sm ${getStatusTextColor(check.status)}`}>
                    {getStatusIcon(check.status)}
                    <span className="ml-2">{check.message}</span>
                  </div>
                ))}
              </div>

              {item.recommendation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <div className="text-sm text-blue-800">
                    <strong>Recommendation:</strong> {item.recommendation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Items */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <h4 className="font-medium text-neutral mb-3">Priority Action Items</h4>
        <div className="space-y-2">
          {priorityRecommendations.map((rec: Recommendation, index: number) => (
            <div key={index} className="flex items-start">
              <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                rec.priority === "high" ? "bg-error" : rec.priority === "medium" ? "bg-warning" : "bg-gray-400"
              }`}></div>
              <div className="text-sm">
                <span className="font-medium text-neutral">
                  {rec.priority === "high" ? "High Priority:" : rec.priority === "medium" ? "Medium Priority:" : "Low Priority:"}
                </span>
                <span className="text-gray-600"> {rec.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={exportReport}
              className="bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button 
              onClick={onReanalyze}
              variant="outline"
              className="px-4 py-2 text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Re-analyze
            </Button>
            <Button 
              variant="outline"
              className="px-4 py-2 text-sm font-medium"
              disabled
            >
              <Scale className="w-4 h-4 mr-2" />
              Compare URLs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
