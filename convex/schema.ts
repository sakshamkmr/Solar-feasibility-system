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
    createdAt: v.number()
  })
  .index("by_createdAt", ["createdAt"])
  .index("by_pincode", ["pincode"])
});
