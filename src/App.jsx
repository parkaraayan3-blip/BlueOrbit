import { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Smartphone, Camera, Code, CheckCircle2 } from 'lucide-react';

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

      <div className={`min-h-screen bg-blue-orbit-surface transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`} ref={containerRef}>
        <Cursor />
        
        {/* Navigation */}
        <header className="border-b border-white/20 luxury-glass sticky top-0 z-50">
          <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-blue-orbit-navy uppercase tracking-widest">Blue Orbit</span>
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              {['Services', 'Portfolio', 'Process', 'FAQ'].map((item) => (
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
          <section className="pt-[150px] pb-[80px] px-6 bg-white overflow-hidden relative">
            <div className="ambient-glow-blue -top-40 -left-40"></div>
            <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center">
              <div className="max-w-5xl mb-12">
                {!loading && (
                  <AnimatedText 
                    text="We Build Websites That Earn Trust Before You Say A Word." 
                    className="text-5xl md:text-[6rem] font-bold text-blue-orbit-navy leading-[1.1] tracking-tighter"
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
                <p className="text-xl md:text-2xl text-blue-orbit-slate font-medium leading-relaxed mb-6">
                  Your website is often the first impression customers have of your business.
                </p>
                <p className="text-lg md:text-xl text-blue-orbit-slate/80 leading-relaxed mb-6">
                  At Blue Orbit, we design and develop websites that help businesses build credibility, attract enquiries, and create meaningful customer experiences.
                </p>
                <p className="text-lg md:text-xl text-blue-orbit-slate/80 leading-relaxed">
                  Whether you're a clinic, restaurant, startup, professional service, or local business, we create websites that reflect the quality of your work.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ delay: 1.2, duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <HoverButton href="#portfolio" variant="dark" className="px-8 py-4 text-sm tracking-widest uppercase luxury-lift shadow-luxury">
                  View Our Work
                </HoverButton>
                <HoverButton href="#contact" variant="outline" className="px-8 py-4 text-sm tracking-widest uppercase luxury-lift">
                  Schedule a Consultation
                </HoverButton>
              </motion.div>
            </div>
          </section>

          {/* 2. Trust Bar */}
          <section className="bg-blue-orbit-navy text-white overflow-hidden py-8">
            <Marquee baseVelocity={-1}>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8">Fast Delivery</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8 text-white/40">•</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8">Mobile Optimized</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8 text-white/40">•</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8">SEO Ready</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8 text-white/40">•</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8">Professional Photography</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8 text-white/40">•</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 px-8">Long-Term Support</span>
            </Marquee>
          </section>

          {/* 3. The Problem We Solve */}
          <section className="py-[120px] px-6 bg-blue-orbit-surface">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-20">
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Many businesses lose customers before they ever make contact." className="text-[3rem] md:text-[4rem] font-bold text-blue-orbit-navy mb-8 tracking-tighter leading-[1.1]" el="h2" />
                  <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-xl md:text-2xl text-blue-orbit-slate leading-relaxed space-y-6 max-w-xl"
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
                    className="bg-white p-12 rounded-soft shadow-luxury"
                  >
                    <motion.h3 variants={fadeUp} className="text-2xl font-bold mb-8 tracking-tight text-blue-orbit-navy">Common problems we see:</motion.h3>
                    <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                      {[
                        'Outdated websites', 'Slow loading times', 'Poor mobile experience',
                        'No clear call-to-action', 'Low Google visibility', 'Generic stock imagery',
                        'Weak branding', 'No online credibility'
                      ].map((problem, i) => (
                        <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-orbit-blue mt-2 shrink-0"></div>
                          <span className="text-lg text-blue-orbit-slate font-medium">{problem}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.p variants={fadeUp} className="text-xl font-bold text-blue-orbit-navy border-t border-blue-orbit-border pt-8">
                      Customers judge businesses within seconds. We help ensure those first impressions work in your favor.
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. What We Do */}
          <section id="services" className="py-[120px] px-6 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-20 text-center max-w-3xl mx-auto">
                <AnimatedText text="What We Do" className="text-[4rem] font-bold tracking-tighter text-blue-orbit-navy" el="h2" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {[
                  {
                    title: "Website Design & Development",
                    desc: "Custom websites built around your business goals. Every website is designed from the ground up to match your industry, audience, and brand identity.",
                    features: ["Custom Design", "Responsive Layout", "Speed Optimization", "SEO Setup", "Contact Forms", "WhatsApp Integration", "Analytics Setup"],
                    icon: Code
                  },
                  {
                    title: "SEO & Search Visibility",
                    desc: "A great website means little if nobody finds it. We optimize websites to improve visibility and help customers discover your business through Google.",
                    features: ["On-Page SEO", "Technical SEO", "Local SEO", "Google Business Profile", "Search Performance"],
                    icon: Search
                  },
                  {
                    title: "Professional Photography",
                    desc: "People trust real businesses. Professional photography creates confidence before customers even contact you. Available for clinics, restaurants, offices, and more.",
                    features: ["Staff Portraits", "Team Photos", "Workspace Photography", "Product Photography", "Brand Content"],
                    icon: Camera
                  },
                  {
                    title: "Branding & Identity",
                    desc: "Your brand is more than a logo. We help businesses create a consistent visual identity across their website and digital presence.",
                    features: ["Logo Design", "Brand Guidelines", "Typography Systems", "Color Systems", "Social Media Assets"],
                    icon: Smartphone
                  }
                ].map((service, i) => (
                  <motion.div 
                    key={i} 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="bg-blue-orbit-surface p-10 md:p-16 rounded-soft luxury-lift shadow-luxury border border-blue-orbit-border"
                  >
                    <motion.div variants={fadeUp} className="w-16 h-16 bg-white shadow-sm text-blue-orbit-navy rounded-full flex items-center justify-center mb-8">
                      <service.icon size={28} strokeWidth={2} />
                    </motion.div>
                    <motion.h3 variants={fadeUp} className="text-3xl font-bold mb-4 tracking-tight text-blue-orbit-navy">{service.title}</motion.h3>
                    <motion.p variants={fadeUp} className="text-lg text-blue-orbit-slate/80 leading-relaxed mb-8">{service.desc}</motion.p>
                    
                    <div className="space-y-4">
                      {service.features.map((feat, idx) => (
                        <motion.div key={idx} variants={fadeUp} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-blue-orbit-blue shrink-0" />
                          <span className="font-medium text-blue-orbit-slate">{feat}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Featured Projects */}
          <section id="portfolio" className="py-[120px] px-6 bg-blue-orbit-navy text-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-24">
                <AnimatedText text="Featured Projects" className="text-[4rem] font-bold tracking-tighter" el="h2" />
              </div>

              <div className="space-y-32">
                {/* Project 1: RTR3 */}
                <div className="flex flex-col lg:flex-row gap-20">
                  <div className="w-full lg:w-1/2">
                    <span className="text-xs font-heading font-bold tracking-widest text-blue-orbit-surface/50 uppercase mb-4 block">Education / Non-Profit</span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">RTR3 — Rotaract Club</h3>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Challenge</h4>
                      <p className="text-lg text-white/60 leading-relaxed">The Rotaract Club needed a modern online presence to showcase its initiatives, events, leadership team, and community impact while making it easier for students and visitors to learn about the club.</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Solution</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Blue Orbit designed and developed a custom website that highlights the club's mission, projects, events, and achievements in a clean and engaging format.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                      {['Modern Responsive Design', 'Event Showcase', 'Leadership Profiles', 'Project Highlights', 'Mobile Optimization', 'Fast Performance'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle2 size={14} className="text-white" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <a href="https://rtr3-1-copy.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 font-bold tracking-widest uppercase text-sm hover:border-white transition-colors">
                      View Live Project <ArrowRight size={16} />
                    </a>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <ParallaxReveal className="aspect-[4/3] w-full rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-heading font-bold text-2xl tracking-widest uppercase">Project Preview</span>
                      </div>
                    </ParallaxReveal>
                  </div>
                </div>

                {/* Project 2: Mirai Forms */}
                <div className="flex flex-col lg:flex-row-reverse gap-20">
                  <div className="w-full lg:w-1/2">
                    <span className="text-xs font-heading font-bold tracking-widest text-blue-orbit-surface/50 uppercase mb-4 block">Software</span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Mirai Forms</h3>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Challenge</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Build a modern platform that simplifies form creation while maintaining a clean and professional user experience.</p>
                    </div>

                    <div className="mb-12">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Solution</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Custom design system, responsive dashboard, optimized performance, and intuitive workflows.</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <ParallaxReveal className="aspect-[4/3] w-full rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-heading font-bold text-2xl tracking-widest uppercase">Project Preview</span>
                      </div>
                    </ParallaxReveal>
                  </div>
                </div>

                {/* Project 3: Hibiki */}
                <div className="flex flex-col lg:flex-row gap-20">
                  <div className="w-full lg:w-1/2">
                    <span className="text-xs font-heading font-bold tracking-widest text-blue-orbit-surface/50 uppercase mb-4 block">Technology</span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Hibiki</h3>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Challenge</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Create a polished and memorable digital experience with strong visual identity.</p>
                    </div>

                    <div className="mb-12">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Solution</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Modern UI system, responsive layouts, and performance-first development.</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <ParallaxReveal className="aspect-[4/3] w-full rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-heading font-bold text-2xl tracking-widest uppercase">Project Preview</span>
                      </div>
                    </ParallaxReveal>
                  </div>
                </div>

                {/* Project 4: Dr Meera */}
                <div className="flex flex-col lg:flex-row-reverse gap-20">
                  <div className="w-full lg:w-1/2">
                    <span className="text-xs font-heading font-bold tracking-widest text-blue-orbit-surface/50 uppercase mb-4 block">Healthcare</span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Dr. Meera Dermatology</h3>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Challenge</h4>
                      <p className="text-lg text-white/60 leading-relaxed">Create a trustworthy online experience that reflects professionalism, care, and medical expertise.</p>
                    </div>

                    <div className="mb-12">
                      <h4 className="text-xl font-bold mb-3 text-blue-orbit-surface/80">The Solution</h4>
                      <p className="text-lg text-white/60 leading-relaxed">We designed a warm, patient-focused website featuring treatment information, doctor credentials, before-and-after results, appointment booking, and a detailed career timeline.</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <ParallaxReveal className="aspect-[4/3] w-full rounded-soft bg-white/5 border border-white/10 overflow-hidden shadow-luxury">
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-heading font-bold text-2xl tracking-widest uppercase">Project Preview</span>
                      </div>
                    </ParallaxReveal>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 6. Our Process */}
          <section id="process" className="py-[120px] px-6 bg-blue-orbit-surface">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-20 text-center max-w-3xl mx-auto">
                <AnimatedText text="Our Process" className="text-[4rem] font-bold tracking-tighter text-blue-orbit-navy" el="h2" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Discovery", desc: "Every project starts with understanding. We learn about your business, goals, competitors, and audience." },
                  { step: "02", title: "Strategy", desc: "We define the structure, content, and user journey before any design work begins." },
                  { step: "03", title: "Design", desc: "We create a visual experience that reflects your brand and builds trust." },
                  { step: "04", title: "Development", desc: "Fast, responsive, and optimized websites built using modern technologies." },
                  { step: "05", title: "Launch", desc: "We handle deployment, testing, and final setup." },
                  { step: "06", title: "Support", desc: "We remain available long after launch to ensure everything continues running smoothly." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-white p-10 rounded-soft shadow-luxury luxury-lift border border-blue-orbit-border"
                  >
                    <span className="text-6xl font-bold text-blue-orbit-surface block mb-6 leading-none tracking-tighter">{item.step}</span>
                    <h3 className="text-2xl font-bold text-blue-orbit-navy mb-4">{item.title}</h3>
                    <p className="text-lg text-blue-orbit-slate/80">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Why Blue Orbit */}
          <section className="py-[120px] px-6 bg-white border-b border-blue-orbit-border">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-24">
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Why Blue Orbit?" className="text-[4rem] font-bold text-blue-orbit-navy mb-12 tracking-tighter leading-none" el="h2" />
                  
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-orbit-navy mb-4">We Focus On Business Outcomes</h3>
                      <p className="text-lg text-blue-orbit-slate/80 mb-4">We don't just build websites. We help businesses:</p>
                      <ul className="list-disc list-inside text-lg text-blue-orbit-slate/80 space-y-2 ml-2">
                        <li>Build trust</li>
                        <li>Improve credibility</li>
                        <li>Generate enquiries</li>
                        <li>Strengthen branding</li>
                        <li>Create better customer experiences</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-blue-orbit-navy mb-4">Fast Turnaround</h3>
                      <p className="text-lg text-blue-orbit-slate/80">Most projects are completed within 4–10 days.</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-blue-orbit-navy mb-4">Real Collaboration</h3>
                      <p className="text-lg text-blue-orbit-slate/80">We work closely with clients throughout the process. No disappearing after payment.</p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="bg-blue-orbit-navy text-white p-12 rounded-soft shadow-luxury h-full">
                    <h3 className="text-3xl font-bold mb-8">The Blue Orbit Promise</h3>
                    <p className="text-xl text-white/60 mb-12">Every website we build is:</p>
                    
                    <div className="space-y-6">
                      {['Custom Designed', 'Mobile Optimized', 'SEO Ready', 'Speed Optimized', 'Professionally Tested', 'Easy To Maintain', 'Built For Growth'].map((promise, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl">
                          <CheckCircle2 size={24} className="text-blue-orbit-blue shrink-0" />
                          <span className="font-medium">{promise}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Our Story */}
          <section className="py-[120px] px-6 bg-blue-orbit-surface">
            <div className="max-w-[800px] mx-auto text-center">
              <AnimatedText text="Our Story" className="text-[3rem] font-bold text-blue-orbit-navy mb-12 tracking-tighter" el="h2" />
              
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-xl md:text-2xl text-blue-orbit-slate/80 leading-relaxed space-y-8 text-left"
              >
                <motion.p variants={fadeUp}>Blue Orbit started with a simple belief: Small businesses deserve the same level of digital quality as large companies.</motion.p>
                <motion.p variants={fadeUp}>Too often, local businesses are forced to choose between overpriced agencies and low-quality templates.</motion.p>
                <motion.p variants={fadeUp}>We created Blue Orbit to bridge that gap.</motion.p>
                <motion.p variants={fadeUp}>Our mission is to help businesses establish a strong online presence through thoughtful design, modern technology, and genuine collaboration.</motion.p>
                <motion.p variants={fadeUp} className="font-bold text-blue-orbit-navy border-l-4 border-blue-orbit-blue pl-6 italic">Every project is treated with the same care and attention we would give our own business.</motion.p>
              </motion.div>
            </div>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="py-[120px] px-6 bg-white">
            <div className="max-w-[1000px] mx-auto">
              <div className="mb-20 text-center">
                <AnimatedText text="Frequently Asked Questions" className="text-[4rem] font-bold tracking-tighter text-blue-orbit-navy" el="h2" />
              </div>

              <div className="flex flex-col">
                {[
                  { q: "How long does a website take?", a: "Most projects are completed within 4–10 days depending on scope." },
                  { q: "Do you provide domains?", a: "Yes. Eligible projects include a free domain for 2 years." },
                  { q: "Do you provide hosting?", a: "Yes. We handle deployment and setup." },
                  { q: "Do you provide photography?", a: "Yes. Professional photography is available for clinics, restaurants, offices, and businesses." },
                  { q: "Do you provide ongoing support?", a: "Every project includes 1 year of support and updates." },
                  { q: "Can you redesign an existing website?", a: "Absolutely. We can redesign, optimize, and modernize existing websites." }
                ].map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </section>

          {/* 10. Contact / Final CTA */}
          <section id="contact" className="py-[120px] px-6 bg-blue-orbit-navy text-white relative overflow-hidden">
            <div className="ambient-glow-blue bottom-0 right-0 opacity-50"></div>
            <div className="max-w-[1440px] mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row gap-20">
                <div className="w-full lg:w-1/2">
                  <AnimatedText text="Let's Build Something Your Customers Will Remember." className="text-[4rem] font-bold mb-8 tracking-tighter leading-none" el="h2" />
                  <p className="text-2xl text-white/60 mb-16 max-w-md leading-relaxed">Whether you're launching a new business or improving an existing one, we'd love to help create a digital presence that reflects the quality of your work.</p>
                  
                  <div className="space-y-6 text-2xl font-bold tracking-tight">
                    <a href="mailto:hello@blueorbit.agency" className="btn-animate-chars block">
                      <span data-button-animate-chars>hello@blueorbit.agency</span>
                    </a>
                    <a href="tel:5550000000" className="btn-animate-chars block">
                      <span data-button-animate-chars>+1 (555) 000-0000</span>
                    </a>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 bg-white text-blue-orbit-navy p-12 rounded-soft shadow-luxury luxury-lift">
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative border-b border-blue-orbit-border pb-4 group">
                      <input type="text" className="w-full bg-transparent text-xl focus:outline-none placeholder:text-blue-orbit-slate/40 text-blue-orbit-navy relative z-10" placeholder="What is your name?" />
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                    <div className="relative border-b border-blue-orbit-border pb-4 group pt-4">
                      <input type="email" className="w-full bg-transparent text-xl focus:outline-none placeholder:text-blue-orbit-slate/40 text-blue-orbit-navy relative z-10" placeholder="Your email address?" />
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                    <div className="relative border-b border-blue-orbit-border pb-4 group pt-8">
                      <textarea className="w-full bg-transparent text-xl focus:outline-none placeholder:text-blue-orbit-slate/40 text-blue-orbit-navy min-h-[120px] resize-none relative z-10" placeholder="Tell us about your project..."></textarea>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-orbit-navy transition-all duration-500 group-focus-within:w-full"></div>
                    </div>
                    <div className="pt-8">
                      <HoverButton variant="dark" className="text-xl px-12 py-6 w-full text-center flex justify-center">
                        Book a Consultation
                      </HoverButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 px-6 bg-blue-orbit-navy text-white">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6 border-t border-white/20 pt-12 text-center">
            <span className="font-heading font-bold text-3xl tracking-widest uppercase">Blue Orbit</span>
            <span className="text-white/60 tracking-widest uppercase text-sm font-bold">Design. Development. Growth.</span>
            <div className="flex gap-8 text-white/40 text-sm tracking-widest uppercase font-bold mt-4">
              <span>&copy; {new Date().getFullYear()} Blue Orbit</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
