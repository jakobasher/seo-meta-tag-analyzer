# SEO Meta Tag Analyzer

A professional web application that analyzes website SEO performance through comprehensive meta tag analysis. Get instant insights, social media previews, and actionable recommendations to improve your search engine rankings.

## Features

- **URL Analysis**: Analyze any public website's SEO performance
- **Meta Tag Extraction**: Comprehensive parsing of title, description, Open Graph, and Twitter Cards
- **SEO Scoring**: 0-100 point scoring system with detailed breakdown
- **Visual Previews**: 
  - Google Search result preview
  - Facebook/LinkedIn social media preview
  - Twitter card preview
- **Detailed Analysis**: In-depth review with actionable recommendations
- **Export Functionality**: Download analysis reports as JSON
- **Database Storage**: Persistent storage with PostgreSQL

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Wouter for lightweight client-side routing
- TanStack Query for server state management
- Radix UI primitives with shadcn/ui components
- Tailwind CSS for styling

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- Cheerio for HTML parsing
- PostgreSQL with Drizzle ORM
- Neon Database (serverless PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (or use Neon Database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd seo-meta-tag-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## Usage

1. Enter any public website URL in the input field
2. Click "Analyze SEO" to start the analysis
3. Review the overall SEO score and quick stats
4. Examine the Google Search and social media previews
5. Check the detailed analysis for specific recommendations
6. Export the report as JSON if needed

## API Endpoints

- `POST /api/analyze` - Analyze a website URL
- `GET /api/recent` - Get recent analysis history

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Application pages
│   │   ├── types/        # TypeScript type definitions
│   │   └── lib/          # Utilities and API client
├── server/               # Backend Express application
│   ├── routes.ts         # API routes and SEO analysis logic
│   ├── storage.ts        # Database storage layer
│   └── db.ts             # Database connection
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle database schema
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with Replit development environment
- Uses shadcn/ui for beautiful UI components
- Powered by Drizzle ORM for type-safe database operations