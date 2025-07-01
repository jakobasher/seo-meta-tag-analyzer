import { CheckCircle, Loader } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-center space-x-3 text-gray-600">
        <Loader className="animate-spin h-5 w-5" />
        <span>Analyzing website...</span>
      </div>
      <div className="mt-4 bg-gray-100 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-3 h-3 text-success mr-2" />
            Fetching HTML content
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Loader className="animate-spin w-3 h-3 mr-2" />
            Parsing meta tags
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
            Generating previews
          </div>
        </div>
      </div>
    </div>
  );
}
