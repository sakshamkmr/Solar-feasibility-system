import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveAssessment = mutation({
  args: { 
    assessment: v.object({
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
      inputs: v.object({})
    })
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("assessments", {
      ...args.assessment,
      createdAt: Date.now()
    });
  }
});

// ✅ CORRECT: Use for await loop (NO chaining errors!)
export const getRecentAssessments = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const assessments = [];
    const limit = args.limit || 10;
    
    for await (const assessment of ctx.db.query("assessments").order("desc")) {
      assessments.push(assessment);
      if (assessments.length >= limit) break;
    }
    
    return assessments;
  }
});

export const getDashboardStats = query({
  handler: async (ctx) => {
    const assessments = [];
    for await (const assessment of ctx.db.query("assessments")) {
      assessments.push(assessment);
    }
    
    const totalSavings = assessments.reduce((sum, a) => sum + (a.annualSavings || 0), 0);
    
    return {
      totalAssessments: assessments.length,
      totalSavings: Math.round(totalSavings),
      avgPayback: assessments.length > 0 
        ? parseFloat((assessments.reduce((sum, a) => sum + (a.payback || 0), 0) / assessments.length).toFixed(1))
        : 0,
      bestSavings: Math.round(Math.max(...assessments.map(a => a.annualSavings || 0), 0))
    };
  }
});
