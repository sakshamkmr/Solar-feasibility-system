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
      inputs: v.record(v.string(), v.any()), // ✅ Stores ALL form data!
      rooftopImage: v.optional(v.string()), // Keep in args for frontend payload checks
      // Below are optional analysis metric fields kept for future integration
      usableRoofArea: v.optional(v.number()),
      shadowPercentage: v.optional(v.number()),
      confidenceScore: v.optional(v.number()),
      analysisNotes: v.optional(v.string()),
    })
  },
  handler: async (ctx, args) => {
    // Isolate properties and strip the Base64 image payload which exceeds the 1 MiB limit
    const { rooftopImage, inputs, ...rest } = args.assessment;
    
    const cleanedInputs = { ...inputs };
    if (cleanedInputs.rooftopImage) {
      delete cleanedInputs.rooftopImage; // The base64 copy within inputs array
    }

    return await ctx.db.insert("assessments", { 
      ...rest,
      inputs: cleanedInputs,
      // Intentionally omitting rooftopImage to avoid document size limit errors
      createdAt: Date.now() 
    });
  }
});

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
  },
});

export const getAssessmentById = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, { id }) => {
    const assessment = await ctx.db.get(id);
    if (!assessment) throw new Error("Assessment not found");
    return assessment;
  },
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
  },
});
