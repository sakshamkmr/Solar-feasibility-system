"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { SolarForm } from "@/components/solar/Form";
import { ResultsPreview } from "@/components/solar/ResultsPreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sun, Zap, Shield, Award, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAction, useMutation } from "convex/react";  // ✅ FIXED: Added useMutation

export default function SolarPage() {
  const [formData, setFormData] = useState({
    address: "",
    pincode: "",
    roofArea: "",
    dailyUsage: "",
    buildingType: "",
    discom: "",
    roofOrientation: "",
    roofTilt: "",
    shadows: { trees: false, buildings: false, chimneys: false },
    notes: "",
    monthlyBill: ""
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED: Both hooks
  const calculateSolarAction = useAction(api.calculate.calculateSolar);
  const saveAssessmentMutation = useMutation(api.assessments.saveAssessment);  // ✅ ADDED

  const handleCalculate = async () => {
    setLoading(true);
    
    try {
      const backendPayload = {
        pincode: formData.pincode,
        roofArea: parseFloat(formData.roofArea) || 100,
        dailyUsage: parseFloat(formData.dailyUsage) || 15,
        buildingType: formData.buildingType || "residential",
        discom: formData.discom || "TANGEDCO",
        roofOrientation: formData.roofOrientation || "south",
        roofTilt: parseFloat(formData.roofTilt) || 15,
        shadows: formData.shadows
      };
      
      console.log("🚀 Calculate:", backendPayload);
      
      // ✅ STEP 1: NASA Calculation
      const response = await calculateSolarAction(backendPayload);
      console.log("✅ NASA result:", response);
      
      // ✅ STEP 2: SAVE TO DASHBOARD (THIS WAS MISSING!)
      await saveAssessmentMutation({
        assessment: {
          pincode: response.location.pincode,
          roofArea: backendPayload.roofArea,
          dailyUsage: backendPayload.dailyUsage,
          systemSize: response.systemSize,
          annualYield: response.annualYield,
          annualSavings: response.annualSavings,
          payback: response.payback,
          capex: response.capex,
          netCapex: response.netCapex,
          irradiance: response.irradiance,
          inputs: backendPayload
        }
      });
      console.log("✅ SAVED to dashboard!");

      // Transform for ResultsPreview
      const transformedResults = {
        irradiance: response.irradiance,
        systemSize: response.systemSize,
        annualYield: response.annualYield,
        savings: response.annualSavings,
        subsidy: response.subsidy || 78000,
        payback: response.payback,
        latitude: parseFloat(response.location.lat),
        longitude: parseFloat(response.location.lon),
        tariffRate: response.tariffRate,
        netCapex: response.netCapex,
        roi10yr: response.roi10yr
      };

      setResults(transformedResults);
      localStorage.setItem('solar-results', JSON.stringify(transformedResults));
      localStorage.setItem('solar-form-data', JSON.stringify(formData));
      
      toast.success(`✅ Saved! ${response.irradiance.toFixed(1)} kWh/m² @ ${response.location.pincode}`);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Using fallback");
      
      // Simple fallback
      setResults({
        irradiance: 5.2,
        systemSize: 3.2,
        annualYield: 4850,
        savings: 31525,
        subsidy: 78000,
        payback: 4.2,
        latitude: 13.05
      });
      
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component (unchanged)
  const handleDownloadPDF = () => {
    const content = `Solar Feasibility Report
Date: ${new Date().toLocaleDateString('en-IN')}

Address: ${formData.address}, PIN ${formData.pincode}
Roof Area: ${formData.roofArea || 0} sqm
System Size: ${results?.systemSize?.toFixed(1) || 0} kW
Annual Generation: ${results?.annualYield?.toLocaleString() || 0} kWh
Annual Savings: Rs ${results?.savings?.toLocaleString() || 0}
Payback Period: ${results?.payback || 0} years
Government Subsidy: Rs ${results?.subsidy?.toLocaleString() || 0}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SolarSurya-${formData.pincode || 'IN'}-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewDetailed = () => {
    if (results) window.location.href = '/solar/results';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 lg:mb-28 max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl border hover:bg-orange-50 hover:shadow-2xl transition-all duration-300 mb-12 text-lg font-semibold text-gray-800">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-10 lg:py-12 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <Sun className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">Solar Roof Calculator</h1>
              <p className="text-xl lg:text-2xl text-white/95 font-semibold mt-4">Instant analysis powered by NASA satellite data</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center mt-12 px-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Shield className="w-6 h-6 text-emerald-500" /><span className="font-semibold text-gray-800 text-sm">MNRE Approved</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Zap className="w-6 h-6 text-blue-500" /><span className="font-semibold text-gray-800 text-sm">NASA Data</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Award className="w-6 h-6 text-amber-500" /><span className="font-semibold text-gray-800 text-sm">25Y Warranty</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <TrendingUp className="w-6 h-6 text-purple-500" /><span className="font-semibold text-gray-800 text-sm">Cloud Saved</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <SolarForm 
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            onCalculate={handleCalculate}
          />
          <div className="hidden lg:block">
            <ResultsPreview 
              results={results}
              formData={formData}
              onDownloadPDF={handleDownloadPDF}
              onViewDetailed={handleViewDetailed}
            />
          </div>
        </div>

        {results && (
          <div className="lg:hidden mt-12 max-w-2xl mx-auto">
            <ResultsPreview 
              results={results}
              formData={formData}
              onDownloadPDF={handleDownloadPDF}
              onViewDetailed={handleViewDetailed}
            />
          </div>
        )}
      </div>
    </div>
  );
}
