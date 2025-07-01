import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: Error | unknown;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 text-error rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-neutral mb-2">Analysis Failed</h3>
        <p className="text-gray-600 mb-4">{errorMessage}</p>
        <div className="space-y-2 text-sm text-gray-500 mb-6">
          <div>• Make sure the URL is accessible publicly</div>
          <div>• Check that the website doesn't block crawlers</div>
          <div>• Verify the URL format is correct</div>
        </div>
        <Button 
          onClick={onRetry}
          className="bg-primary text-white px-6 py-2 font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Try Another URL
        </Button>
      </div>
    </section>
  );
}
