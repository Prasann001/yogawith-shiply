import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Marquee from 'react-fast-marquee';
import { Wind, Activity, Feather, Sun } from 'lucide-react';

/* --- CUSTOM SVG ARTWORKS (Hand-drawn style) --- */
const SunArc = ({ className }) => (
  <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 10V0M20 20L12 12M80 20L88 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BotanicalSprig = ({ className }) => (
  <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 150Q40 100 60 50Q70 20 80 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M56 80Q30 90 20 70Q30 60 52 70" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M62 40Q80 50 90 35Q80 20 65 30" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SeatedFigure = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 40C111.046 40 120 31.0457 120 20C120 8.9543 111.046 0 100 0C88.9543 0 80 8.9543 80 20C80 31.0457 88.9543 40 100 40Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M100 40V120M100 60C70 70 50 100 40 130M100 60C130 70 150 100 160 130M40 130C60 160 140 160 160 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Lotus = ({ className }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 80C50 80 10 60 10 30C10 10 30 10 50 40C70 10 90 10 90 30C90 60 50 80 50 80Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M50 80C50 80 30 70 30 45C30 25 45 25 50 50C55 25 70 25 70 45C70 70 50 80 50 80Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M50 80V50" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

/* --- SHARED ANIMATION CONSTANTS --- */
const customEase = [0.16, 1, 0.3, 1];

const revealVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 1.2, ease: customEase }
  })
};

const SectionReveal = ({ children, className }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: customEase }}
    className={className}
  >
    {children}
  </motion.div>
);

/* --- COMPONENTS --- */

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-moss-10 px-6 py-4 md:px-12 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, ease: customEase }}
        className="font-fraunces italic text-xl text-moss"
      >
        Shilpi
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, ease: customEase }}
        className="flex items-center gap-8"
      >
        <div className="hidden md:flex gap-6 font-karla uppercase tracking-[0.15em] text-[10px] font-bold text-moss">
          <a href="#about" className="hover:text-clay transition-colors" data-testid="nav-about">About</a>
          <a href="#classes" className="hover:text-clay transition-colors" data-testid="nav-classes">Classes</a>
        </div>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://forms.gle/MVWqfPhytYQZnmih6"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-reserve-btn"
          className="bg-moss text-[#F4F1EB] px-5 py-2.5 rounded-full font-karla uppercase tracking-[0.1em] text-[10px] font-bold transition-shadow hover:shadow-[0_8px_24px_rgba(44,64,43,0.15)]"
        >
          Reserve a spot
        </motion.a>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yParallax2 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 md:px-12">
      
      {/* Floating Art Parallax */}
      <motion.div style={{ y: yParallax1 }} className="absolute top-32 left-[10%] text-clay/20 w-32 hidden md:block">
        <SunArc />
      </motion.div>
      <motion.div style={{ y: yParallax2 }} className="absolute bottom-32 right-[15%] text-moss/10 w-24">
        <BotanicalSprig />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl items-center relative z-10">
        
        {/* Left: Headline */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 relative z-20">
          <h1 className="font-fraunces font-light text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight text-moss flex flex-col">
            <div className="overflow-hidden pb-2">
              <motion.span custom={0} variants={revealVariants} initial="hidden" animate="visible" className="block">
                Yoga with
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.span custom={1} variants={revealVariants} initial="hidden" animate="visible" className="block italic text-clay">
                Shilpi
              </motion.span>
            </div>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-8 font-karla text-moss/70 max-w-sm"
          >
            A gentle return to your body.
          </motion.p>
        </div>

        {/* Right: Breathing Circle */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end items-center h-80 lg:h-auto order-1 lg:order-2">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            
            {/* Clay blur glow */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_#B67358_0%,_transparent_60%)] opacity-20 blur-2xl"
            />
            {/* Brass Ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full border border-brass opacity-30"
            />
            {/* Moss Ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-10 rounded-full border border-moss opacity-20"
            />
            {/* Core Moss Glow */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-16 rounded-full bg-[radial-gradient(circle_at_center,_#2C402B_0%,_transparent_100%)] opacity-10"
            />

            {/* Sync Text */}
            <div className="absolute -left-12 md:-left-24 font-fraunces italic text-clay text-xl md:text-2xl whitespace-nowrap pointer-events-none mix-blend-multiply">
               <motion.span 
                 className="absolute inset-0 flex items-center"
                 animate={{ opacity: [0, 1, 1, 0, 0] }} 
                 transition={{ duration: 8, repeat: Infinity, times: [0, 0.25, 0.45, 0.5, 1], ease: "linear" }}
               >
                 Breathe in...
               </motion.span>
               <motion.span 
                 className="absolute inset-0 flex items-center"
                 animate={{ opacity: [0, 0, 0, 1, 1, 0] }} 
                 transition={{ duration: 8, repeat: Infinity, times: [0, 0.45, 0.5, 0.75, 0.95, 1], ease: "linear" }}
               >
                 Breathe out...
               </motion.span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-10 left-6 md:left-12 flex flex-col gap-2 text-moss/50 font-karla uppercase tracking-widest text-[9px]"
      >
        <span>Scroll gently</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-moss/30 ml-3"
        />
      </motion.div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const svgY = useTransform(scrollYProgress, [0, 1], [100, -150]);

  const chapters = [
    { num: "01", title: "Come exactly as you are", desc: "No prerequisites. No perfect poses. We begin with the body you brought today, welcoming stiffness and fatigue with deep grace." },
    { num: "02", title: "Breath before movement", desc: "Every flow starts with establishing a slow, grounding breath. The movement simply follows where the breath creates space." },
    { num: "03", title: "Gentle is not easy — it's kind", desc: "True relaxation takes intention. We work deliberately to release the tension held in weary shoulders and aching lower backs." }
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-sand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Heading */}
        <div className="col-span-1 lg:col-span-5">
          <SectionReveal>
            <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight text-moss leading-tight">
              A gentler way back to <span className="italic text-clay">your own body.</span>
            </h2>
          </SectionReveal>
        </div>

        {/* Right Chapters */}
        <div className="col-span-1 lg:col-span-7 flex flex-col">
          {chapters.map((ch, idx) => (
            <SectionReveal key={idx} className="group border-b border-moss-10 pb-12 mb-12 last:border-0 last:mb-0 last:pb-0 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <span className="font-fraunces italic text-4xl md:text-6xl text-brass leading-none pt-2">{ch.num}</span>
              <div>
                <h3 className="font-fraunces text-2xl text-moss mb-4">{ch.title}</h3>
                <p className="font-karla text-moss/80 leading-relaxed max-w-md">{ch.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Giant Parallax Background Art */}
      <motion.div style={{ y: svgY }} className="absolute right-[-10%] top-[20%] w-[600px] text-clay/[0.04] pointer-events-none z-0">
        <SeatedFigure />
      </motion.div>
    </section>
  );
};

const EditorialMarquee = () => {
  return (
    <section className="py-16 md:py-24 bg-moss overflow-hidden flex items-center border-y border-moss-10/20">
      <Marquee speed={22} autoFill className="overflow-hidden">
        <div className="flex items-center text-sand font-fraunces italic text-3xl md:text-5xl tracking-wide font-light">
          <span className="mx-8">Gentle movement</span>
          <span className="text-brass w-2 h-2 rounded-full mx-4" />
          <span className="mx-8">Mindful breathing</span>
          <span className="text-brass w-2 h-2 rounded-full mx-4" />
          <span className="mx-8">Restorative flow</span>
          <span className="text-brass w-2 h-2 rounded-full mx-4" />
          <span className="mx-8">Ease for tired backs</span>
          <span className="text-brass w-2 h-2 rounded-full mx-4" />
        </div>
      </Marquee>
    </section>
  );
};

const Classes = () => {
  const highlights = [
    { icon: <Wind strokeWidth={1} size={32} />, label: "Breathwork" },
    { icon: <Activity strokeWidth={1} size={32} />, label: "Flexibility" },
    { icon: <Sun strokeWidth={1} size={32} />, label: "Relaxation" },
    { icon: <Feather strokeWidth={1} size={32} />, label: "Back Relief" },
  ];

  return (
    <section id="classes" className="py-32 md:py-48 px-6 md:px-12 bg-sand">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight text-moss mb-20 max-w-2xl">
            Evening classes, from <span className="italic text-clay">your own living room.</span>
          </h2>
        </SectionReveal>

        {/* Huge Interactive Rows */}
        <div className="border-t border-moss-10 flex flex-col">
          {[
            { name: "Evening Batch One", time: "5:00–6:00 PM" },
            { name: "Evening Batch Two", time: "6:00–7:00 PM" }
          ].map((batch, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 16, backgroundColor: "var(--sand-light)" }}
              transition={{ duration: 0.4, ease: customEase }}
              className="border-b border-moss-10 py-12 px-4 flex flex-col md:flex-row justify-between items-start md:items-center cursor-default rounded-lg -mx-4 group"
            >
              <h3 className="font-fraunces text-3xl md:text-5xl text-moss group-hover:text-clay transition-colors duration-500">{batch.name}</h3>
              <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold text-moss/60 mt-4 md:mt-0">{batch.time} (IST)</span>
            </motion.div>
          ))}
        </div>

        {/* Practice Highlights Grid */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 pt-12">
          {highlights.map((item, i) => (
            <SectionReveal key={i} className="flex flex-col items-center text-center gap-4 text-moss/70">
              <div className="text-clay/60 mb-2">{item.icon}</div>
              <span className="font-sans uppercase tracking-[0.15em] text-[10px] font-bold">{item.label}</span>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SignUp = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-sand-light relative flex flex-col items-center justify-center min-h-screen text-center">
      {/* Decorative Lotus */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: customEase }}
        className="w-32 md:w-48 text-clay/20 mb-12"
      >
        <Lotus />
      </motion.div>

      <SectionReveal className="flex flex-col items-center z-10">
        <h2 className="font-fraunces text-5xl md:text-7xl font-light tracking-tight text-moss mb-12">
          Begin this <span className="italic text-clay">evening.</span>
        </h2>
        
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://forms.gle/MVWqfPhytYQZnmih6"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-reserve-btn"
          className="bg-moss text-sand px-10 py-5 rounded-full font-karla uppercase tracking-[0.15em] text-sm font-bold shadow-[0_4px_20px_rgba(44,64,43,0.1)] hover:shadow-[0_12px_40px_rgba(44,64,43,0.25)] transition-shadow duration-300"
        >
          Reserve your spot
        </motion.a>
        
        <p className="mt-6 font-karla text-moss/50 text-sm max-w-xs">
          Opens a short Google Form — takes under a minute.
        </p>
      </SectionReveal>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-moss-10 bg-sand flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-fraunces italic text-2xl text-moss">Shilpi</div>
      <div className="font-karla text-moss/60 text-sm text-center md:text-left">
        Online yoga, taught gently. <br className="md:hidden" /> Batch times in IST.
      </div>
      <div className="font-karla text-moss/40 text-xs">
        &copy; {new Date().getFullYear()} Shilpi Yoga
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <main className="bg-sand text-moss font-karla antialiased selection:bg-clay/20">
        <NavBar />
        <Hero />
        <About />
        <EditorialMarquee />
        <Classes />
        <SignUp />
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default App;