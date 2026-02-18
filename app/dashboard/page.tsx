"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const stats = useQuery(api.assessments.getDashboardStats);
  const assessments = useQuery(api.assessments.getRecentAssessments, { limit: 5 });

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50/80 to-blue-50/50 backdrop-blur-sm">
    <div className="container mx-auto p-6 lg:p-8 space-y-8 relative overflow-hidden">
      
      {/* ✨ Solar Shine Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between bg-white/70 backdrop-blur-md border border-orange-100/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
            Solar Dashboard
          </h1>
          <p className="text-xl text-slate-600 mt-2 font-medium backdrop-blur-sm">Your solar assessment history & insights</p>
        </div>
        <Link 
          href="/solar" 
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white bg-gradient-to-r from-yellow-500 via-orange-500 to-blue-600 
                     bg-opacity-90 hover:bg-opacity-100 backdrop-blur-xl border-2 border-white/40 shadow-3xl hover:shadow-yellow-400/40 hover:shadow-3xl 
                     rounded-3xl hover:scale-110 hover:-translate-y-2 active:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400/60
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/30 before:to-blue-500/30 
                     before:blur-2xl before:rounded-3xl before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-700"
        >
          <span className="relative z-10 flex items-center gap-3">
            ☀️ New Calculation
          </span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Assessments", value: stats?.totalAssessments, icon: "⭐", color: "from-emerald-500 to-green-500", key: "totalAssessments" },
          { title: "Total Savings", value: formatCurrency(stats?.totalSavings), icon: "💰", color: "from-blue-500 to-indigo-500", key: "totalSavings" },
          { title: "Avg Payback", value: `${stats?.avgPayback || 0} years`, icon: "⚡", color: "from-orange-500 to-red-500", key: "avgPayback" },
          { title: "Best Savings", value: formatCurrency(stats?.bestSavings), icon: "🏆", color: "from-purple-500 to-pink-500", key: "bestSavings" }
        ].map(({ title, value, icon, color }, i) => (
          <Card key={title} className="group relative overflow-hidden bg-gradient-to-br bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl hover:shadow-[color:var(--color)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/50">
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              style={{ '--color': color } as React.CSSProperties}
            />
            <CardHeader className="relative pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-white/90 transition-colors">{title}</CardTitle>
                <div className={`text-2xl group-hover:scale-110 transition-transform ${color.replace('from-', 'text-')}`}>{icon}</div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              {stats ? (
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r bg-clip-text text-transparent from-slate-900 to-slate-700 group-hover:text-white">
                  {value}
                </div>
              ) : (
                <Skeleton className="h-12 w-32 rounded-xl bg-slate-200" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assessments */}
      <Card className="bg-white/70 backdrop-blur-2xl border border-orange-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              📊
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-800">Recent Assessments</CardTitle>
              <p className="text-lg text-slate-600 mt-1">Click to view detailed reports & charts</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {assessments ? (
            assessments.length > 0 ? (
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <Link
                    key={assessment._id}
                    href={`/dashboard/results/${assessment._id}`}
                    className="group relative block p-8 rounded-3xl bg-gradient-to-r from-orange-50/80 to-yellow-50/80 
                               backdrop-blur-xl border border-orange-200/50 hover:border-orange-300/80 
                               hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 
                               shadow-xl hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-400 
                               hover:-translate-y-2 hover:rotate-1 active:scale-98 cursor-pointer overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-transparent opacity-0 group-hover:opacity-100 
                                   -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative flex items-start justify-between">
                      <div className="flex-1 min-w-0 group-hover:translate-x-2 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4 group-hover:translate-x-1 transition-all">
                          <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold shadow-lg px-4 py-2 border-0">
                            {assessment.pincode}
                          </Badge>
                          <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
                            {formatCurrency(assessment.annualSavings)}/yr
                          </div>
                        </div>
                        <div className="space-y-1 mb-4">
                          <p className="text-lg font-semibold text-slate-800">
                            {assessment.roofArea?.toFixed(0)}㎡ roof • {assessment.systemSize?.toFixed(1)}kW
                          </p>
                          <p className="text-sm text-slate-600 font-medium">
                            {formatDate(assessment.createdAt)} • {assessment.payback?.toFixed(1)} yr payback
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-6">
                        <Badge className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-lg shadow-xl px-6 py-3 transform group-hover:scale-110 transition-all">
                          {Math.round(assessment.irradiance)} kWh/m²
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-8 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 rounded-3xl backdrop-blur-sm border-2 border-dashed border-orange-200">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  ☀️
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No assessments yet</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                  Create your first solar calculation to unlock savings insights!
                </p>
                <Link 
                  href="/solar" 
                  className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-orange-500 to-yellow-500 
                             backdrop-blur-xl shadow-2xl hover:shadow-orange-400/50 hover:scale-105 hover:-translate-y-1 
                             rounded-3xl transition-all duration-300 border border-orange-300/50"
                >
                  ✨ Start Calculating
                </Link>
              </div>
            )
          ) : (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-8 rounded-3xl bg-gradient-to-r from-slate-100/50 to-slate-50/50 backdrop-blur-xl border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-10 w-24 rounded-xl" />
                    <Skeleton className="h-10 w-28 rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-64 rounded-lg" />
                    <Skeleton className="h-5 w-48 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
);
}
