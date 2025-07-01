# SEO Meta Tag Analyzer - Replit Development Guide

## Overview

This is a full-stack web application for analyzing website SEO performance through meta tag analysis. The application fetches HTML from user-provided URLs, extracts SEO-relevant meta tags, and provides visual previews of how the site appears on Google Search, Facebook, and Twitter, along with an SEO score and actionable recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **HTML Parsing**: Cheerio for server-side HTML parsing
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: In-memory storage with fallback to PostgreSQL

### Build System
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for backend bundling, Vite for frontend
- **Module System**: ES modules throughout the stack

## Key Components

### Frontend Components
- **UrlInputForm**: Handles URL input with validation and normalization
- **SeoScoreOverview**: Displays overall SEO score with visual indicators
- **SearchPreview**: Shows Google search result preview
- **SocialPreviews**: Displays Facebook and Twitter card previews
- **DetailedAnalysis**: Comprehensive breakdown of SEO findings
- **LoadingState/ErrorState**: User feedback during analysis

### Backend Services
- **URL Analysis**: Fetches and parses HTML content from external URLs
- **SEO Scoring**: Calculates scores based on tag presence and quality
- **Recommendation Engine**: Generates actionable SEO improvement suggestions
- **Storage Layer**: Abstracts data persistence with in-memory fallback

### Database Schema
- **seo_analysis**: Stores analysis results with all extracted meta tags
- **users**: Basic user management (prepared for future authentication)

## Data Flow

1. **User Input**: URL entered via form with client-side validation
2. **URL Normalization**: Automatically adds HTTPS protocol if missing
3. **Server Request**: POST to `/api/analyze` with validated URL
4. **HTML Fetching**: Server fetches HTML content from target URL
5. **Tag Extraction**: Cheerio parses HTML and extracts meta tags
6. **Score Calculation**: Algorithm calculates SEO score (0-100)
7. **Recommendation Generation**: System generates improvement suggestions
8. **Data Storage**: Results saved to database with timestamp
9. **Client Response**: Complete analysis data returned to frontend
10. **UI Rendering**: Components render previews and detailed analysis

## External Dependencies

### Core Runtime Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe database ORM
- **cheerio**: Server-side HTML parsing
- **express**: Web application framework
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management

### UI/UX Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler
- **drizzle-kit**: Database migration tools

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with Express serving API routes
- **Database**: Neon Database with connection pooling
- **Environment**: Replit with custom error overlays and cartographer

### Production Build
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations ensure schema consistency
4. **Deployment**: Single Node.js process serves both API and static files

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Build outputs to `dist/` directory for production deployment

### Database Management
- **Development**: `npm run db:push` syncs schema changes
- **Production**: Drizzle migrations handle schema evolution
- **Storage**: PostgreSQL database with Drizzle ORM integration

## Changelog
```
Changelog:
- June 29, 2025. Complete SEO Meta Tag Analyzer implementation
  * Built full-stack SEO analysis tool with React frontend and Express backend
  * Implemented HTML fetching, meta tag parsing, and scoring system (0-100 points)
  * Created visual previews for Google Search, Facebook, and Twitter
  * Added detailed analysis with actionable recommendations
  * Integrated export functionality for JSON reports
  * Successfully tested with multiple websites (airbnb.com, standardowl.pages.dev, etc.)
- June 28, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```