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
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solar Dashboard</h1>
          <p className="text-muted-foreground">Your solar assessment history</p>
        </div>
        <Link href="/solar" className="btn btn-primary">
          New Calculation
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            ) : (
              <Skeleton className="h-8 w-20" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-2xl font-bold">{formatCurrency(stats.totalSavings)}</div>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Payback</CardTitle>
            <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-2xl font-bold">{stats.avgPayback} years</div>
            ) : (
              <Skeleton className="h-8 w-20" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Savings</CardTitle>
            <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-2xl font-bold">{formatCurrency(stats.bestSavings)}</div>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <p className="text-sm text-muted-foreground">Your latest solar calculations</p>
        </CardHeader>
        <CardContent>
          {assessments ? (
            assessments.length > 0 ? (
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{assessment.pincode}</Badge>
                        <span className="font-semibold">{formatCurrency(assessment.annualSavings)}/yr</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {assessment.roofArea}㎡ roof • {assessment.systemSize}kW system
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(assessment.createdAt)} • {assessment.payback} yr payback
                      </p>
                    </div>
                    <Badge variant="secondary">{Math.round(assessment.irradiance)} kWh/m²</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No assessments yet. Create your first solar calculation!</p>
                <Link href="/solar" className="mt-4 inline-block btn btn-primary">
                  Start Calculating
                </Link>
              </div>
            )
          ) : (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
