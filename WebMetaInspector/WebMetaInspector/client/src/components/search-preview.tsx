import { Star } from "lucide-react";
import type { SeoAnalysisResult } from "@/types/seo";

interface SearchPreviewProps {
  analysis: SeoAnalysisResult;
}

export default function SearchPreview({ analysis }: SearchPreviewProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral">Google Search Preview</h3>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 7l.985-4.149c.504-2.135-1.084-4.084-3.31-4.084-2.226 0-3.814 1.949-3.31 4.084L7.367 7H3.75A1.75 1.75 0 0 0 2 8.75v10.5A1.75 1.75 0 0 0 3.75 21h16.5A1.75 1.75 0 0 0 22 19.25V8.75A1.75 1.75 0 0 0 20.25 7h-3.617l.985-4.149c.504-2.135-1.084-4.084-3.31-4.084-2.226 0-3.814 1.949-3.31 4.084L12.017 7zM9.25 8.75A.25.25 0 0 1 9.5 8.5h5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5a.25.25 0 0 1-.25-.25v-.5z"/>
          </svg>
          Desktop View
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">{getDomain(analysis.url)}</div>
          <h4 className="text-lg text-blue-700 hover:underline cursor-pointer">
            {analysis.title || "No title tag found"}
          </h4>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {analysis.metaDescription || "No meta description found. Search engines may generate their own description from page content."}
        </p>
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <span className="mr-4">{formatDate()}</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span>4.8 ★★★★★</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-600 flex items-center">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        This preview shows how your page appears in Google search results
      </div>
    </div>
  );
}
