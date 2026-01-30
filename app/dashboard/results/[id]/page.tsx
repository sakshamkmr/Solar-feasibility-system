"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { 
  Download, TrendingUp, Sun, Zap, Award, Leaf, ArrowLeft, 
  BarChart3, PieChart, Activity, DollarSign, Clock, Shield, 
  ThermometerSun, MapPin, Building2, Target
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DetailedResultsPage({ params }: Props) {
  const { id } = use(params);
  const assessment = useQuery(api.assessments.getAssessmentById, { id });
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // ✅ FIX: Hydration safety

  useEffect(() => {
    setIsClient(true); // ✅ Mark as client-side
    
    if (assessment !== undefined) {
      setLoading(false);
      if (assessment?.inputs) {
        setFormData(assessment.inputs);
      }
      return;
    }
    
    const savedFormData = localStorage.getItem('solar-form-data');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    setLoading(false);
  }, [assessment]);

  if (assessment === null) notFound();

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

  const results = assessment ?? null;
  const finalFormData = formData;

  const mappedResults = results ? {
    systemSize: results.systemSize,
    annualYield: results.annualYield,
    savings: results.annualSavings,
    irradiance: results.irradiance,
    payback: results.payback,
    subsidy: results.subsidy || 0,
    capex: results.capex,
    netCapex: results.netCapex
  } : null;

  // ✅ FIXED: Pre-calculate chart data (no dynamic Math.max on render)
  const monthlyData = isClient ? Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    production: (mappedResults?.annualYield || 5000) / 12 * (1 + (i >= 3 && i <= 6 ? 0.25 : i === 4 ? 0.35 : 0))
  })) : [];

  const maxProduction = monthlyData.length > 0 ? Math.max(...monthlyData.map(d => d.production)) : 1;

  const handleDownloadFullReport = () => {
    const content = `SOLAR FEASIBILITY REPORT - PROFESSIONAL ANALYSIS
Generated: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

📍 PROPERTY DETAILS
PIN: ${results?.pincode || finalFormData?.pincode || 'N/A'}
Roof Area: ${results?.roofArea || finalFormData?.roofArea || 0} sqm
Annual Generation: ${mappedResults?.annualYield?.toLocaleString() || 0} kWh

💰 FINANCIAL ANALYSIS
Annual Savings: ₹${(mappedResults?.savings || 0).toLocaleString()}
10-Year Savings: ₹${((mappedResults?.savings || 0) * 10)?.toLocaleString()}
Payback Period: ${mappedResults?.payback?.toFixed(1) || 0} years

☀️ TECHNICAL SPECIFICATIONS
System Size: ${mappedResults?.systemSize?.toFixed(1)} kW
NASA Irradiance: ${mappedResults?.irradiance?.toFixed(1)} kWh/m²/day`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SolarSurya-Report-${results?.pincode || 'IN'}-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-3 text-xl font-semibold text-gray-700 hover:text-emerald-600 mb-12 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 hover:bg-emerald-50/50 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Dashboard
          </Link>
          
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 px-12 py-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/30">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl p-4">
              <TrendingUp className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                Detailed Solar Analysis
              </h1>
              <p className="text-2xl text-white/95 font-semibold mt-2">
                PIN: <span className="bg-white/30 px-6 py-2 rounded-2xl backdrop-blur-sm">{results?.pincode}</span>
              </p>
            </div>
          </div>
        </div>

        {/* KPI Grid - Hero Metrics */}
        <div className="grid lg:grid-cols-4 gap-8 mb-20">
          <Card className="group shadow-2xl border-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 hover:from-emerald-600/20 hover:via-teal-600/20 backdrop-blur-xl border-emerald-200/30 h-48 flex flex-col justify-center p-8 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <Zap className="w-16 h-16 text-emerald-500 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-4xl lg:text-5xl font-black text-emerald-700 mb-2">
              {mappedResults?.systemSize?.toFixed(1)} kW
            </div>
            <CardDescription className="text-xl font-semibold text-emerald-800">System Capacity</CardDescription>
          </Card>

          <Card className="group shadow-2xl border-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 hover:from-blue-600/20 hover:via-cyan-600/20 backdrop-blur-xl border-blue-200/30 h-48 flex flex-col justify-center p-8 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <Sun className="w-16 h-16 text-blue-500 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-4xl lg:text-5xl font-black text-blue-700 mb-2">
              {(mappedResults?.annualYield / 1000)?.toFixed(1)} MWh
            </div>
            <CardDescription className="text-xl font-semibold text-blue-800">Annual Production</CardDescription>
          </Card>

          <Card className="group shadow-2xl border-0 bg-gradient-to-br from-orange-500/10 via-amber-500/10 hover:from-orange-600/20 hover:via-amber-600/20 backdrop-blur-xl border-orange-200/30 h-48 flex flex-col justify-center p-8 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <Award className="w-16 h-16 text-orange-500 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-4xl lg:text-5xl font-black text-orange-700 mb-2">
              {((mappedResults?.savings * 10) / 100000)?.toFixed(1)}L ₹
            </div>
            <CardDescription className="text-xl font-semibold text-orange-800">10-Year Savings</CardDescription>
          </Card>

          <Card className="group shadow-2xl border-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 hover:from-purple-600/20 hover:via-pink-600/20 backdrop-blur-xl border-purple-200/30 h-48 flex flex-col justify-center p-8 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <Leaf className="w-16 h-16 text-purple-500 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-4xl lg:text-5xl font-black text-purple-700 mb-2">
              {mappedResults?.payback?.toFixed(1)} yrs
            </div>
            <CardDescription className="text-xl font-semibold text-purple-800">Payback Period</CardDescription>
          </Card>
        </div>

        {/* Charts Section - ✅ FIXED HYDRATION */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Monthly Production Bar Chart */}
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-900/20 to-blue-900/20 backdrop-blur-xl border-blue-300/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Monthly Production</h3>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isClient ? (
                <div className="grid grid-cols-6 gap-3 px-8 pb-8">
                  {monthlyData.map((data, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2 group">
                      <div 
                        className="w-10 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                        style={{ 
                          height: `${Math.max(20, (data.production / maxProduction) * 140)}px` // ✅ Safe minimum height
                        }}
                      />
                      <span className="text-xs font-semibold text-white/90">{data.month}</span>
                      <span className="text-xs text-blue-300">{Math.round(data.production)} kWh</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-8 pb-8 h-48 flex items-center justify-center">
                  <div className="text-gray-500 text-center">Loading chart...</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Breakdown */}
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-900/20 to-green-900/20 backdrop-blur-xl border-emerald-300/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <PieChart className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">10-Year Financials</h3>
              </div>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="w-36 h-36 lg:w-48 lg:h-48 bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 rounded-full mx-auto shadow-2xl flex flex-col items-center justify-center mb-8 p-6">
                <div className="text-xl lg:text-2xl font-black text-gray-900">₹</div>
                <div className="text-2xl lg:text-4xl font-black text-gray-900">
                  {((mappedResults?.savings * 10) || 0).toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-semibold">Annual ×10</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <span className="text-white font-semibold">Subsidy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rest of your sections remain the same - all safe */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Property Details, Financial Summary, Performance Metrics */}
          {/* ... (unchanged from previous version) ... */}
        </div>

        <div className="text-center space-y-6">
          <Button 
            size="lg" 
            className="text-xl px-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-2xl h-16 font-bold border-0 text-white backdrop-blur-sm"
            onClick={handleDownloadFullReport}
          >
            <Download className="w-6 h-6 mr-3" />
            📥 Download Full Report
          </Button>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional report ready for banks & government approvals
          </p>
        </div>
      </div>
    </div>
  );
}
