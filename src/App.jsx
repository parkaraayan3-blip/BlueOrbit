import { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Smartphone, Camera, Code, CheckCircle2, Clock, Check, X } from 'lucide-react';

import { Preloader } from './components/Preloader';
import { AnimatedText } from './components/AnimatedText';
import { HoverButton } from './components/HoverButton';
import { Marquee } from './components/Marquee';
import { Cursor } from './components/Cursor';
import { ParallaxReveal } from './components/ParallaxReveal';
import { FAQItem } from './components/FAQItem';

function App() {
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] } }
  };

  return (
    <>
      <div className="absolute inset-0 noise-overlay"></div>
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-blue-orbit-warm-white transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`} ref={containerRef}>
        <Cursor />
        
        {/* Navigation */}
        <header className="border-b border-blue-orbit-border/30 luxury-glass sticky top-0 z-50 bg-blue-orbit-warm-white/80">
          <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="Blue Orbit Logo" className="h-10 object-contain" />
            </a>
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              {['Services', 'Portfolio', 'Team', 'Process', 'FAQ'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="btn-animate-chars group relative overflow-hidden">
                  <span data-button-animate-chars className="text-blue-orbit-navy uppercase tracking-widest text-xs font-bold">{item}</span>
                </a>
              ))}
            </nav>
            <HoverButton href="#contact" variant="dark" className="text-xs tracking-widest uppercase px-5 py-2.5">
              Consultation
            </HoverButton>
          </div>
        </header>

        <main>
          {/* 1. Hero Section */}
          <section className="pt-[180px] pb-[80px] px-6 bg-blue-orbit-warm-white overflow-hidden relative">
            <div className="ambient-glow-blue -top-40 -left-40 opacity-20"></div>
            <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center">
              <div className="max-w-6xl mb-12">
                {!loading && (
                  <AnimatedText 
                    text="Websites that help clinics, restaurants, startups, and local businesses earn trust and attract more customers." 
                    className="text-5xl md:text-[6.5rem] font-bold text-blue-orbit-navy leading-[1.05] tracking-tighter"
                    el="h1"
                    delay={0.1}
                  />
                )}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ delay: 1, duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="max-w-3xl mb-16"
              >
                <p className="text-xl md:text-2xl text-blue-orbit-slate/80 leading-relaxed">
                  We are a design and development team focused on helping businesses create a professional online presence through thoughtful design and modern technology.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ delay: 1.2, duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex flex-col sm:flex-row gap-6 mb-24"
              >
                <HoverButton href="#portfolio" variant="dark" className="px-10 py-5 text-sm tracking-widest uppercase luxury-lift shadow-luxury">
                  View Our Work
                </HoverButton>
                <HoverButton href="#contact" variant="outline" className="px-10 py-5 text-sm tracking-widest uppercase luxury-lift border-blue-orbit-navy text-blue-orbit-navy">
                  Schedule a Consultation
                </HoverButton>
              </motion.div>

              {/* Immediate Proof */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ delay: 1.4, duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-blue-orbit-navy/10 pt-16"
              >
                {[
                  { title: "4 Day Delivery", desc: "Available for priority projects" },
                  { title: "2 Years Free Domain", desc: "Included with every new build" },
                  { title: "1 Year Support", desc: "Included post-launch maintenance" },
                  { title: "Pro Photography", desc: "Available for clinics & offices" }
                ].map((proof, i) => (
                  <div key={i} className="text-left border-l-2 border-blue-orbit-blue pl-6">
                    <h4 className="text-xl font-bold text-blue-orbit-navy mb-2">{proof.title}</h4>
                    <p className="text-sm font-medium text-blue-orbit-slate/60 uppercase tracking-widest">{proof.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 3. The Problem We Solve */}
          <section className="py-[160px] px-6 bg-blue-orbit-warm-beige">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-24">
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Many businesses lose customers before they ever make contact." className="text-[3.5rem] md:text-[5rem] font-bold text-blue-orbit-navy mb-10 tracking-tighter leading-[1.05]" el="h2" />
                  <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-2xl text-blue-orbit-slate/80 leading-relaxed space-y-6 max-w-xl"
                  >
                    <motion.p variants={fadeUp}>Not because their service is bad.</motion.p>
                    <motion.p variants={fadeUp}>Not because their prices are too high.</motion.p>
                    <motion.p variants={fadeUp} className="font-bold text-blue-orbit-blue">But because their online presence fails to build confidence.</motion.p>
                  </motion.div>
                </div>
                <div className="w-full lg:w-1/2">
                  <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="bg-white p-16 rounded-soft shadow-luxury luxury-lift"
                  >
                    <motion.h3 variants={fadeUp} className="text-3xl font-bold mb-10 tracking-tight text-blue-orbit-navy">Common problems we solve:</motion.h3>
                    <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12 mb-12">
                      {[
                        'Outdated websites', 'Slow loading times', 'Poor mobile experience',
                        'No clear call-to-action', 'Low Google visibility', 'Generic stock imagery',
                        'Weak branding', 'No online credibility'
                      ].map((problem, i) => (
                        <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                          <X size={24} className="text-red-500 shrink-0" />
                          <span className="text-xl text-blue-orbit-slate font-medium">{problem}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.p variants={fadeUp} className="text-2xl font-bold text-blue-orbit-navy border-t border-blue-orbit-border pt-10 leading-snug">
                      Customers judge businesses within seconds. We ensure those first impressions work in your favor.
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. What We Do */}
          <section id="services" className="py-[160px] px-6 bg-blue-orbit-warm-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-24 text-center max-w-4xl mx-auto">
                <AnimatedText text="What We Do" className="text-[5rem] font-bold tracking-tighter text-blue-orbit-navy mb-8" el="h2" />
                <p className="text-2xl text-blue-orbit-slate/70">Everything you need to establish a professional digital presence.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-16">
                {[
                  {
                    title: "Website Design & Development",
                    desc: "Custom websites designed around your business goals, audience, and brand identity. Built to create trust, generate enquiries, and provide a seamless experience across all devices.",
                    icon: Code
                  },
                  {
                    title: "SEO & Search Visibility",
                    desc: "Increase organic visibility. Rank higher in Google for local searches. We build your site with an SEO-first architecture that drives free, targeted traffic to your business.",
                    icon: Search
                  },
                  {
                    title: "Professional Photography",
                    desc: "People buy from people. High-end photos of your team, office, and services. Real photos beat stock icons every time, creating immediate credibility before the first click.",
                    icon: Camera
                  },
                  {
                    title: "Branding & Identity",
                    desc: "Your brand is more than a logo. We create consistent typography, color systems, and visual guidelines that elevate your business to feel like an established, premium firm.",
                    icon: Smartphone
                  }
                ].map((service, i) => (
                  <motion.div 
                    key={i} 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="bg-white p-16 rounded-soft shadow-luxury luxury-lift border border-blue-orbit-border/50"
                  >
                    <motion.div variants={fadeUp} className="w-20 h-20 bg-blue-orbit-warm-beige text-blue-orbit-navy rounded-full flex items-center justify-center mb-10">
                      <service.icon size={36} strokeWidth={2} />
                    </motion.div>
                    <motion.h3 variants={fadeUp} className="text-4xl font-bold mb-6 tracking-tight text-blue-orbit-navy">{service.title}</motion.h3>
                    <motion.p variants={fadeUp} className="text-xl text-blue-orbit-slate/80 leading-relaxed">{service.desc}</motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Featured Projects (Massive Case Studies) */}
          <section id="portfolio" className="py-[160px] px-6 bg-blue-orbit-navy text-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-32 flex flex-col items-center text-center">
                <AnimatedText text="Featured Work" className="text-[5rem] font-bold tracking-tighter mb-8" el="h2" />
                <p className="text-2xl text-white/60 max-w-3xl">Deep dives into how we solve real business problems with thoughtful design and modern technology.</p>
              </div>

              <div className="space-y-[200px]">
                
                {/* Case Study 1: Dr Meera */}
                <div className="flex flex-col gap-16">
                  <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                      <div className="sticky top-40">
                        <span className="text-sm font-heading font-bold tracking-widest text-blue-orbit-blue uppercase mb-6 block border-b border-white/10 pb-4">Industry: Healthcare</span>
                        <h3 className="text-5xl md:text-6xl font-bold mb-12 tracking-tight">Dr. Meera Dermatology Clinic</h3>
                        
                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Challenge</h4>
                          <p className="text-xl text-white/80 leading-relaxed">Build trust online and simplify appointment enquiries for a high-end medical professional. Move away from generic clinic templates to a warm, patient-focused experience.</p>
                        </div>

                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Solution</h4>
                          <p className="text-xl text-white/80 leading-relaxed">Custom website with dedicated treatment pages, an interactive doctor timeline, streamlined appointment flow, and localized SEO.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Outcome</h4>
                          <p className="text-xl text-white/80 leading-relaxed font-bold border-l-4 border-blue-orbit-blue pl-6">Professional online presence that accurately reflects the clinic's exceptional quality of care, resulting in higher qualified patient leads.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">Technologies Used</h4>
                          <div className="flex flex-wrap gap-3">
                            {['React', 'Framer Motion', 'Tailwind CSS', 'Vite'].map(tech => (
                              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">{tech}</span>
                            ))}
                          </div>
                        </div>

                        <a href="#" className="inline-flex items-center gap-4 text-white border-b border-white/30 pb-2 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors group">
                          Visit Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <ParallaxReveal className="w-full aspect-[4/3] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury mb-8">
                        <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center p-12 text-center">
                          <Camera size={48} className="text-white/20 mb-6" />
                          <span className="text-white/40 font-heading font-bold text-2xl tracking-widest uppercase">Hero Section Screenshot</span>
                        </div>
                      </ParallaxReveal>
                      <div className="grid grid-cols-2 gap-8">
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Treatment Pages</span>
                          </div>
                        </ParallaxReveal>
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Mobile Layout</span>
                          </div>
                        </ParallaxReveal>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Study 2: RTR3 */}
                <div className="flex flex-col gap-16 border-t border-white/10 pt-[200px]">
                  <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 lg:order-2">
                      <div className="sticky top-40">
                        <span className="text-sm font-heading font-bold tracking-widest text-blue-orbit-blue uppercase mb-6 block border-b border-white/10 pb-4">Industry: Education / Non-Profit</span>
                        <h3 className="text-5xl md:text-6xl font-bold mb-12 tracking-tight">RTR3 — Community Platform</h3>
                        
                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Challenge</h4>
                          <p className="text-xl text-white/80 leading-relaxed">The Rotaract Club needed to move past a basic student club page. They needed a serious digital presence for student organizations to serve as a community platform, event showcase, and leadership portal.</p>
                        </div>

                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Solution</h4>
                          <p className="text-xl text-white/80 leading-relaxed">A modern organization website highlighting the club's mission, projects, and achievements in an engaging, easy-to-navigate format.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Outcome</h4>
                          <p className="text-xl text-white/80 leading-relaxed font-bold border-l-4 border-blue-orbit-blue pl-6">A highly legitimate community platform that drives student engagement and clearly communicates organizational impact.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">Technologies Used</h4>
                          <div className="flex flex-wrap gap-3">
                            {['React', 'Tailwind CSS', 'Vite'].map(tech => (
                              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">{tech}</span>
                            ))}
                          </div>
                        </div>

                        <a href="https://rtr3-1-copy.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-white border-b border-white/30 pb-2 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors group">
                          Visit Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-7 lg:order-1">
                      <ParallaxReveal className="w-full aspect-[4/3] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury mb-8">
                        <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center p-12 text-center">
                          <Camera size={48} className="text-white/20 mb-6" />
                          <span className="text-white/40 font-heading font-bold text-2xl tracking-widest uppercase">Community Portal Screenshot</span>
                        </div>
                      </ParallaxReveal>
                      <div className="grid grid-cols-2 gap-8">
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Event Showcase</span>
                          </div>
                        </ParallaxReveal>
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Leadership Profiles</span>
                          </div>
                        </ParallaxReveal>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Study 3: Mirai Forms */}
                <div className="flex flex-col gap-16 border-t border-white/10 pt-[200px]">
                  <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                      <div className="sticky top-40">
                        <span className="text-sm font-heading font-bold tracking-widest text-blue-orbit-blue uppercase mb-6 block border-b border-white/10 pb-4">Industry: Software / SaaS</span>
                        <h3 className="text-5xl md:text-6xl font-bold mb-12 tracking-tight">Mirai Forms</h3>
                        
                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Problem</h4>
                          <p className="text-xl text-white/80 leading-relaxed">Most form builders are either too complex for regular users or too simplistic for professional teams. The market needed a modern platform that balances power with a clean user experience.</p>
                        </div>

                        <div className="mb-10">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Solution & Features</h4>
                          <p className="text-xl text-white/80 leading-relaxed">We architected a custom design system and built a highly responsive dashboard with intuitive drag-and-drop workflows and real-time performance optimization.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">The Outcome</h4>
                          <p className="text-xl text-white/80 leading-relaxed font-bold border-l-4 border-blue-orbit-blue pl-6">A frictionless, enterprise-grade software application that users actually enjoy interacting with.</p>
                        </div>

                        <div className="mb-12">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-4 text-white/40">Technologies Used</h4>
                          <div className="flex flex-wrap gap-3">
                            {['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map(tech => (
                              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">{tech}</span>
                            ))}
                          </div>
                        </div>

                        <a href="#" className="inline-flex items-center gap-4 text-white border-b border-white/30 pb-2 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors group">
                          Visit Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <ParallaxReveal className="w-full aspect-[4/3] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury mb-8">
                        <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center p-12 text-center">
                          <Camera size={48} className="text-white/20 mb-6" />
                          <span className="text-white/40 font-heading font-bold text-2xl tracking-widest uppercase">Dashboard Application Screenshot</span>
                        </div>
                      </ParallaxReveal>
                      <div className="grid grid-cols-2 gap-8">
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Form Builder</span>
                          </div>
                        </ParallaxReveal>
                        <ParallaxReveal className="w-full aspect-square rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 font-heading font-bold text-sm tracking-widest uppercase text-center px-4">Analytics View</span>
                          </div>
                        </ParallaxReveal>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 6. Meet Blue Orbit (Team Presence) */}
          <section id="team" className="py-[160px] px-6 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-24 items-center">
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Meet Blue Orbit" className="text-[4rem] md:text-[5rem] font-bold tracking-tighter text-blue-orbit-navy mb-10" el="h2" />
                  <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-2xl text-blue-orbit-slate/80 leading-relaxed space-y-8"
                  >
                    <motion.p variants={fadeUp}>Blue Orbit is a design and development team focused on helping businesses create a professional online presence through thoughtful design and modern technology.</motion.p>
                    <motion.p variants={fadeUp} className="font-bold text-blue-orbit-blue">People buy from people.</motion.p>
                    <motion.p variants={fadeUp}>That's why we focus on bringing humanity back to digital design, ensuring your business feels approachable, legitimate, and deeply professional.</motion.p>
                  </motion.div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 aspect-video bg-blue-orbit-warm-beige rounded-soft overflow-hidden shadow-luxury flex items-center justify-center border border-blue-orbit-border/50">
                      <div className="text-center">
                        <Camera size={32} className="text-blue-orbit-navy/40 mx-auto mb-4" />
                        <span className="text-blue-orbit-navy/60 font-bold tracking-widest uppercase text-sm">Professional Team Photo</span>
                      </div>
                    </div>
                    <div className="aspect-square bg-blue-orbit-warm-beige rounded-soft overflow-hidden shadow-luxury flex items-center justify-center border border-blue-orbit-border/50">
                      <div className="text-center">
                        <Camera size={24} className="text-blue-orbit-navy/40 mx-auto mb-3" />
                        <span className="text-blue-orbit-navy/60 font-bold tracking-widest uppercase text-xs">Client Shoot</span>
                      </div>
                    </div>
                    <div className="aspect-square bg-blue-orbit-warm-beige rounded-soft overflow-hidden shadow-luxury flex items-center justify-center border border-blue-orbit-border/50">
                      <div className="text-center">
                        <Camera size={24} className="text-blue-orbit-navy/40 mx-auto mb-3" />
                        <span className="text-blue-orbit-navy/60 font-bold tracking-widest uppercase text-xs">Behind The Scenes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Why Choose Us (Comparison) */}
          <section className="py-[160px] px-6 bg-blue-orbit-warm-beige">
            <div className="max-w-[1000px] mx-auto">
              <div className="mb-20 text-center">
                <AnimatedText text="Why Choose Us" className="text-[4rem] md:text-[5rem] font-bold tracking-tighter text-blue-orbit-navy mb-8" el="h2" />
                <p className="text-2xl text-blue-orbit-slate/70">The difference between a generic website and a Blue Orbit build.</p>
              </div>

              <div className="bg-white rounded-soft shadow-luxury overflow-hidden luxury-lift">
                <div className="grid grid-cols-2 text-center border-b-2 border-blue-orbit-navy bg-blue-orbit-navy text-white">
                  <div className="p-8 text-xl font-bold uppercase tracking-widest text-white/50">Others</div>
                  <div className="p-8 text-2xl font-bold uppercase tracking-widest text-white">Blue Orbit</div>
                </div>
                {[
                  { other: "Templates", us: "Custom Design" },
                  { other: "Slow Delivery", us: "4 Day Delivery" },
                  { other: "Limited Support", us: "1 Year Support" },
                  { other: "Stock Photos", us: "Professional Photography" },
                  { other: "Generic SEO", us: "Optimized From Day One" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-2 text-center border-b border-blue-orbit-border/50 last:border-0 hover:bg-blue-orbit-surface transition-colors">
                    <div className="p-8 text-xl font-medium text-blue-orbit-slate/50 flex items-center justify-center gap-3">
                      <X size={20} className="text-red-400" /> {row.other}
                    </div>
                    <div className="p-8 text-2xl font-bold text-blue-orbit-navy flex items-center justify-center gap-4 bg-blue-orbit-navy/5">
                      <CheckCircle2 size={24} className="text-blue-orbit-blue" /> {row.us}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Our Process & Deliverables */}
          <section id="process" className="py-[160px] px-6 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-24">
                
                {/* Visual Timeline */}
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Our Process" className="text-[4rem] font-bold tracking-tighter text-blue-orbit-navy mb-16" el="h2" />
                  <div className="relative border-l-2 border-blue-orbit-border ml-8 space-y-16 py-8">
                    {[
                      { step: "01", title: "Discovery", desc: "We learn about your business, competitors, and audience." },
                      { step: "02", title: "Strategy", desc: "We define structure, content, and the user journey." },
                      { step: "03", title: "Design", desc: "We create a visual experience that builds immediate trust." },
                      { step: "04", title: "Development", desc: "Fast, responsive code built using modern tech stacks." },
                      { step: "05", title: "Launch", desc: "We handle deployment, testing, and final live setup." },
                      { step: "06", title: "Support", desc: "We remain available long after launch." }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative pl-12"
                      >
                        <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white border-4 border-blue-orbit-navy rounded-full flex items-center justify-center shadow-md"></div>
                        <span className="text-sm font-bold text-blue-orbit-blue tracking-widest uppercase block mb-2">{item.step}</span>
                        <h3 className="text-3xl font-bold text-blue-orbit-navy mb-3">{item.title}</h3>
                        <p className="text-xl text-blue-orbit-slate/70">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-blue-orbit-navy text-white p-16 rounded-soft shadow-luxury sticky top-32">
                    <h3 className="text-4xl font-bold mb-4 tracking-tight">Every Project Includes</h3>
                    <p className="text-xl text-white/60 mb-12">We don't nickel-and-dime for standard features. Everything below is built into our core offering.</p>
                    
                    <div className="space-y-6">
                      {[
                        'Custom Design', 'Mobile Optimization', 'SEO Setup', 
                        'Domain Setup', 'Hosting Setup', 'WhatsApp Integration', 
                        'Analytics', '1 Year Support'
                      ].map((promise, i) => (
                        <div key={i} className="flex items-center gap-5 text-xl font-medium">
                          <div className="w-8 h-8 rounded-full bg-blue-orbit-blue/20 flex items-center justify-center shrink-0">
                            <Check size={18} className="text-blue-orbit-blue" />
                          </div>
                          <span>{promise}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-5 text-xl font-medium pt-6 border-t border-white/10 mt-6">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Camera size={16} className="text-white/60" />
                        </div>
                        <span className="text-white/80">Professional Photography Available</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 9. Why We Started Blue Orbit */}
          <section className="py-[160px] px-6 bg-blue-orbit-warm-beige">
            <div className="max-w-[900px] mx-auto text-center">
              <AnimatedText text="Why We Started Blue Orbit" className="text-[4rem] font-bold text-blue-orbit-navy mb-16 tracking-tighter leading-none" el="h2" />
              
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-2xl md:text-3xl text-blue-orbit-slate/80 leading-relaxed space-y-10 text-left font-serif"
              >
                <motion.p variants={fadeUp}>
                  "We started Blue Orbit because we saw many great businesses struggling with outdated websites and weak online presence."
                </motion.p>
                <motion.p variants={fadeUp} className="font-bold text-blue-orbit-navy border-l-4 border-blue-orbit-blue pl-8 italic">
                  "Our goal is to help businesses present themselves online with the same quality and professionalism they bring to their customers every day."
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* 10. FAQ */}
          <section id="faq" className="py-[160px] px-6 bg-white">
            <div className="max-w-[1000px] mx-auto">
              <div className="mb-24 text-center">
                <AnimatedText text="Frequently Asked Questions" className="text-[5rem] font-bold tracking-tighter text-blue-orbit-navy" el="h2" />
              </div>

              <div className="flex flex-col">
                {[
                  { q: "How long does it take?", a: "Most projects are completed within 4–10 days depending on scope." },
                  { q: "How much does it cost?", a: "Pricing varies based on requirements. Contact us for a free quote." },
                  { q: "Do you provide hosting?", a: "Yes. We handle deployment, security, and setup." },
                  { q: "Do you provide photography?", a: "Yes. Professional photography is available for clinics, restaurants, offices, and local businesses." },
                  { q: "Do you redesign existing websites?", a: "Absolutely. We can redesign, optimize, and modernize existing websites." },
                  { q: "Do you offer support?", a: "Every project includes 1 year of support and updates." }
                ].map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </section>

          {/* 11. Contact / Final CTA */}
          <section id="contact" className="py-[160px] px-6 bg-blue-orbit-navy text-white relative overflow-hidden">
            <div className="ambient-glow-blue bottom-0 right-0 opacity-50"></div>
            <div className="max-w-[1440px] mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row gap-24">
                
                {/* Consultation Details */}
                <div className="w-full lg:w-1/2">
                  <span className="text-sm font-heading font-bold tracking-widest text-blue-orbit-blue uppercase mb-6 block">Free Consultation</span>
                  <AnimatedText text="Let's Build Something Your Customers Will Remember." className="text-[4rem] md:text-[5rem] font-bold mb-12 tracking-tighter leading-none" el="h2" />
                  
                  <div className="bg-white/5 border border-white/10 p-10 rounded-soft mb-16">
                    <h3 className="text-2xl font-bold mb-6">What happens during a consultation?</h3>
                    <ul className="space-y-4 text-lg text-white/80">
                      <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Business discussion</li>
                      <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Technical requirements</li>
                      <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Website plan & strategy</li>
                      <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Timeline estimation</li>
                      <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Transparent pricing</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-6 text-2xl font-bold tracking-tight">
                    <a href="mailto:hello@blueorbit.agency" className="btn-animate-chars block">
                      <span data-button-animate-chars>hello@blueorbit.agency</span>
                    </a>
                    <a href="tel:5550000000" className="btn-animate-chars block">
                      <span data-button-animate-chars>+1 (555) 000-0000</span>
                    </a>
                  </div>
                </div>

                {/* Form */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white text-blue-orbit-navy p-16 rounded-soft shadow-luxury luxury-lift h-full flex flex-col justify-center">
                    <h3 className="text-4xl font-bold mb-4 tracking-tight">Ready To Improve Your Online Presence?</h3>
                    <p className="text-xl text-blue-orbit-slate/60 mb-12">Fill out the form below and we'll get back to you within 24 hours.</p>

                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                      <div className="relative border-b-2 border-blue-orbit-border/50 pb-4 group">
                        <input type="text" className="w-full bg-transparent text-2xl focus:outline-none placeholder:text-blue-orbit-slate/30 text-blue-orbit-navy relative z-10" placeholder="What is your name?" />
                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                      </div>
                      <div className="relative border-b-2 border-blue-orbit-border/50 pb-4 group pt-4">
                        <input type="email" className="w-full bg-transparent text-2xl focus:outline-none placeholder:text-blue-orbit-slate/30 text-blue-orbit-navy relative z-10" placeholder="Your email address?" />
                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                      </div>
                      <div className="relative border-b-2 border-blue-orbit-border/50 pb-4 group pt-8">
                        <textarea className="w-full bg-transparent text-2xl focus:outline-none placeholder:text-blue-orbit-slate/30 text-blue-orbit-navy min-h-[120px] resize-none relative z-10" placeholder="Tell us about your project..."></textarea>
                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                      </div>
                      <div className="pt-8">
                        <HoverButton variant="dark" className="text-xl font-bold px-12 py-6 w-full text-center flex justify-center uppercase tracking-widest">
                          Book A Free Consultation
                        </HoverButton>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <footer className="py-16 px-6 bg-blue-orbit-navy text-white">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8 border-t border-white/10 pt-16 text-center">
            <img src="/logo.png" alt="Blue Orbit Logo" className="h-16 object-contain" />
            <span className="text-white/60 tracking-widest uppercase text-sm font-bold">Design. Development. Growth.</span>
            
            <div className="flex gap-6 mt-4">
              {['/healthcare-websites', '/restaurant-websites', '/startup-websites', '/local-business-websites'].map(link => (
                <a key={link} href={link} className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">{link.replace('/', '').replace('-websites', '')}</a>
              ))}
            </div>

            <div className="text-white/30 text-xs tracking-widest uppercase font-bold mt-8">
              <span>&copy; {new Date().getFullYear()} Blue Orbit</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
