import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const urlFormSchema = z.object({
  url: z.string().min(1, "Please enter a URL").refine(
    (url) => {
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    },
    "Please enter a valid URL"
  ),
});

type UrlFormData = z.infer<typeof urlFormSchema>;

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInputForm({ onSubmit, isLoading }: UrlInputFormProps) {
  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = (data: UrlFormData) => {
    let url = data.url.trim();
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }
    onSubmit(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://example.com"
                        className="pl-10 py-3 text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <div className="mt-1 text-xs text-gray-500">Enter any public website URL</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Analyze SEO
          </Button>
        </div>
      </form>
    </Form>
  );
}
