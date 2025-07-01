import { users, seoAnalysis, type User, type InsertUser, type SeoAnalysis, type InsertSeoAnalysis } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getSeoAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined>;
  getRecentAnalyses(limit?: number): Promise<SeoAnalysis[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSeoAnalysis(insertAnalysis: InsertSeoAnalysis): Promise<SeoAnalysis> {
    const [analysis] = await db
      .insert(seoAnalysis)
      .values(insertAnalysis)
      .returning();
    return analysis;
  }

  async getSeoAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined> {
    const [analysis] = await db.select().from(seoAnalysis).where(eq(seoAnalysis.url, url));
    return analysis || undefined;
  }

  async getRecentAnalyses(limit: number = 10): Promise<SeoAnalysis[]> {
    return await db.select()
      .from(seoAnalysis)
      .orderBy(desc(seoAnalysis.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
