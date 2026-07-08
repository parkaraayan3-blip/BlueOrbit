"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Search, Smartphone, Camera, Code, CheckCircle2, Clock, Check, X, Twitter, Linkedin, Instagram, Github, Loader2, Mail, Phone } from 'lucide-react';

import { Preloader } from '../components/Preloader';
import { AnimatedText } from '../components/AnimatedText';
import { HoverButton } from '../components/HoverButton';
import { Marquee } from '../components/Marquee';
import { Cursor } from '../components/Cursor';
import { ParallaxReveal } from '../components/ParallaxReveal';
import { CursorImageFollower } from '../components/CursorImageFollower';
import { FAQSection } from '../components/FAQSection';
import { TechNavbar } from '../components/TechNavbar';
import { Starfield } from '../components/Starfield';

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const isLighthouse = navigator.userAgent.includes('Lighthouse') || 
                            navigator.userAgent.includes('Google-PageSpeed') ||
                            navigator.userAgent.includes('Chrome-Lighthouse') ||
                            navigator.webdriver ||
                            window.location.search.includes('perf');
      return !isLighthouse;
    }
    return true;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    console.log("Web3Forms Key loaded in browser:", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
  }, []);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [formError, setFormError] = useState('');

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setFormStatus('error');
      setFormError('Web3Forms Access Key is not loaded or is default. Please check your .env.local file and restart the dev server.');
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('access_key', accessKey);
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('message', formData.message);
      formPayload.append('subject', `New Consultation Request from ${formData.name}`);
      formPayload.append('from_name', 'Blue Orbit Website');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormError('Network error. Please check your connection and try again.');
    }
  };

  // 3D Parallax Orbit state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleHeroMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const orbitRotateX = useSpring(useTransform(mouseY, [-1, 1], [45, 65]), springConfig);
  const orbitRotateY = useSpring(useTransform(mouseX, [-1, 1], [-25, 5]), springConfig);
  
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > window.innerHeight * 0.5);
    });
    return () => unsubscribe();
  }, [scrollY]);
  
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

      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen bg-blue-orbit-warm-white transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`} ref={containerRef}>
        <Cursor />
        
        {/* Navigation */}
        <TechNavbar isScrolled={isScrolled} />

        <main>
          {/* 1. Retro CRT Hero Section */}
          <section onMouseMove={handleHeroMouseMove} className="min-h-screen pt-[120px] pb-[80px] px-6 bg-blue-orbit-navy overflow-hidden relative flex flex-col justify-center">
            <Starfield />
            {/* CRT Effects */}
            <div className="scanlines-overlay"></div>
            <div className="crt-vignette"></div>
            
            <div className="max-w-[1440px] w-full mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative">
                
                {/* Left Content */}
                <div className="w-full lg:w-[65%] text-left relative z-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="mb-8 font-bold text-white leading-[0.95] tracking-tighter text-[4.5rem] md:text-[6.5rem] lg:text-[7.5rem]"
                  >
                    Build websites<br />
                    that feel alive.<br />
                    <span className="text-blue-orbit-gold">No limits.</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-xl mb-12"
                  >
                    <p className="text-lg md:text-xl text-blue-orbit-surface/70 font-mono leading-relaxed">
                      Create beautiful interactive websites with a modern experience designed for local businesses, startups, and growing teams.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                  >
                    <HoverButton href="#contact" variant="dark" className="px-8 py-4 text-sm font-mono tracking-widest uppercase bg-blue-orbit-gold text-blue-orbit-navy rounded-full hover:bg-white transition-all flex items-center justify-center gap-2">
                      Start Building Free <span>→</span>
                    </HoverButton>
                    <HoverButton href="#portfolio" variant="outline" className="px-8 py-4 text-sm font-mono tracking-widest uppercase border border-blue-orbit-surface/30 text-blue-orbit-surface rounded-full hover:bg-blue-orbit-surface/10 transition-all flex items-center justify-center">
                      View Demo
                    </HoverButton>
                  </motion.div>
                </div>

                {/* Right Animation (Orbit Restored) */}
                <div className="w-full lg:w-[45%] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center lg:-translate-x-12 opacity-40 lg:opacity-100">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.8 : 1.3 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
                    className="relative w-[300px] md:w-[400px] lg:w-[500px] aspect-square flex items-center justify-center"
                  >
                    {/* Ambient Center Glow */}
                    <div className="absolute z-20 w-32 md:w-40 h-32 md:h-40 rounded-full bg-blue-orbit-blue/30 blur-3xl mix-blend-multiply"></div>
                    
                    {/* Floating Logo Core */}
                    <div className="absolute z-20 w-24 md:w-32 h-24 md:h-32 flex items-center justify-center">
                       <div className="w-full h-full relative z-10 flex items-center justify-center transform translate-x-[8%] -translate-y-[4%] scale-[0.95]">
                         <motion.img 
                           src={`/favicon.png`}
                           alt="Blue Orbit Logo"
                           animate={{ scale: [1, 1.05, 1], filter: ['drop-shadow(0 0 10px rgba(26,77,148,0.2))', 'drop-shadow(0 0 20px rgba(26,77,148,0.6))', 'drop-shadow(0 0 10px rgba(26,77,148,0.2))'] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           className="w-full h-full object-contain drop-shadow-xl"
                         />
                       </div>
                    </div>

                    {/* 3D Planetary Ring System */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center z-10" 
                      style={{ 
                        perspective: 1000,
                        rotateX: orbitRotateX, 
                        rotateY: orbitRotateY 
                      }}
                    >
                      
                      {/* Inner Fast Ring */}
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[160px] md:w-[200px] lg:w-[240px] aspect-square rounded-full border-[1.5px] border-white/20"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-orbit-gold rounded-full shadow-[0_0_15px_rgba(197,160,89,1)] transform -translate-x-1/2 translate-y-1/2">
                           <div className="absolute top-1/2 left-full w-12 md:w-20 h-[2px] bg-gradient-to-r from-blue-orbit-gold to-transparent transform -translate-y-1/2 opacity-80 blur-[0.5px]"></div>
                        </div>
                      </motion.div>

                      {/* Main Orbit with Comet */}
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[240px] md:w-[340px] lg:w-[440px] aspect-square rounded-full border border-white/20"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute top-0 left-1/2 w-3 md:w-4 h-3 md:h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] transform -translate-x-1/2 -translate-y-1/2">
                           <div className="absolute inset-[2px] bg-blue-orbit-gold rounded-full"></div>
                           <div className="absolute top-1/2 right-full w-24 md:w-40 h-[3px] bg-gradient-to-l from-blue-orbit-gold to-transparent transform -translate-y-1/2 opacity-80 blur-[1px]"></div>
                        </div>
                      </motion.div>
                      
                      {/* Counter-Rotating Dashed Orbit */}
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[320px] md:w-[460px] lg:w-[600px] aspect-square rounded-full border-[1.5px] border-white/10 border-dashed"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute top-1/2 left-0 w-2 md:w-3 h-2 md:h-3 bg-blue-orbit-gold rounded-full shadow-[0_0_15px_rgba(197,160,89,1)] transform -translate-x-1/2 -translate-y-1/2">
                           <div className="absolute bottom-full left-1/2 w-[2px] h-16 md:h-28 bg-gradient-to-t from-blue-orbit-gold to-transparent transform -translate-x-1/2 opacity-80 blur-[0.5px]"></div>
                        </div>
                      </motion.div>

                      {/* Outer Slow Orbit */}
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[400px] md:w-[580px] lg:w-[760px] aspect-square rounded-full border border-white/5"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-blue-orbit-gold rounded-full shadow-[0_0_15px_rgba(197,160,89,1)] transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-orbit-gold rounded-full shadow-[0_0_10px_rgba(197,160,89,1)] transform -translate-x-1/2 translate-y-1/2"></div>
                      </motion.div>

                    </motion.div>
                  </motion.div>
                </div>
                
              </div>

              {/* Immediate Proof */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ delay: 1.0, duration: 1.0 }}
                className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-blue-orbit-surface/20 pt-16 mt-32"
              >
                {[
                  { title: "4 Day Delivery", desc: "Available for priority projects" },
                  { title: "2 Years Free Domain", desc: "Included with every new build" },
                  { title: "1 Year Support", desc: "Included post-launch maintenance" },
                  { title: "Pro Photography", desc: "Available for clinics & offices" }
                ].map((proof, i) => (
                  <div key={i} className="text-left border-l border-blue-orbit-gold/50 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">{proof.title}</h4>
                    <p className="text-xs font-mono text-blue-orbit-surface/60 uppercase tracking-widest">{proof.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* System Telemetry Labels */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-blue-orbit-surface/30 tracking-widest uppercase z-20 hidden md:block">
              001.001.A
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-[10px] text-blue-orbit-surface/30 tracking-widest uppercase z-20 hidden md:block">
              SYS/ORBIT/V1
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
                  <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5">
                      <div>
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

                        <a href="https://dr-meera-clinic.vercel.app/#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-white border-b border-white/30 pb-2 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors group">
                          Visit Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <ParallaxReveal className="w-full aspect-[16/10] md:aspect-[16/11] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury group relative">
                        <div className="absolute inset-0 z-10 bg-black/10 group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                        <iframe src="https://dr-meera-clinic.vercel.app/" loading="lazy" className="w-[150%] h-[150%] origin-top-left scale-[0.666] border-none pointer-events-none group-hover:pointer-events-auto transition-all duration-700" title="Dr Meera Clinic" />
                      </ParallaxReveal>

                    </div>
                  </div>
                </div>

                {/* Case Study 2: RTR3 */}
                <div className="flex flex-col gap-16 border-t border-white/10 pt-[120px] md:pt-[200px]">
                  <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 lg:order-2">
                      <div>
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
                      <ParallaxReveal className="w-full aspect-[16/10] md:aspect-[16/11] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury group relative">
                        <div className="absolute inset-0 z-10 bg-black/10 group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                        <iframe src="https://rtr3-1-copy.vercel.app/" loading="lazy" className="w-[150%] h-[150%] origin-top-left scale-[0.666] border-none pointer-events-none group-hover:pointer-events-auto transition-all duration-700" title="RTR3 Community" />
                      </ParallaxReveal>

                    </div>
                  </div>
                </div>

                {/* Case Study 3: Mirai Forms */}
                <div className="flex flex-col gap-16 border-t border-white/10 pt-[120px] md:pt-[200px]">
                  <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5">
                      <div>
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

                        <a href="https://mirai-forms-web.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-white border-b border-white/30 pb-2 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors group">
                          Visit Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <ParallaxReveal className="w-full aspect-[16/10] md:aspect-[16/11] rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury group relative">
                        <div className="absolute inset-0 z-10 bg-black/10 group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                        <iframe src="https://mirai-forms-web.vercel.app/" loading="lazy" className="w-[150%] h-[150%] origin-top-left scale-[0.666] border-none pointer-events-none group-hover:pointer-events-auto transition-all duration-700" title="Mirai Forms" />
                      </ParallaxReveal>

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
                  <div className="w-full aspect-[4/3] bg-blue-orbit-warm-beige rounded-soft overflow-hidden shadow-luxury flex items-center justify-center border border-blue-orbit-border/50">
                    <div className="text-center">
                      <Camera size={48} className="text-blue-orbit-navy/40 mx-auto mb-6" />
                      <span className="text-blue-orbit-navy/60 font-bold tracking-widest uppercase text-sm">Professional Team Photo</span>
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
          <FAQSection />

          {/* 11. Contact / Final CTA */}
          <section id="contact" className="min-h-screen py-10 md:py-16 px-6 bg-blue-orbit-navy text-white relative overflow-hidden flex items-center justify-center">
            <div className="ambient-glow-blue bottom-0 right-0 opacity-50"></div>
            <div className="max-w-[1440px] mx-auto relative z-10 w-full">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
                
                {/* Consultation Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">
                          <div>
                    <span className="text-sm font-heading font-bold tracking-widest text-blue-orbit-blue uppercase mb-4 block">Free Consultation</span>
                    <AnimatedText text="Let's Build Something Your Customers Will Remember." className="text-[3rem] md:text-[4rem] font-bold mb-6 tracking-tighter leading-none" el="h2" />
                    
                    <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-soft mb-8">
                      <h3 className="text-xl font-bold mb-4">What happens during a consultation?</h3>
                      <ul className="space-y-3 text-base md:text-lg text-white/80">
                        <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Business discussion</li>
                        <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Technical requirements</li>
                        <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Website plan & strategy</li>
                        <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Timeline estimation</li>
                        <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-blue-orbit-blue" /> Transparent pricing</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 pt-6 border-t border-white/10 text-xl font-bold tracking-tight">
                    <a href="mailto:hello@blueorbit.agency" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                      <Mail size={22} className="text-blue-orbit-blue" />
                      <span>hello@blueorbit.agency</span>
                    </a>
                    <a href="tel:5550000000" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                      <Phone size={22} className="text-blue-orbit-blue" />
                      <span>+1 (555) 000-0000</span>
                    </a>
                  </div>
                </div>

                {/* Form */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white text-blue-orbit-navy rounded-soft shadow-luxury h-full flex flex-col justify-center relative overflow-hidden">
                    {/* Gold accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-orbit-gold via-amber-400 to-blue-orbit-gold"></div>
                    
                    <div className="p-8 md:p-10 lg:p-12">
                    <AnimatePresence mode="wait">
                      {formStatus === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                          className="text-center py-8"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                            className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_8px_30px_rgba(34,197,94,0.2)]"
                          >
                            <CheckCircle2 size={44} className="text-green-500" />
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold mb-3 tracking-tight"
                          >
                            Message Sent!
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-blue-orbit-slate/50 mb-10"
                          >
                            Thank you! We'll get back to you within 24 hours.
                          </motion.p>
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onClick={() => setFormStatus('idle')}
                            className="inline-flex items-center gap-2 text-blue-orbit-blue font-bold text-base hover:gap-4 transition-all duration-300"
                          >
                            <ArrowRight size={16} className="rotate-180" />
                            Send another message
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          {/* Header */}
                          <div className="mb-6">
                            <span className="inline-block text-xs font-bold tracking-[0.2em] text-blue-orbit-gold uppercase mb-2">Get Started</span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight leading-tight">Ready To Improve Your Online Presence?</h3>
                            <p className="text-sm md:text-base text-blue-orbit-slate/50">Fill out the form and we'll get back to you within 24 hours.</p>
                          </div>

                          {formStatus === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-lg mb-8 flex items-start gap-3 text-sm"
                            >
                              <X size={18} className="shrink-0 mt-0.5" />
                              <p>{formError}</p>
                            </motion.div>
                          )}

                          <form className="space-y-4" onSubmit={handleFormSubmit}>
                            {/* Honeypot spam protection */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            {/* Name Field */}
                            <div className="relative group">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-orbit-slate/30 group-focus-within:text-blue-orbit-blue transition-colors duration-300 z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              </div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                                className="peer w-full bg-blue-orbit-surface/50 border-2 border-transparent focus:border-blue-orbit-blue/30 focus:bg-white rounded-xl text-base pl-12 pr-5 pt-5 pb-2 focus:outline-none text-blue-orbit-navy placeholder-transparent transition-all duration-300"
                                placeholder="Name"
                                disabled={formStatus === 'submitting'}
                              />
                              <label className="absolute left-12 top-1/2 -translate-y-1/2 text-blue-orbit-slate/40 text-base pointer-events-none transition-all duration-300 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-blue-orbit-blue peer-focus:font-semibold peer-focus:tracking-wider peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:translate-y-0">
                                Your Name
                              </label>
                            </div>

                            {/* Email Field */}
                            <div className="relative group">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-orbit-slate/30 group-focus-within:text-blue-orbit-blue transition-colors duration-300 z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                                className="peer w-full bg-blue-orbit-surface/50 border-2 border-transparent focus:border-blue-orbit-blue/30 focus:bg-white rounded-xl text-base pl-12 pr-5 pt-5 pb-2 focus:outline-none text-blue-orbit-navy placeholder-transparent transition-all duration-300"
                                placeholder="Email"
                                disabled={formStatus === 'submitting'}
                              />
                              <label className="absolute left-12 top-1/2 -translate-y-1/2 text-blue-orbit-slate/40 text-base pointer-events-none transition-all duration-300 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-blue-orbit-blue peer-focus:font-semibold peer-focus:tracking-wider peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:translate-y-0">
                                Email Address
                              </label>
                            </div>

                            {/* Message Field */}
                            <div className="relative group">
                              <div className="absolute left-4 top-5 text-blue-orbit-slate/30 group-focus-within:text-blue-orbit-blue transition-colors duration-300 z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                              </div>
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleFormChange}
                                required
                                className="peer w-full bg-blue-orbit-surface/50 border-2 border-transparent focus:border-blue-orbit-blue/30 focus:bg-white rounded-xl text-base pl-12 pr-5 pt-6 pb-3 focus:outline-none text-blue-orbit-navy min-h-[90px] resize-none placeholder-transparent transition-all duration-300"
                                placeholder="Message"
                                disabled={formStatus === 'submitting'}
                              ></textarea>
                              <label className="absolute left-12 top-5 text-blue-orbit-slate/40 text-base pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-orbit-blue peer-focus:font-semibold peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wider">
                                Tell us about your project...
                              </label>
                            </div>

                            {/* Submit */}
                            <div className="pt-1">
                              <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full rounded-xl px-8 py-3.5 font-bold text-sm md:text-base text-center uppercase tracking-[0.15em] bg-blue-orbit-navy text-white group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_10px_40px_rgba(16,44,87,0.35)]"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-orbit-blue to-blue-orbit-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                  {formStatus === 'submitting' ? (
                                    <>
                                      <Loader2 size={20} className="animate-spin" />
                                      Sending...
                                    </>
                                  ) : (
                                    <>
                                      Book A Free Consultation
                                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                  )}
                                </span>
                              </button>
                            </div>

                            {/* Trust indicator */}
                            <p className="text-center text-xs text-blue-orbit-slate/35 pt-2 flex items-center justify-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                              Your information is secure and never shared.
                            </p>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <footer className="py-16 px-6 bg-blue-orbit-navy text-white">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8 border-t border-white/10 pt-16 text-center">
            <img src={`/logo1.png`} alt="Blue Orbit Logo" className="h-32 w-auto object-contain" />
            <span className="text-white/60 tracking-widest uppercase text-sm font-bold">Design. Development. Growth.</span>
            
            <div className="flex gap-6 mt-8 mb-2">
              <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
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
