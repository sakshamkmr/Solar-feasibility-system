"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Download, PieChart, Activity } from "lucide-react";
import Link from "next/link";

export function DetailedResults({ results, formData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/solar" className="inline-flex items-center gap-2 text-lg text-gray-600 hover:text-orange-500 mb-8">
            ← Back to Calculator
          </Link>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 rounded-3xl shadow-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
            <div>
              <h1 className="text-4xl font-black text-white">Detailed Analysis</h1>
              <p className="text-white/90 text-lg">PIN: {formData.pincode}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Cash Flow Chart */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <PieChart className="w-8 h-8 text-orange-500" />
                Cash Flow Analysis (10 Years)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <span className="text-3xl font-black text-white">ROI</span>
                </div>
                <div className="text-4xl font-black text-gray-800">2.8x</div>
                <p className="text-xl text-gray-600">Investment Return</p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Generation */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Activity className="w-8 h-8 text-blue-500" />
                Monthly Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <span className="text-3xl font-black text-white">Peak</span>
                </div>
                <div className="text-4xl font-black text-gray-800">485 kWh</div>
                <p className="text-xl text-gray-600">May Production</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-black text-emerald-600 mb-2">₹2.9L</div>
              <div className="text-lg font-semibold text-gray-800">Total Savings (10Y)</div>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-black text-orange-600 mb-2">78k T CO₂</div>
              <div className="text-lg font-semibold text-gray-800">Carbon Saved (10Y)</div>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">3.2 kW</div>
              <div className="text-lg font-semibold text-gray-800">System Capacity</div>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">4.2 Yrs</div>
              <div className="text-lg font-semibold text-gray-800">Payback Period</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button size="lg" className="text-xl px-12 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl h-16">
            <Download className="w-6 h-6 mr-3" />
            Download Full Technical Report
          </Button>
          <div className="text-lg text-gray-600">
            Ready to proceed? <Link href="/contact" className="font-semibold text-orange-500 hover:underline">Get Quote →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
