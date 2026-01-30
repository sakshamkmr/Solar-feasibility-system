import { action } from "./_generated/server";
import { v } from "convex/values";

const NASA_API_BASE = "https://power.larc.nasa.gov/api";

// ✅ PINCODE COORD MAPPING (Real India locations)
const PINCODE_COORDS = {
  "632014": { lat: 12.92, lon: 79.13 },  // Vellore/Katpadi
  "600001": { lat: 13.08, lon: 80.27 },  // Chennai
  "641001": { lat: 10.99, lon: 78.15 },  // Trichy
  "560001": { lat: 12.97, lon: 77.59 },  // Bangalore
  "110001": { lat: 28.61, lon: 77.21 },  // Delhi
  "734001": { lat: 27.02, lon: 88.26 }   // Siliguri
};

const PINCODE_APIS = [
  "https://api.postalpincode.in/pincode",
  "https://pincode.net.in/json/pincode", 
  "https://pincodes.info/api/pincode"
];

export const calculateSolar = action({
  args: {
    pincode: v.string(),
    roofArea: v.union(v.number(), v.null()),
    dailyUsage: v.union(v.number(), v.null()),
    buildingType: v.optional(v.string()),
    discom: v.optional(v.string()),
    roofOrientation: v.optional(v.string()),
    roofTilt: v.union(v.number(), v.null()),
    shadows: v.object({
      trees: v.boolean(),
      buildings: v.boolean(),
      chimneys: v.boolean()
    })
  },
  handler: async (ctx, args) => {
    let lat = 13.05, lon = 80.27; // Chennai default

    // ✅ 1. PINCODE MAPPING (Reliable fallback)
    if (PINCODE_COORDS[args.pincode]) {
      lat = PINCODE_COORDS[args.pincode].lat;
      lon = PINCODE_COORDS[args.pincode].lon;
      console.log(`✅ PINCODE MAPPED: ${args.pincode} → ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    } 
    // ✅ 2. TRY PINCODE APIs (Enhanced parsing)
    else {
      try {
        for (const api of PINCODE_APIS) {
          try {
            console.log(`🔍 Pincode lookup: ${api}/${args.pincode}`);
            const response = await fetch(`${api}/${args.pincode}`);
            
            if (!response.ok) continue;
            
            const data = await response.json();
            
            // postalpincode.in format - TRY ALL lat/lon field names
            if (data[0]?.PostOffice?.[0]) {
              const postOffice = data[0].PostOffice[0];
              lat = parseFloat(postOffice.Latitude || postOffice.latitude || postOffice.Lat || postOffice.lat) || lat;
              lon = parseFloat(postOffice.Longitude || postOffice.longitude || postOffice.Lon || postOffice.lon) || lon;
              if (lat !== 13.05 || lon !== 80.27) {
                console.log(`✅ PINCODE HIT: ${args.pincode} → ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                break;
              }
            }
            // pincodes.info format
            else if (data.latitude) {
              lat = parseFloat(data.latitude);
              lon = parseFloat(data.longitude);
              console.log(`✅ PINCODE HIT: ${args.pincode} → ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
              break;
            }
          } catch (e) {
            console.log(`❌ ${api} failed:`, e.message);
          }
        }
      } catch (error) {
        console.log("🚨 All pincode APIs failed, using mapped coords");
      }
    }

    console.log(`📍 FINAL: ${args.pincode} → ${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);

    // ✅ 3. NASA POWER API
    const nasaUrl = `${NASA_API_BASE}/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&latitude=${lat}&longitude=${lon}&start=20250101&end=20250131&format=JSON`;
    
    const nasaResponse = await fetch(nasaUrl);
    const nasaData = await nasaResponse.json();
    
    const irradiance = parseFloat(nasaData.properties?.parameter?.ALLSKY_SFC_SW_DWN?.[0] || "5.2");

    // ✅ 4. CALCULATIONS
    const roofArea = args.roofArea || 100;
    const dailyUsage = args.dailyUsage || 15;
    
    const tiltFactor = args.roofTilt ? Math.min(args.roofTilt / 20, 1.2) : 1.0;
    const orientationFactor = args.roofOrientation === "south" ? 1.0 : 
                             args.roofOrientation === "east-west" ? 0.90 : 0.75;
    
    const shadowCount = [args.shadows.trees, args.shadows.buildings, args.shadows.chimneys].filter(Boolean).length;
    const shadowFactor = shadowCount === 0 ? 1.0 : shadowCount === 1 ? 0.92 : shadowCount === 2 ? 0.85 : 0.75;
    
    const buildingDerate = args.buildingType === "industrial" ? 0.85 : 
                          args.buildingType === "commercial" ? 0.90 : 0.95;

    const systemSize = Math.min(roofArea * 0.15, dailyUsage * 1.25);
    const performanceRatio = 0.80;
    const annualYield = systemSize * irradiance * 365 * performanceRatio * 
                       tiltFactor * orientationFactor * shadowFactor * buildingDerate;
    
    const tariffRate = args.discom === "TANGEDCO" ? 7.5 : 6.5;
    const annualSavings = annualYield * tariffRate;
    const capex = systemSize * 48000;
    
    // ✅ 5. DYNAMIC MNRE SUBSIDY 2026 (₹78k max cap)
    const subsidy = Math.min(
      systemSize * 30000,      // ₹30k/kW
      78000                    // Max ₹78k cap (PM Surya Ghar)
    );
    
    const netCapex = capex - subsidy;
    const payback = netCapex / annualSavings || 5.0;

    console.log(`✅ ${args.pincode}: ${irradiance.toFixed(2)} kWh/m² → ₹${Math.round(annualSavings)}/yr`);

    return {
      location: {
        pincode: args.pincode,
        lat: lat.toFixed(4),
        lon: lon.toFixed(4),
        irradianceSource: "NASA POWER"
      },
      irradiance: parseFloat(irradiance.toFixed(2)),
      systemSize: parseFloat(systemSize.toFixed(1)),
      annualYield: Math.round(annualYield),
      annualSavings: Math.round(annualSavings),
      payback: parseFloat(payback.toFixed(1)),
      capex: Math.round(capex),
      netCapex: Math.round(netCapex),
      subsidy: Math.round(subsidy),
      tariffRate,
      performanceRatio,
      tiltFactor: parseFloat(tiltFactor.toFixed(3)),
      orientationFactor: parseFloat(orientationFactor.toFixed(3)),
      shadowFactor: parseFloat(shadowFactor.toFixed(3)),
      buildingDerate: parseFloat(buildingDerate.toFixed(3))
    };
  }
});
