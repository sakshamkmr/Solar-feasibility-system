import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Placeholder helper for Azure Vision integration.
 * In a full production implementation, this would send the Base64 image payload (or a cloud storage URL)
 * to the Azure Computer Vision API and parse the results.
 */
async function callAzureVisionAPI(base64Image: string) {
  const endpoint = process.env.AZURE_VISION_ENDPOINT;
  const key = process.env.AZURE_VISION_KEY;

  if (!endpoint || !key) {
    throw new Error("Azure Vision credentials missing in environment variables.");
  }

  // Ensure endpoint does not have a trailing slash
  const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  // Features: tags and caption are typical for general image analysis
  const apiUrl = `${baseUrl}/computervision/imageanalysis:analyze?api-version=2023-10-01&features=tags,caption`;

  // Azure Vision GA API has a 6144-byte limit for JSON payloads, causing Base64 inline JSON to fail.
  // Instead, we strip the Data URI prefix and convert to a binary array buffer, 
  // transferring it natively as an application/octet-stream to bypass JSON limits.
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  
  const binaryStr = atob(base64Data);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': key
    },
    body: bytes
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure Vision API failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  if (!data) {
    throw new Error("Empty response received from Azure Vision.");
  }

  // Deterministically infer structured outputs from Azure Vision tags/caption.
  // Azure Vision generic models don't return 'usableRoofArea' directly.
  let usableRoofArea = 80;
  let shadowPercentage = 15;
  let confidenceScore = 0.85;
  let analysisNotes = "Standard roof profile detected.";

  if (data.tagsResult && data.tagsResult.values && data.tagsResult.values.length > 0) {
    const tags = data.tagsResult.values.map((t: any) => t.name.toLowerCase());
    const caption = data.captionResult?.text?.toLowerCase() || "";
    
    // Base confidence provided by Azure AI 
    confidenceScore = data.tagsResult.values[0]?.confidence || 0.85;

    let notes = [];
    
    // --- QUALITY ADJUSTMENT LAYER ---
    // Prevent blurry or low-quality images from getting an unrealistically high trust score.
    // If the image is blurry, we cap the effective trust score so the solar calculation 
    // falls back safely to the manual baseline roof area.
    const isBlurry = tags.some((t: string) => t.includes('blur') || t.includes('unclear') || t.includes('low resolution') || t.includes('text') || t.includes('dark')) || caption.includes('blur');
    const isAerial = tags.some((t: string) => t.includes('aerial') || t.includes('satellite') || t.includes('map') || t.includes('top-down')) || caption.includes('aerial');
    const isRoof = tags.some((t: string) => t.includes('roof') || t.includes('building') || t.includes('house')) || caption.includes('roof');

    if (isBlurry) {
      confidenceScore = Math.min(confidenceScore, 0.2); // Heavily restrict influence
      notes.push("WARNING: Image detected as blurry or low-quality. Trust score capped to favor manual baseline.");
    } else if (!isAerial && !isRoof) {
      confidenceScore = Math.min(confidenceScore, 0.35); // Restrict influence
      notes.push("WARNING: Image lacks clear aerial or roof features. Trust score reduced.");
    } else if (isAerial) {
      confidenceScore = Math.min(confidenceScore + 0.1, 0.95); // Boost confidence safely
      notes.push("Detected clear aerial/view geometry. High trust assigned.");
    }

    // Adjust metrics based on recognized visual features
    if (isRoof) {
      usableRoofArea = 90;
      notes.push("Detected clear roof or building structure, indicating high usable area.");
    } else {
      usableRoofArea = 60;
      notes.push("Primary building structure not strongly featured; usable area estimate reduced.");
    }

    if (tags.includes('tree') || tags.includes('shadow') || tags.includes('plant') || tags.includes('foliage')) {
      shadowPercentage = 25;
      usableRoofArea -= 10;
      notes.push("Detected nearby foliage or shadows, which increases shadow percentage.");
    } else {
      shadowPercentage = 5;
      notes.push("Minimal environmental obstructions detected, lowering potential shading.");
    }

    if (data.captionResult && data.captionResult.text) {
      notes.unshift(`Azure's caption: "${data.captionResult.text}".`);
    }

    analysisNotes = notes.join(" ");
  } else if (data.captionResult && data.captionResult.text) {
    confidenceScore = data.captionResult.confidence || 0.85;
    analysisNotes = `Image caption: "${data.captionResult.text}". No specific tags identified to adjust area metrics, using baseline.`;
  } else {
    analysisNotes = "Azure Vision API returned success but without tags or captions. Proceeding with baseline visual estimates.";
  }

  return {
    usableRoofArea,
    shadowPercentage,
    confidenceScore,
    analysisNotes
  };
}

export const analyzeRoofImage = action({
  args: {
    rooftopImage: v.string(), // Base64 encoded image string from the frontend payload
  },
  handler: async (ctx, args) => {
    try {
      console.log("Initiating Azure Vision roof analysis...");
      
      if (!args.rooftopImage) {
        throw new Error("No image payload provided for analysis.");
      }

      // Pass the image to the Azure Helper Service
      const analysisResult = await callAzureVisionAPI(args.rooftopImage);
      
      console.log("Azure Vision analysis completed successfully:", analysisResult);

      return {
        success: true,
        data: analysisResult
      };

    } catch (error: any) {
      console.error("Failed to analyze roof image with Azure Vision:", error);
      return {
        success: false,
        error: error.message || "Failed to complete image analysis"
      };
    }
  }
});
