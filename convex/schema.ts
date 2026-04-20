import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  assessments: defineTable({
    pincode: v.string(),
    roofArea: v.number(),
    dailyUsage: v.number(),
    systemSize: v.number(),
    annualYield: v.number(),
    annualSavings: v.number(),
    payback: v.number(),
    capex: v.number(),
    netCapex: v.number(),
    irradiance: v.number(),
    inputs: v.record(v.string(), v.any()),
    rooftopImage: v.optional(v.string()), // TODO: Migrate from Base64 to Convex File Storage for better performance
    usableRoofArea: v.optional(v.number()),
    shadowPercentage: v.optional(v.number()),
    confidenceScore: v.optional(v.number()),
    analysisNotes: v.optional(v.string()),
    createdAt: v.number()
  })
  .index("by_createdAt", ["createdAt"])
  .index("by_pincode", ["pincode"])
});
