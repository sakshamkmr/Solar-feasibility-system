"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap, TrendingUp, ArrowRight } from "lucide-react";

export function ResultsPreview({ 
  results, 
  onDownloadPDF, 
  onViewDetailed,
  formData,
  className = ""
}) {
  if (!results) {
    return (
      <Card className={`shadow-xl border-0 bg-gray-50/50 backdrop-blur-sm h-full flex flex-col justify-center items-center p-12 ${className}`}>
        <CardHeader className="text-center space-y-2">
          <Zap className="w-20 h-20 mx-auto text-gray-300" />
          <CardTitle className="text-2xl text-gray-500">Results Preview</CardTitle>
          <CardDescription>Enter details above to see your personalized results</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`shadow-2xl border-0 bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-3xl">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          Your Solar Results
        </CardTitle>
        <CardDescription className="text-xl">
          NASA satellite data for PIN {formData.pincode}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-8 p-8 bg-white/60 rounded-3xl shadow-xl">
          <div className="text-center space-y-3">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {results.systemSize?.toFixed(1)} kW
            </div>
            <div className="text-xl font-semibold text-gray-700">Recommended System</div>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {Math.round(results.annualYield)} kWh
            </div>
            <div className="text-xl font-semibold text-gray-700">Annual Generation</div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white/50 rounded-3xl shadow-xl">
          <div className="text-center space-y-2 p-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl hover:shadow-md transition-all">
            <div className="text-3xl font-black text-emerald-700">₹{Math.round(results.savings || 0).toLocaleString()}</div>
            <div className="text-lg font-semibold text-gray-700">Annual Savings</div>
          </div>
          <div className="text-center space-y-2 p-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl hover:shadow-md transition-all">
            <div className="text-3xl font-black text-orange-700">₹{Math.round(results.subsidy || 0).toLocaleString()}</div>
            <div className="text-lg font-semibold text-gray-700">Govt Subsidy</div>
          </div>
          <div className="text-center space-y-2 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl hover:shadow-md transition-all">
            <div className="text-3xl font-black text-purple-700">{results.payback?.toFixed(1)} Years</div>
            <div className="text-lg font-semibold text-gray-700">Payback Period</div>
          </div>
        </div>

        {/* Technical Data */}
        <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
          <div className="space-y-2 p-6 bg-white/60 rounded-2xl text-center hover:shadow-md transition-all">
            <div className="text-3xl font-mono font-bold text-blue-600">{results.irradiance?.toFixed(1)} kWh/m²/d</div>
            <div className="text-sm font-medium text-gray-700">NASA Solar Irradiance</div>
          </div>
          <div className="space-y-2 p-6 bg-white/60 rounded-2xl text-center hover:shadow-md transition-all">
            <div className="text-3xl font-mono font-bold text-gray-800">{formData.roofArea || 0} sqm</div>
            <div className="text-sm font-medium text-gray-700">Usable Roof Area</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button 
            onClick={onDownloadPDF}
            className="h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Report
          </Button>
          <Button 
            onClick={onViewDetailed}
            className="h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl font-semibold"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View Detailed Charts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
