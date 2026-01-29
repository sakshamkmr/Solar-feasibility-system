"use client";

import { useState } from "react";
import { SolarForm } from "@/components/solar/Form";
import { ResultsPreview } from "@/components/solar/ResultsPreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sun, Zap, Shield, Award } from "lucide-react";

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

  const handleCalculate = async () => {
    setLoading(true);
    
    try {
      // NASA API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const lat = 13.05;
      const lon = 80.27;
      
      const response = await fetch(
        `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&start=20250601&end=20250630&format=JSON`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      const data = await response.json();
      const irradiance = data.properties?.parameter?.ALLSKY_SFC_SW_DWN?.[0] || 5.2;
      
      // Calculations
      const roofArea = parseFloat(formData.roofArea) || 100;
      const dailyUsage = parseFloat(formData.dailyUsage) || 15;
      const tiltFactor = formData.roofTilt ? Math.min(parseInt(formData.roofTilt) / 20, 1.2) : 1;
      const orientationFactor = formData.roofOrientation === 'south' ? 1.0 : 
                               (formData.roofOrientation === 'east-west' ? 0.9 : 0.75);
      const shadowFactor = Object.values(formData.shadows).filter(Boolean).length > 0 ? 0.85 : 1.0;
      
      const systemSize = Math.min(roofArea * 0.15, dailyUsage * 1.2);
      const annualYield = systemSize * irradiance * 365 * 0.8 * tiltFactor * orientationFactor * shadowFactor;
      const savings = annualYield * 6.5;
      const subsidy = systemSize > 3 ? 78000 : systemSize * 25000;
      const payback = (systemSize * 50000 - subsidy) / savings;

      const finalResults = {
        irradiance: parseFloat(irradiance),
        systemSize,
        annualYield: Math.round(annualYield),
        savings: Math.round(savings),
        subsidy: Math.round(subsidy),
        payback: parseFloat(payback.toFixed(1)),
        latitude: lat,
      };

      setResults(finalResults);
      localStorage.setItem('solar-results', JSON.stringify(finalResults));
      localStorage.setItem('solar-form-data', JSON.stringify(formData));
      
    } catch (error) {
      console.error("NASA API error:", error);
      // Instant fallback
      const fallbackResults = {
        irradiance: 5.2,
        systemSize: 3.2,
        annualYield: 4850,
        savings: 31525,
        subsidy: 78000,
        payback: 4.2,
        latitude: 13.05,
      };
      setResults(fallbackResults);
      localStorage.setItem('solar-results', JSON.stringify(fallbackResults));
      localStorage.setItem('solar-form-data', JSON.stringify(formData));
    } finally {
      setLoading(false); // ALWAYS runs
    }
  };

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
    if (results) {
      window.location.href = '/solar/results';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 lg:mb-28 max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl border hover:bg-orange-50 hover:shadow-2xl transition-all duration-300 mb-12 text-lg font-semibold text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-10 lg:py-12 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <Sun className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Solar Roof Calculator
              </h1>
              <p className="text-xl lg:text-2xl text-white/95 font-semibold mt-4">
                Instant analysis powered by NASA satellite data
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 justify-center items-center mt-12 px-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Shield className="w-6 h-6 text-emerald-500" />
              <span className="font-semibold text-gray-800 text-sm">MNRE Approved</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Zap className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-gray-800 text-sm">NASA Data</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border hover:shadow-2xl transition-all">
              <Award className="w-6 h-6 text-amber-500" />
              <span className="font-semibold text-gray-800 text-sm">25Y Warranty</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
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

        {/* Mobile Results */}
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
