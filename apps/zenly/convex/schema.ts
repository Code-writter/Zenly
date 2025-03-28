import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values'


export default defineSchema({
    users : defineTable({
        name : v.string(),
        email : v.string(),
        image : v.optional(v.string()),
        role : v.union(v.literal("candidate"), v.literal("interviewer")),
        clerkId : v.string()
    }).index("by_clerk_id", ["clerkId"]),

    todos: defineTable({
        userId: v.id("users"),
        projectId: v.id("projects"),
        labelId: v.id("labels"),
        taskName: v.string(),
        description: v.optional(v.string()),
        dueDate: v.number(),
        priority: v.optional(v.float64()),
        isCompleted: v.boolean(),
        embedding: v.optional(v.array(v.float64())),
    }).vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["userId"],
    }),
    
    subTodos: defineTable({
        userId: v.id("users"),
        projectId: v.id("projects"),
        labelId: v.id("labels"),
        parentId: v.id("todos"),
        taskName: v.string(),
        description: v.optional(v.string()),
        dueDate: v.number(),
        priority: v.optional(v.float64()),
        isCompleted: v.boolean(),
        embedding: v.optional(v.array(v.float64())),
    }).vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["userId"],
    }),


    labels : defineTable({
        name : v.string(),
        type : v.union(v.literal("user"), v.literal("system")),
        userId : v.optional(v.union(v.id("users"), v.null()))
    }),
    
    projects : defineTable({
        name : v.string(),
        type : v.union(v.literal("user"), v.literal("system")),
        userId : v.optional(v.union(v.id("users"), v.null()))
    }),

    resumes: defineTable({
        userId: v.optional(v.string()),
        jobTitle: v.string(),
        jobDescription: v.string(),
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
        createdAt: v.number(),
      }),
})