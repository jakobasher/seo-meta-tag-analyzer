import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSeoAnalysisSchema } from "@shared/schema";
import { z } from "zod";
import * as cheerio from "cheerio";

const analyzeUrlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    // Try adding https:// if no protocol
    try {
      const urlObj = new URL(`https://${url}`);
      return urlObj.href;
    } catch {
      throw new Error("Invalid URL format");
    }
  }
}

function calculateSeoScore(data: any): number {
  let score = 0;
  const maxScore = 100;

  // Title tag (15 points)
  if (data.title) {
    const titleLength = data.title.length;
    if (titleLength >= 30 && titleLength <= 60) {
      score += 15;
    } else if (titleLength > 0) {
      score += 10;
    }
  }

  // Meta description (15 points)
  if (data.metaDescription) {
    const descLength = data.metaDescription.length;
    if (descLength >= 120 && descLength <= 160) {
      score += 15;
    } else if (descLength > 0) {
      score += 10;
    }
  }

  // Open Graph tags (25 points)
  let ogScore = 0;
  if (data.ogTitle) ogScore += 6;
  if (data.ogDescription) ogScore += 6;
  if (data.ogImage) ogScore += 8;
  if (data.ogUrl) ogScore += 3;
  if (data.ogSiteName) ogScore += 2;
  score += ogScore;

  // Twitter Cards (25 points)
  let twitterScore = 0;
  if (data.twitterCard) twitterScore += 7;
  if (data.twitterTitle) twitterScore += 6;
  if (data.twitterDescription) twitterScore += 6;
  if (data.twitterImage) twitterScore += 6;
  score += twitterScore;

  // Additional elements (20 points)
  if (data.canonical) score += 10;
  if (data.robotsMeta && data.robotsMeta !== 'index, follow') score += 5;
  else if (data.robotsMeta) score += 3;
  
  // Viewport meta (always present in modern sites)
  score += 5;

  return Math.min(score, maxScore);
}

function generateRecommendations(data: any, score: number): any[] {
  const recommendations = [];

  // Critical issues (score impact > 10)
  if (!data.twitterCard) {
    recommendations.push({
      priority: "high",
      category: "Twitter Cards",
      issue: "Twitter Card tags not found",
      recommendation: "Add Twitter Card meta tags starting with twitter:card=\"summary_large_image\"",
      impact: "High - Missing social media optimization for Twitter"
    });
  }

  if (!data.ogImage) {
    recommendations.push({
      priority: "high",
      category: "Open Graph",
      issue: "Missing og:image tag",
      recommendation: "Add og:image meta tag with 1200×630px image",
      impact: "High - Poor social media sharing appearance"
    });
  }

  // Medium priority issues
  if (!data.title || data.title.length < 30 || data.title.length > 60) {
    recommendations.push({
      priority: "medium",
      category: "Title Tag",
      issue: data.title ? "Title length not optimal" : "Title tag missing",
      recommendation: "Create title tag between 30-60 characters",
      impact: "Medium - Affects search engine rankings"
    });
  }

  if (!data.metaDescription || data.metaDescription.length < 120) {
    recommendations.push({
      priority: "medium",
      category: "Meta Description",
      issue: data.metaDescription ? "Description too short" : "Meta description missing",
      recommendation: "Create description between 120-160 characters",
      impact: "Medium - Affects click-through rates"
    });
  }

  if (!data.ogUrl) {
    recommendations.push({
      priority: "medium",
      category: "Open Graph",
      issue: "Missing og:url tag",
      recommendation: "Add og:url meta tag with canonical URL",
      impact: "Medium - Affects social media sharing"
    });
  }

  // Low priority issues
  if (!data.canonical) {
    recommendations.push({
      priority: "low",
      category: "Technical SEO",
      issue: "Missing canonical URL",
      recommendation: "Add canonical link tag to prevent duplicate content",
      impact: "Low - Helps with duplicate content issues"
    });
  }

  return recommendations;
}

async function fetchAndParseSeo(url: string) {
  try {
    const normalizedUrl = normalizeUrl(url);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const seoData = {
      url: normalizedUrl,
      title: $('title').text().trim() || null,
      metaDescription: $('meta[name="description"]').attr('content')?.trim() || null,
      canonical: $('link[rel="canonical"]').attr('href') || null,
      robotsMeta: $('meta[name="robots"]').attr('content') || 'index, follow',
      
      // Open Graph tags
      ogTitle: $('meta[property="og:title"]').attr('content')?.trim() || null,
      ogDescription: $('meta[property="og:description"]').attr('content')?.trim() || null,
      ogImage: $('meta[property="og:image"]').attr('content') || null,
      ogUrl: $('meta[property="og:url"]').attr('content') || null,
      ogSiteName: $('meta[property="og:site_name"]').attr('content')?.trim() || null,
      
      // Twitter Cards
      twitterCard: $('meta[name="twitter:card"]').attr('content') || null,
      twitterTitle: $('meta[name="twitter:title"]').attr('content')?.trim() || null,
      twitterDescription: $('meta[name="twitter:description"]').attr('content')?.trim() || null,
      twitterImage: $('meta[name="twitter:image"]').attr('content') || null,
    };

    const score = calculateSeoScore(seoData);
    const recommendations = generateRecommendations(seoData, score);

    return {
      ...seoData,
      score,
      recommendations,
    };
  } catch (error) {
    console.error('Error fetching/parsing SEO data:', error);
    throw new Error(`Failed to analyze URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze URL endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = analyzeUrlSchema.parse(req.body);
      
      // Check if we have a recent analysis for this URL
      const existingAnalysis = await storage.getSeoAnalysisByUrl(url);
      if (existingAnalysis && new Date().getTime() - new Date(existingAnalysis.createdAt).getTime() < 300000) { // 5 minutes cache
        return res.json(existingAnalysis);
      }

      const seoData = await fetchAndParseSeo(url);
      const analysis = await storage.createSeoAnalysis(seoData);
      
      res.json(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze URL" 
      });
    }
  });

  // Get recent analyses
  app.get("/api/recent", async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses(5);
      res.json(analyses);
    } catch (error) {
      console.error('Error fetching recent analyses:', error);
      res.status(500).json({ message: "Failed to fetch recent analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
