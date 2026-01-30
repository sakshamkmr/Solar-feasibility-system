"use client";

import Link from 'next/link';
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sun, Zap, Award, BarChart3, Info } from "lucide-react";

const features = [
  { icon: Sun, title: "NASA Data", desc: "Real solar irradiance by exact location" },
  { icon: Zap, title: "India Tariffs", desc: "50+ DISCOMs with accurate rates" },
  { icon: Award, title: "GBI Ready", desc: "Commercial subsidies calculated" },
];

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50">
        <div className="text-lg text-gray-600 animate-pulse">Loading SolarSurya...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50">
      {/* 📱 RESPONSIVE HEADER */}
      <header className="backdrop-blur-sm bg-white/90 border-b border-white/30 sticky top-0 z-50 supports-[backdrop-filter:blur()]:bg-white/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <Sun className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <h1 className="font-black text-xl sm:text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
              SolarSurya
            </h1>
          </Link>

          {/* Nav + Auth */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Nav - ✅ ABOUT FIRST, DASHBOARD SIGNED-IN ONLY */}
            <nav className="hidden md:flex items-center gap-8">
              {/* ✅ ABOUT FIRST */}
              <Link href="/about" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-all duration-300 group relative flex items-center gap-2">
                <Info className="w-5 h-5" />
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
              
              
              
              {/* ✅ DASHBOARD - SIGNED IN ONLY */}
              {isSignedIn && (
                <Link href="/dashboard" className="text-lg font-semibold text-gray-700 hover:text-purple-500 transition-all duration-300 group relative flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isSignedIn ? (
                <>
                  <Link href="/solar" className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 hover:-translate-y-0.5">
                    <Sun className="w-4 h-4" />
                    Start Assessment
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    className="rounded-full p-1.5 border-2 border-white/50 hover:border-orange-200/70 bg-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:bg-white/40 transition-all duration-300 hover:scale-105"
                    showName={true}
                  />
                </>
              ) : (
                <SignInButton mode="modal">
                  <button className="group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm">
                    <Sun className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Start Free</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              )}
              
              {/* Mobile hamburger */}
              <button className="md:hidden p-2 rounded-xl hover:bg-orange-100/50 transition-colors backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🚀 HERO SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto">
          {/* SDG Badge */}
          <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border-emerald-200/50 mb-8 inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-sm shadow-lg">
            <Award className="w-4 h-4" />
            SDG 7 - India's 500GW Solar Mission
          </Badge>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-yellow-500 bg-clip-text text-transparent mb-8 leading-tight">
            Unlock Your <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
              Rooftop Solar
            </span><br />
            Potential
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Accurate solar estimates for homes & factories in <span className="font-black text-orange-600">2 minutes</span>. 
            NASA satellite data + 50+ Indian DISCOM tariffs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/solar">
              <Button size="lg" className="text-lg px-12 py-8 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-2xl hover:shadow-3xl font-bold rounded-2xl h-auto py-7 px-12 text-xl backdrop-blur-sm border-2 border-orange-200/50">
                <Sun className="w-6 h-6 mr-3 -ml-1" />
                Start Free Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-12 py-7 border-2 border-gray-200/70 hover:border-orange-300 shadow-xl hover:shadow-2xl rounded-2xl font-semibold h-auto">
              Watch Demo (2min)
            </Button>
          </div>

          {/* ✨ Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 hover:border-orange-100/70">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <feature.icon className="w-10 h-10 text-orange-600 drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* 📊 Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 p-8 lg:p-12 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 mb-24">
            {[
              { value: "10kW", label: "Avg Home System", color: "from-orange-500" },
              { value: "₹3.2L", label: "Annual Savings", color: "from-emerald-500" },
              { value: "3.5 Yrs", label: "Payback Time", color: "from-blue-500" },
              { value: "14k kWh", label: "Yearly Generation", color: "from-purple-500" },
              { value: "12T CO₂", label: "Saved Yearly", color: "from-green-500" },
              { value: "TRL 8", label: "Production Ready", color: "from-indigo-500" }
            ].map((stat, i) => (
              <div key={i} className="text-center group hover:scale-105 transition-all duration-300">
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} to-orange-400 bg-clip-text text-transparent mb-2 drop-shadow-lg`}>
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏠 FOOTER */}
      <footer className="border-t border-gray-200/50 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SolarSurya
              </span>
            </div>
            
            <div className="flex flex-wrap gap-6 lg:gap-8 justify-center text-sm text-gray-600 font-medium">
              <Link href="/about" className="hover:text-orange-500 transition-colors hover:underline">About</Link>
              <Link href="/privacy" className="hover:text-orange-500 transition-colors hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:text-orange-500 transition-colors hover:underline">Terms</Link>
            </div>
            
            <div className="text-xs text-gray-500 text-center lg:text-right">
              © 2026 SolarSurya. Built for India's 500GW Solar Mission. ☀️
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
