import type { SeoAnalysisResult } from "@/types/seo";
import { AlertTriangle, X } from "lucide-react";

interface SocialPreviewsProps {
  analysis: SeoAnalysisResult;
}

export default function SocialPreviews({ analysis }: SocialPreviewsProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '').toUpperCase();
    } catch {
      return url.toUpperCase();
    }
  };

  // Fallback to main title/description if OG/Twitter tags are missing
  const ogTitle = analysis.ogTitle || analysis.title || "No title found";
  const ogDescription = analysis.ogDescription || analysis.metaDescription || "No description found";
  const twitterTitle = analysis.twitterTitle || analysis.title || "No title found";
  const twitterDescription = analysis.twitterDescription || analysis.metaDescription || "No description found";

  return (
    <div className="space-y-6">
      {/* Facebook/LinkedIn Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral">Facebook Preview</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Open Graph
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {analysis.ogImage ? (
            <img 
              src={analysis.ogImage} 
              alt="Open Graph preview" 
              className="w-full h-40 object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">No image</span>
              </div>
            </div>
          )}
          <div className="p-4 bg-white">
            <div className="text-xs text-gray-500 uppercase mb-1">{getDomain(analysis.url)}</div>
            <h4 className="font-semibold text-neutral mb-1 line-clamp-2">
              {ogTitle}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {ogDescription}
            </p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs">
          {!analysis.ogImage ? (
            <span className="text-gray-600 flex items-center">
              <AlertTriangle className="w-3 h-3 text-warning mr-1" />
              Missing og:image tag
            </span>
          ) : (
            <span className="text-gray-600">Image found</span>
          )}
          <span className="text-gray-500">1200×630 recommended</span>
        </div>
      </div>

      {/* Twitter Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral">Twitter Preview</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="#1DA1F2" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Summary Card
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex space-x-3">
            {analysis.twitterImage ? (
              <img 
                src={analysis.twitterImage} 
                alt="Twitter card preview" 
                className="w-16 h-16 rounded object-cover flex-shrink-0" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">{getDomain(analysis.url).toLowerCase()}</div>
              <h4 className="font-medium text-neutral text-sm mb-1 line-clamp-1">
                {twitterTitle}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {twitterDescription}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-xs">
          {!analysis.twitterCard ? (
            <div className="flex items-center text-error">
              <X className="w-3 h-3 mr-1" />
              Twitter Card tags not found
            </div>
          ) : (
            <div className="text-gray-600">
              Card type: {analysis.twitterCard}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
