"use client"; // 👈 ADD THIS FIRST LINE

import Link from 'next/link';
import { useUser, useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sun, Zap, Award } from "lucide-react";

const features = [
  { icon: Sun, title: "NASA Data", desc: "Real solar irradiance by exact location" },
  { icon: Zap, title: "India Tariffs", desc: "50+ DISCOMs with accurate rates" },
  { icon: Award, title: "GBI Ready", desc: "Commercial subsidies calculated" },
];

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  // Show loading while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50">
        <div className="text-lg text-gray-600">Loading SolarSurya...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              SolarSurya
            </h1>
          </Link>

          {/* Nav + Auth Buttons */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/solar" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors group">
                Solar Calculator <span className="block h-0.5 w-0 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors group">
                About <span className="block h-0.5 w-0 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>

            {/* Conditional Auth Buttons */}
            <div className="flex items-center gap-3">
              {isSignedIn ? (
                <>
                  {/* LOGGED IN: Go to Solar */}
                  <Link href="/solar">
                    <button className="
                      hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold 
                      bg-white/80 hover:bg-white border border-gray-200/50 hover:border-orange-200
                      rounded-xl shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300
                      hover:-translate-y-0.5 hover:scale-[1.02]">
                      <Zap className="w-4 h-4" />
                      Assessment
                    </button>
                  </Link>

                  <Link href="/solar">
                    <button className="
                      group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold 
                      bg-gradient-to-r from-orange-500 to-yellow-500 text-white 
                      hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl
                      rounded-xl border border-transparent hover:border-orange-300/50
                      transition-all duration-300 transform hover:-translate-y-0.5
                      backdrop-blur-sm bg-opacity-95">
                      <Sun className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Go to Calculator</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <UserButton 
                    afterSignOutUrl="/" 
                    className="
                      rounded-full p-1.5 border border-white/30 
                      hover:border-orange-200/50 bg-white/20 backdrop-blur-sm
                      shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-300
                      hover:scale-105"
                    showName={true}
                  />
                </>
              ) : (
                <>
                  {/* NOT LOGGED IN: Sign In */}
                  <SignInButton mode="modal">
                    <button className="
                      hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold 
                      bg-white/80 hover:bg-white border border-gray-200/50 hover:border-orange-200
                      rounded-xl shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300
                      hover:-translate-y-0.5 hover:scale-[1.02]">
                      <Zap className="w-4 h-4" />
                      Demo
                    </button>
                  </SignInButton>

                  <SignInButton mode="modal">
                    <button className="
                      group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold 
                      bg-gradient-to-r from-orange-500 to-yellow-500 text-white 
                      hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl
                      rounded-xl border border-transparent hover:border-orange-300/50
                      transition-all duration-300 transform hover:-translate-y-0.5
                      backdrop-blur-sm bg-opacity-95">
                      <Sun className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Start Free</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </SignInButton>
                </>
              )}

              {/* Mobile Menu */}
              <button className="md:hidden p-2 rounded-xl hover:bg-orange-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 inline-flex items-center gap-1">
            <Award className="w-4 h-4" />
            SDG 7 - Affordable Clean Energy
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-yellow-500 bg-clip-text text-transparent mb-6 leading-tight">
            Unlock Your <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Rooftop Solar
            </span> Potential
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get accurate solar estimates for your home or factory in 2 minutes. 
            Powered by NASA data + 50+ Indian DISCOM tariffs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            {isSignedIn ? (
              <Link href="/solar">
                <Button size="lg" className="text-lg px-10 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-xl">
                  <Sun className="w-5 h-5 mr-2" />
                  Go to Calculator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-10 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-xl">
                  <Sun className="w-5 h-5 mr-2" />
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </SignInButton>
            )}
            <Button variant="outline" size="lg" className="text-lg px-10 border-gray-200">
              Watch Demo (2min)
            </Button>
          </div>

          {/* Features */}
          <div id="features" className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-24">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-orange-500" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                <p className="text-xs text-gray-500 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-24 p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500">10kW</div>
              <div className="text-sm text-gray-600">Avg Home System</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500">₹3.2L</div>
              <div className="text-sm text-gray-600">Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500">3.5 Yrs</div>
              <div className="text-sm text-gray-600">Payback Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500">14k kWh</div>
              <div className="text-sm text-gray-600">Yearly Generation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-500">12T CO₂</div>
              <div className="text-sm text-gray-600">Saved Yearly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-500">TRL 8</div>
              <div className="text-sm text-gray-600">Production Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Sun className="w-6 h-6 text-orange-500" />
              <span className="font-semibold text-lg">SolarSurya</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
              <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
            </div>
            <div className="text-xs text-gray-400">
              © 2026 SolarSurya. Made for India's 500GW Solar Mission.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
