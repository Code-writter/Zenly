
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    jobTitle: v.string(),
    jobDescription: v.string(),
    resumeData: v.object({
      personalInfo: v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        location: v.string(),
        website: v.optional(v.string()),
      }),
      summary: v.string(),
      experience: v.array(
        v.object({
          title: v.string(),
          company: v.string(),
          location: v.string(),
          startDate: v.string(),
          endDate: v.string(),
          description: v.string(),
        })
      ),
      education: v.array(
        v.object({
          degree: v.string(),
          school: v.string(),
          location: v.string(),
          graduationDate: v.string(),
          description: v.optional(v.string()),
        })
      ),
      skills: v.string(),
    }),
    atsScore: v.optional(v.number()),
    matchScore: v.optional(v.number()),
    improvementTips: v.optional(v.array(v.string())),
    keywordMatches: v.optional(
      v.array(
        v.object({
          keyword: v.string(),
          found: v.boolean(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const resumeId = await ctx.db.insert("resumes", {
      jobTitle: args.jobTitle,
      jobDescription: args.jobDescription,
      personalInfo: args.resumeData.personalInfo,
      summary: args.resumeData.summary,
      experience: args.resumeData.experience,
      education: args.resumeData.education,
      skills: args.resumeData.skills,
      atsScore: args.atsScore,
      matchScore: args.matchScore,
      improvementTips: args.improvementTips,
      keywordMatches: args.keywordMatches,
      createdAt: Date.now(),
    });

    return resumeId;
  },
});

export const getById = query({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("resumes").order("desc").collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("resumes"),
    resumeData: v.object({
      personalInfo: v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        location: v.string(),
        website: v.optional(v.string()),
      }),
      summary: v.string(),
      experience: v.array(
        v.object({
          title: v.string(),
          company: v.string(),
          location: v.string(),
          startDate: v.string(),
          endDate: v.string(),
          description: v.string(),
        })
      ),
      education: v.array(
        v.object({
          degree: v.string(),
          school: v.string(),
          location: v.string(),
          graduationDate: v.string(),
          description: v.optional(v.string()),
        })
      ),
      skills: v.string(),
    }),
    atsScore: v.optional(v.number()),
    matchScore: v.optional(v.number()),
    improvementTips: v.optional(v.array(v.string())),
    keywordMatches: v.optional(
      v.array(
        v.object({
          keyword: v.string(),
          found: v.boolean(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      personalInfo: args.resumeData.personalInfo,
      summary: args.resumeData.summary,
      experience: args.resumeData.experience,
      education: args.resumeData.education,
      skills: args.resumeData.skills,
      atsScore: args.atsScore,
      matchScore: args.matchScore,
      improvementTips: args.improvementTips,
      keywordMatches: args.keywordMatches,
    });
  },
});
