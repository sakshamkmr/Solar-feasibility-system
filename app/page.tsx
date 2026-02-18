"use client";

import Link from 'next/link';
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Zap, AreaChart, Activity, Brain, Wallet, TrendingUp, Grid } from "lucide-react";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Sun className="w-12 h-12 text-primary animate-spin-slow" />
          <div className="text-lg text-muted-foreground animate-pulse">Initializing SolarSurya...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">

      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANOdAJxygWZ-y7rvjBc9PSIVUy3Jp9fi9ujk1Uf2lPtEdgghtHBv_9y5HMsikImfHDd3XcLTRDRq1uvKS64p60fqtyz_cNtfOSWGZ8jXTSATskeBrvmBjGxZDcXbPQFae7CX8ANj1uWloeWwWgqvoFb3uL-K-XwDfverXi7oAz3ZaDOkQdsiAMG2xw7ZTF0OJla5AyGd-mMDee107v0EA_UwstQ64SjhvciFc3QbfxB84gVC0nmj4a1a6fwglb-Sz79Z9VXZ3w3Vg')" }}
        />
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />
        {/* Orange Light Leaks/Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="w-full max-w-[1400px] px-6 lg:px-10">

          {/* 📱 NAVIGATION */}
          <header className="flex items-center justify-between py-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-10 flex items-center justify-center bg-primary rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] group-hover:scale-105 transition-transform duration-300">
                <Sun className="text-white w-6 h-6 fill-white" />
              </div>
              <h2 className="text-foreground text-2xl font-black tracking-tighter uppercase">SolarSurya</h2>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {["Solutions", "Efficiency", "Monitoring", "Savings"].map((item) => (
                <Link key={item} href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider">
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <>
                  <Link href="/solar">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(236,91,19,0.3)] uppercase tracking-wide">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="hidden sm:flex text-foreground hover:text-primary font-bold">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-lg shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:brightness-110 transition-all uppercase tracking-wide">
                      Get Started
                    </Button>
                  </SignInButton>
                </>
              )}
            </div>
          </header>

          <main>
            {/* 🚀 HERO SECTION */}
            <section className="pt-20 pb-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-8 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                    <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">Next-Gen Solar SaaS</span>
                  </div>

                  <h1 className="text-foreground text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
                    Powering the <span className="text-primary">Future</span>
                  </h1>

                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                    Experience smart solar management with our premium SaaS platform. High-efficiency monitoring and sustainable energy at your fingertips.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <Link href={isSignedIn ? "/solar" : "/sign-up"}>
                      <Button className="h-14 bg-primary hover:bg-primary/90 text-white text-base font-extrabold px-10 rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:scale-105 transition-all uppercase tracking-wider">
                        Get Started
                      </Button>
                    </Link>
                    <Button variant="outline" className="h-14 bg-white/5 border-white/10 text-foreground hover:bg-white/10 hover:text-white text-base font-extrabold px-10 rounded-xl backdrop-blur-sm transition-all uppercase tracking-wider">
                      View Demo
                    </Button>
                  </div>
                </div>

                {/* Hero Feature Card (Live Grid) */}
                <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-6">
                      <AreaChart className="text-primary w-10 h-10 opacity-50" />
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="text-2xl font-bold text-foreground">Live Grid Status</h3>
                      <div className="space-y-4">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[75%] rounded-full shadow-[0_0_10px_#ec5b13]"></div>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-muted-foreground uppercase">Optimization Rate</span>
                          <span className="text-primary">94.2%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-muted-foreground text-xs uppercase font-bold mb-1">Current Yield</p>
                          <p className="text-2xl font-black text-foreground">4.8 <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-muted-foreground text-xs uppercase font-bold mb-1">Consumption</p>
                          <p className="text-2xl font-black text-primary">1.2 <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Glow behind card */}
                  <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[80px]"></div>
                </div>

              </div>
            </section>

            {/* 📊 STATS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-white/10">
              {[
                { label: "Energy Saved", value: "450", unit: "MW", sub: "+12% vs last month", icon: Zap },
                { label: "Active Installs", value: "12,400", unit: "+", sub: "+8% global footprint", icon: Grid },
                { label: "Efficiency Boost", value: "32", unit: "%", sub: "+15% AI optimization", icon: Activity },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 flex flex-col gap-3 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                    <stat.icon className="text-primary w-6 h-6" />
                  </div>
                  <p className="text-4xl font-black tracking-tight text-foreground">{stat.value}<span className="text-primary">{stat.unit}</span></p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.sub.split(' ')[0]}
                    </span>
                    <span className="text-muted-foreground text-xs font-medium italic">{stat.sub.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ✨ FEATURES SECTION */}
            <section className="py-24">
              <div className="flex flex-col gap-6 mb-16 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
                  Smart Solar <span className="text-primary">Management</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  Integrate hardware and software seamlessly with our tech-driven platform. We bridge the gap between industrial power generation and consumer-grade control.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Real-time Monitoring",
                    desc: "Track every watt generated in real-time with our advanced dashboard. Get instant alerts and performance reports.",
                    icon: Activity,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdXjL_ihfeVxJCSsKkh81brADIlSmaoW4bXIcAx3TijGiBFW-APvr5sMVVWhKBlH3eNW7Dw-UVoRrEKzApYg_xYT-5i2Gz6WcaWgqK7TLTQTetyymiY_Mw4YWOBFuaPI3EOrueYVpeeDkaZ9kGx-GKWpIVfMsLnRAhL-8SPXK44kdta09eC7hlsk_gYuZAZjxjBXi7lkrw4VAck21Vq2TfHfCTqmHWKT60_ayVidSTrOT3n-CQgX3YgvdM7FY_1Ax8rv40oBlmsM"
                  },
                  {
                    title: "Smart Efficiency",
                    desc: "Optimize your energy consumption with AI-driven insights. Automatically adjust to peak hours and weather patterns.",
                    icon: Brain,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHXhzBy1HBwPaYAHBVrAp4ORcDb9qE6llQxIUAG0toA0OnAY1RrzWnxuS3JzFkpg-_Nq_PNQOE7rDqlLPq57y7IhpojYsSSlxNYF976RlhoEblSn2wWhlP5Rb219HZFKrYCvF3-tfOO66rFO9fhteGWZcgn4DWK7nwQF9hs8luyvQE-FL_9pyCGbJh3TY826vZO5nrHkK1-YdeLiZyCJ5B6mN4efjaY0rLBu1_m5kv6zVHoX6ApHoQS3uNcUFBhqTfWto5WCqPKn8"
                  },
                  {
                    title: "Cost Savings",
                    desc: "Reduce your utility bills and maximize your ROI automatically. Our system ensures you never waste a single photon.",
                    icon: Wallet,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSTR6UdceTJRJRrdLuxJckJ_9wA0hLTakHHtt8SeO0qGPKQU224FKWQ2vgNv2o8dVDoyb6RVikJ-DQjCgEOjMVX5oBHX5867ropJ6g3GLB8inIAQTjVPsTWdocY5yZxch6IhbOoUNqprapQXmAgQ0InJ7Onpn1cC8UnBznqh5MKOTeQ0cIgUH_HFa8dd1FsukB93kHnhKDvXmJF5kOK3ibK9zESIzRRa274mV7G880Pb_EkGiZV7FCecqZudPp68aBkhs3D3mg9FI"
                  }
                ].map((feature, i) => (
                  <div key={i} className="group flex flex-col gap-6 p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 hover:bg-white/5 bg-card/10">
                    <div className="w-full aspect-video rounded-2xl overflow-hidden relative border border-white/10">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                      <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2 text-foreground">
                        <feature.icon className="text-primary w-5 h-5" />
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24">
              <div className="relative rounded-[2.5rem] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_pIm4h2-55JYMXzjcPn7KXbABeTvm8jrX3IxKUzidmBYTb_a_NCzKLnZClbzEbZSDTb-YpeLurgfUsQKGz--mCt7GF0LcyASf02SdBYDcYCUGQSMbNk5-_KwcyntcGajPJh1Tc5a24Zpgh1lqMCNlw2DzXRky7eZdS_ekQ_1aPrd5RstCR6wMlTshHdDL47W3QoWnWinwKkhBl1gIkrXZ0Y9J9A3--GXA6xSeLrBIdUStzJRYhQNssgMlInwiKQW0sTGKfM6SKbY')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

                <div className="relative z-10 px-10 md:px-20 py-24 max-w-2xl flex flex-col gap-8">
                  <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground">
                    Ready to transition to <span className="text-primary">smart energy?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg font-light leading-relaxed">
                    Join thousands of homeowners and businesses powering their future with SolarSurya. Start your transition today with a risk-free trial.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="/solar">
                      <Button className="h-14 bg-primary hover:bg-primary/90 text-white text-base font-extrabold px-8 rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:brightness-110 transition-all uppercase tracking-wider">
                        Start Free Trial
                      </Button>
                    </Link>
                    <Button variant="outline" className="h-14 bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 hover:text-white text-base font-extrabold px-8 rounded-xl transition-all uppercase tracking-wider">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>
            </section>

          </main>

          {/* 🏠 FOOTER */}
          <footer className="pt-12 pb-20 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-6 bg-primary rounded-md shadow-[0_0_10px_#ec5b13]"></div>
                <h3 className="text-lg font-black tracking-tighter uppercase text-foreground">SolarSurya</h3>
              </div>

              <p className="text-muted-foreground text-sm font-medium">© 2026 SolarSurya Platforms Inc. All rights reserved.</p>

              <div className="flex gap-8">
                {["Twitter", "LinkedIn", "Privacy"].map((link) => (
                  <Link key={link} href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
