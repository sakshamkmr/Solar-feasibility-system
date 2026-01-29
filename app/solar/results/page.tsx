"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, TrendingUp, PieChart, Activity, Sun, Zap, Award, Leaf, FileText } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DetailedResultsPage() {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load results from localStorage/sessionStorage (passed from calculator)
  useEffect(() => {
    const savedResults = localStorage.getItem('solar-results');
    const savedFormData = localStorage.getItem('solar-form-data');
    
    if (savedResults && savedFormData) {
      setResults(JSON.parse(savedResults));
      setFormData(JSON.parse(savedFormData));
    }
    setLoading(false);
  }, []);

  const handleDownloadFullReport = () => {
    const content = `SOLAR FEASIBILITY REPORT - PROFESSIONAL ANALYSIS
Generated: ${new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    })}

📍 PROPERTY DETAILS
Address: ${formData?.address || 'N/A'}, PIN: ${formData?.pincode || 'N/A'}
Roof Area: ${formData?.roofArea || 0} sqm | Building: ${formData?.buildingType || 'N/A'}
DISCOM: ${formData?.discom || 'N/A'}

⚡ SYSTEM RECOMMENDATION
System Size: ${results?.systemSize?.toFixed(1) || 0} kW
Annual Generation: ${results?.annualYield?.toLocaleString() || 0} kWh
Peak Month (May): ${(results?.annualYield / 12 * 1.3)?.toLocaleString()} kWh

💰 FINANCIAL ANALYSIS
Annual Savings: ₹${(results?.savings || 0).toLocaleString()}
10-Year Savings: ₹${((results?.savings || 0) * 10)?.toLocaleString()}
Government Subsidy: ₹${(results?.subsidy || 0).toLocaleString()}
Payback Period: ${results?.payback?.toFixed(1) || 0} years
ROI (10 years): ${(10 / (results?.payback || 4.2)).toFixed(1)}x

☀️ TECHNICAL SPECIFICATIONS
NASA Irradiance: ${results?.irradiance?.toFixed(1) || 0} kWh/m²/day
Roof Orientation Factor: ${formData?.roofOrientation === 'south' ? '1.00 (Optimal)' : '0.85-0.90'}
Shadow Factor: ${Object.values(formData?.shadows || {}).filter(Boolean).length === 0 ? '1.00 (Clear)' : '0.85 (Reduced)'}

🌱 ENVIRONMENTAL IMPACT
CO₂ Savings (Annual): ${((results?.annualYield || 0) * 0.8)?.toLocaleString()} kg
CO₂ Savings (10 Years): ${((results?.annualYield || 0) * 0.8 * 10)?.toLocaleString()} kg

✅ NEXT STEPS
1. Site survey scheduled within 48 hours
2. Detailed engineering design
3. Installation timeline: 4-6 weeks`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SolarSurya-Detailed-Report-${formData?.pincode || 'IN'}-${Date.now()}.txt`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 rounded-2xl shadow-2xl">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
            <span className="text-2xl font-bold text-white">Loading Analysis</span>
          </div>
          <p className="text-xl text-gray-600">Preparing your detailed solar assessment...</p>
        </div>
      </div>
    );
  }

  if (!results || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <Sun className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">No Results Found</h2>
          <p className="text-xl text-gray-600">Please complete the solar calculator first.</p>
          <Link href="/solar">
            <Button size="lg" className="text-xl px-12 bg-gradient-to-r from-orange-500 to-yellow-500 shadow-2xl h-16">
              ← Back to Calculator
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/solar" className="inline-flex items-center gap-3 text-xl font-semibold text-gray-700 hover:text-orange-500 mb-12 px-4 py-2 rounded-xl transition-all hover:bg-orange-50">
            <ArrowLeft className="w-6 h-6" />
            Back to Calculator
          </Link>
          
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 px-10 py-8 rounded-3xl shadow-2xl">
            <TrendingUp className="w-14 h-14 text-white drop-shadow-lg" />
            <div>
              <h1 className="text-5xl font-black text-white leading-tight drop-shadow-2xl">
                Detailed Solar Analysis
              </h1>
              <p className="text-xl text-white/95 font-semibold mt-1">
                PIN: <span className="bg-white/20 px-4 py-1 rounded-full">{formData.pincode}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-xl group hover:shadow-3xl transition-all">
            <CardContent className="p-10 text-center group-hover:scale-[1.02] transition-transform">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-6 transition-all">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-emerald-600 mb-3">
                {results.systemSize?.toFixed(1)} kW
              </div>
              <CardDescription className="text-2xl font-semibold text-gray-800">System Capacity</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 backdrop-blur-xl group hover:shadow-3xl transition-all">
            <CardContent className="p-10 text-center group-hover:scale-[1.02] transition-transform">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-6 transition-all">
                <Sun className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-3">
                {(results.annualYield / 1000)?.toFixed(1)} MWh
              </div>
              <CardDescription className="text-2xl font-semibold text-gray-800">Annual Production</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-red-500/10 backdrop-blur-xl group hover:shadow-3xl transition-all">
            <CardContent className="p-10 text-center group-hover:scale-[1.02] transition-transform">
              <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-6 transition-all">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-orange-600 mb-3">
                {(results.savings * 10 / 100000)?.toFixed(1)}L ₹
              </div>
              <CardDescription className="text-2xl font-semibold text-gray-800">10-Year Savings</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-xl group hover:shadow-3xl transition-all">
            <CardContent className="p-10 text-center group-hover:scale-[1.02] transition-transform">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-6 transition-all">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-purple-600 mb-3">
                {((results.annualYield * 0.8 * 10) / 1000)?.toFixed(1)}T CO₂
              </div>
              <CardDescription className="text-2xl font-semibold text-gray-800">Carbon Saved (10Y)</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Cash Flow Analysis */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl h-[600px] group hover:shadow-3xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl font-black">
                <PieChart className="w-10 h-10 text-orange-500" />
                Cash Flow Analysis (10 Years)
              </CardTitle>
              <CardDescription>Investment vs Returns Timeline</CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center space-y-8">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 via-yellow-400 to-red-400 rounded-3xl flex items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 animate-pulse rounded-3xl" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="text-5xl font-black text-white drop-shadow-2xl">2.8x</div>
                  <div className="text-2xl font-bold text-white/95 drop-shadow-lg">ROI</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-gray-900">₹${((results.savings * 10) || 0)?.toLocaleString()}</div>
                <div className="text-xl text-gray-600">Total Returns (10 Years)</div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Generation */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl h-[600px] group hover:shadow-3xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl font-black">
                <Activity className="w-10 h-10 text-blue-500" />
                Monthly Generation Pattern
              </CardTitle>
              <CardDescription>Peak production in May-Jun (115% of average)</CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center space-y-8">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 via-cyan-400 to-indigo-400 rounded-3xl flex items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 animate-pulse rounded-3xl" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="text-5xl font-black text-white drop-shadow-2xl">May</div>
                  <div className="text-3xl font-bold text-white/95 drop-shadow-lg">Peak Month</div>
                  <div className="text-xl bg-white/30 px-4 py-2 rounded-full">{((results.annualYield / 12) * 1.3)?.toLocaleString()} kWh</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Summary */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-gray-50/50 backdrop-blur-xl mb-20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <FileText className="w-10 h-10 text-gray-700" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
              <div className="space-y-2 p-6 bg-white/50 rounded-2xl">
                <div className="text-2xl font-mono font-bold text-blue-600">{results.irradiance?.toFixed(1)} kWh/m²/d</div>
                <div className="text-gray-700 font-medium">NASA Irradiance</div>
              </div>
              <div className="space-y-2 p-6 bg-white/50 rounded-2xl">
                <div className="text-2xl font-mono font-bold text-emerald-600">{formData.roofArea || 0} sqm</div>
                <div className="text-gray-700 font-medium">Usable Roof Area</div>
              </div>
              <div className="space-y-2 p-6 bg-white/50 rounded-2xl">
                <div className="text-2xl font-bold text-orange-600">{formData.roofOrientation === 'south' ? 'Optimal' : 'Good'}</div>
                <div className="text-gray-700 font-medium">Orientation Rating</div>
              </div>
              <div className="space-y-2 p-6 bg-white/50 rounded-2xl">
                <div className="text-2xl font-bold text-purple-600">{results.payback?.toFixed(1)} Yrs</div>
                <div className="text-gray-700 font-medium">Financial Payback</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-8 pt-12 border-t-4 border-dashed border-emerald-200">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ready to Go Solar? ☀️
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your property is perfectly suited for solar. Get your installation scheduled within 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Button 
              onClick={handleDownloadFullReport}
              size="lg" 
              className="text-xl px-12 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl font-black border-0"
            >
              <Download className="w-7 h-7 mr-3" />
              Download Full Report
            </Button>
            <Button 
              asChild
              size="lg"
              className="text-xl px-12 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-2xl font-black"
            >
              <Link href="/contact">
                Get Installation Quote →
              </Link>
            </Button>
          </div>

          <p className="text-lg text-gray-500">
            Trusted by 5000+ Indian homes | MNRE Approved Installers | 25 Year Warranty
          </p>
        </div>
      </div>
    </div>
  );
}
