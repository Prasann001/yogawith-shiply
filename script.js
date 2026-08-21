
import React, { useEffect, useRef } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import { motion, useScroll, useTransform } from "https://esm.sh/framer-motion@11.11.17";
import Lenis from "https://esm.sh/@studio-freight/lenis@1.0.42";
import Marquee from "https://esm.sh/react-fast-marquee@1.6.5";
import { ArrowUpRight, Wind, Sparkles, Moon, Activity } from "https://esm.sh/lucide-react@0.468.0";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const EASE = [0.16, 1, 0.3, 1];

function useParallax(amount=40){
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({target:ref, offset:["start end","end start"]});
  const y = useTransform(scrollYProgress,[0,1],[-amount,amount]);
  return {ref, style:{y}};
}

function Sprig({className=""}){
  return html`<svg className=${`line-art ${className}`} viewBox="0 0 180 300" aria-hidden="true">
    <path d="M92 288C87 226 94 169 80 110C72 75 58 40 31 15"/>
    <path d="M81 116C51 119 30 107 17 84C42 81 63 89 81 116Z"/>
    <path d="M87 151C120 146 143 130 153 104C126 108 103 123 87 151Z"/>
    <path d="M87 190C55 191 31 179 15 157C42 153 65 164 87 190Z"/>
    <path d="M92 222C119 215 139 198 147 174C123 180 104 195 92 222Z"/>
  </svg>`;
}

function SunArc({className=""}){
  return html`<svg className=${`line-art ${className}`} viewBox="0 0 260 120" aria-hidden="true">
    <path d="M18 102C53 35 207 35 242 102"/>
    <circle cx="130" cy="49" r="2.2" fill="#C6A664" stroke="none"/>
    <path d="M130 27v-10M98 33l-5-9M162 33l5-9"/>
  </svg>`;
}

function SeatedFigure({className=""}){
  return html`<svg className=${`line-art ${className}`} viewBox="0 0 520 620" aria-hidden="true">
    <circle cx="260" cy="116" r="42"/>
    <path d="M260 159C224 183 206 226 208 281C210 341 231 389 260 425"/>
    <path d="M260 425C219 446 177 477 142 519"/>
    <path d="M260 425C302 446 345 478 381 519"/>
    <path d="M142 519C121 541 92 548 65 546"/>
    <path d="M381 519C404 541 430 548 457 546"/>
    <path d="M211 229C170 246 134 268 104 300"/>
    <path d="M309 229C350 246 386 268 416 300"/>
    <path d="M104 300C87 320 78 343 74 365"/>
    <path d="M416 300C433 320 442 343 446 365"/>
    <path d="M208 281C178 313 158 352 157 395"/>
    <path d="M312 281C342 313 362 352 363 395"/>
    <path d="M157 395C190 414 224 423 260 425"/>
    <path d="M363 395C330 414 296 423 260 425"/>
    <path d="M186 468C214 490 233 501 260 506C287 501 306 490 334 468"/>
  </svg>`;
}

function Lotus({className=""}){
  return html`<svg className=${`line-art ${className}`} viewBox="0 0 500 260" aria-hidden="true">
    <path d="M250 225C198 225 145 206 116 172C169 169 211 188 250 225Z"/>
    <path d="M250 225C302 225 355 206 384 172C331 169 289 188 250 225Z"/>
    <path d="M250 225C219 193 205 145 218 94C250 120 260 166 250 225Z"/>
    <path d="M250 225C281 193 295 145 282 94C250 120 240 166 250 225Z"/>
    <path d="M250 225C207 186 171 127 181 69C224 100 249 148 250 225Z"/>
    <path d="M250 225C293 186 329 127 319 69C276 100 251 148 250 225Z"/>
    <path d="M91 225H409"/>
  </svg>`;
}

function Reveal({children, delay=0, className=""}){
  return html`<${motion.div}
    className=${className}
    initial=${{y:40,opacity:0}}
    whileInView=${{y:0,opacity:1}}
    viewport=${{once:true,amount:.2}}
    transition=${{duration:.9,ease:EASE,delay}}
  >${children}</${motion.div}>`;
}

function App(){
  useEffect(()=>{
    const lenis = new Lenis({duration:1.25,smoothWheel:true});
    let raf;
    const loop=(time)=>{lenis.raf(time);raf=requestAnimationFrame(loop)};
    raf=requestAnimationFrame(loop);
    return ()=>{cancelAnimationFrame(raf);lenis.destroy()};
  },[]);

  const sprig = useParallax(90);
  const figure = useParallax(120);
  const sun = useParallax(55);

  return html`
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <nav className="nav-wrap max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between">
          <a href="#top" className="font-fraunces italic text-2xl md:text-3xl" data-testid="nav-wordmark">Shilpi</a>
          <div className="hidden md:flex items-center gap-9 text-sm" data-testid="nav-links">
            <a href="#about" className="hover:text-clay transition-colors" data-testid="nav-about">About</a>
            <a href="#classes" className="hover:text-clay transition-colors" data-testid="nav-classes">Classes</a>
          </div>
          <a href="https://forms.gle/MVWqfPhytYQZnmih6" target="_blank" rel="noreferrer"
             className="btn pill bg-moss text-sand px-5 py-2.5 text-sm font-semibold"
             data-testid="nav-reserve">Reserve a spot</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero relative overflow-hidden">
          <${motion.div} ref=${sprig.ref} style=${sprig.style} className="absolute -right-8 md:right-8 top-24 w-24 md:w-40 text-clay opacity-30 pointer-events-none float-slow">
            <${Sprig} className="w-full h-auto" />
          </${motion.div}>
          <${motion.div} ref=${sun.ref} style=${sun.style} className="absolute left-[7%] top-[15%] w-32 md:w-52 text-moss opacity-20 pointer-events-none">
            <${SunArc} className="w-full h-auto" />
          </${motion.div}>

          <div className="hero-grid max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="hero-copy lg:col-span-7 pt-16 lg:pt-0">
              <p className="eyebrow text-clay mb-6">Gentle online yoga · taught by Shilpi</p>
              <h1 className="font-fraunces font-light text-[clamp(4rem,9.5vw,9.5rem)] leading-[.86] tracking-[-.055em] max-w-5xl">
                <span className="reveal-mask"><span className="hero-line">Yoga with</span></span>
                <span className="reveal-mask"><span className="hero-line italic text-clay">Shilpi</span></span>
              </h1>
              <p className="mt-9 max-w-xl text-lg md:text-xl leading-relaxed text-moss/75">
                Come as you are. Move a little. Breathe a little deeper. Leave with a softer back and a quieter mind.
              </p>
              <div className="mt-9 flex items-center gap-5">
                <a href="#classes" className="btn pill bg-moss text-sand px-6 py-3.5 font-semibold" data-testid="hero-classes">See evening classes</a>
                <span className="eyebrow text-moss/50">Beginner friendly</span>
              </div>
            </div>

            <div className="hero-orb lg:col-span-5 flex flex-col items-center justify-center lg:justify-self-end gap-7">
              <div className="breathing-orb" aria-label="Breathing guide">
                <div className="orb-ring"></div><div className="orb-brass"></div>
                <div className="relative text-center font-fraunces text-lg md:text-xl">
                  <div className="breath-word">Breathe in…</div>
                  <div className="breath-word out absolute inset-0">Breathe out…</div>
                </div>
              </div>
              <p className="eyebrow text-moss/50">8-second breathing rhythm</p>
            </div>
          </div>

          <div className="absolute bottom-7 left-5 md:left-10 flex items-center gap-3 text-moss/45">
            <span className="h-px w-10 bg-moss/25"></span>
            <span className="eyebrow">Scroll gently</span>
          </div>
        </section>

        <section id="about" className="relative bg-softsand py-32 md:py-48 overflow-hidden">
          <${motion.div} ref=${figure.ref} style=${figure.style} className="absolute right-[-10%] md:right-[4%] top-[17%] w-[58%] md:w-[42%] max-w-[620px] text-clay opacity-[.14] pointer-events-none">
            <${SeatedFigure} className="w-full h-auto" />
          </${motion.div}>
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-clay mb-7">01 — About the practice</p>
                <h2 className="font-fraunces font-light text-5xl md:text-7xl leading-[.94] tracking-[-.045em] max-w-3xl">
                  A gentler way back to your own body,
                </h2>
              </Reveal>

              <div className="mt-20 border-t border-moss/10">
                ${[
                  ["01","Come exactly as you are","No flexibility test at the door. No perfect pose to earn. We start with the body you have today."],
                  ["02","Breath before movement","A slow breath gives the body permission to soften. Movement follows, never the other way around."],
                  ["03","Gentle is not easy — it’s kind","Small, steady practices can ask a lot of you. The difference is that they never ask you to fight yourself."]
                ].map(([n,title,body],i)=>html`
                  <${Reveal} key=${n} delay=${i*.08}>
                    <article className="manifesto-row relative py-10 md:py-12 border-b border-moss/10 grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-5">
                      <div className="font-fraunces text-5xl md:text-6xl text-brass font-light">${n}</div>
                      <div>
                        <h3 className="font-fraunces text-2xl md:text-3xl font-light mb-3">${title}</h3>
                        <p className="max-w-xl text-moss/65 leading-relaxed">${body}</p>
                      </div>
                    </article>
                  </${Reveal}>
                `)}
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-wrap bg-sand py-8 md:py-10" aria-label="Practice values">
          <Marquee speed=${22} gradient=${false} pauseOnHover=${true}>
            <div className="flex items-center">
              ${["Gentle movement","Mindful breathing","Restorative flow","Ease for tired backs"].map((x,i)=>html`
                <span className="font-fraunces italic font-light text-3xl md:text-5xl text-clay whitespace-nowrap flex items-center">
                  ${x}<span className="text-brass text-xl md:text-2xl mx-8">·</span>
                </span>
              `)}
            </div>
          </Marquee>
        </section>

        <section id="classes" className="py-32 md:py-48 bg-sand">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              <Reveal className="lg:col-span-8">
                <p className="eyebrow text-clay mb-7">02 — Evening classes</p>
                <h2 className="font-fraunces font-light text-5xl md:text-7xl leading-[.94] tracking-[-.045em]">
                  Evening classes, from your own living room,
                </h2>
              </Reveal>
              <Reveal delay=${.12} className="lg:col-span-3 lg:col-start-10 self-end">
                <p className="text-moss/60 leading-relaxed">An unhurried hour for beginners, tired bodies, and anyone who wants to feel a little more at home in themselves.</p>
              </Reveal>
            </div>

            <div className="border-t border-moss/10">
              ${[
                ["Evening Batch One","5:00–6:00 PM","A calm, accessible start to the evening."],
                ["Evening Batch Two","6:00–7:00 PM","A slower wind-down after a full day."]
              ].map(([title,time,desc],i)=>html`
                <${Reveal} key=${title} delay=${i*.08}>
                  <a href="https://forms.gle/MVWqfPhytYQZnmih6" target="_blank" rel="noreferrer" className="class-row block border-b border-moss/10 py-9 md:py-12" data-testid=${`class-row-${i+1}`}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-2 eyebrow text-brass">0${i+1}</div>
                      <div className="md:col-span-6">
                        <h3 className="font-fraunces text-3xl md:text-5xl font-light">${title}</h3>
                        <p className="mt-2 text-moss/55">${desc}</p>
                      </div>
                      <div className="md:col-span-3 md:text-right font-fraunces text-2xl md:text-4xl">${time} <span className="text-sm font-karla text-moss/45">IST</span></div>
                      <div className="md:col-span-1 md:justify-self-end"><${ArrowUpRight} className="class-arrow w-7 h-7" strokeWidth=${1.3}/></div>
                    </div>
                  </a>
                </${Reveal}>
              `)}
            </div>

            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-moss/10 border border-moss/10">
              ${[
                ["flexibility","Create a little more room in stiff, busy places.",Wind],
                ["breathwork","Simple breathing practices you can take anywhere.",Sparkles],
                ["relaxation","Finish with stillness instead of rushing away.",Moon],
                ["back-stiffness relief","Gentle mobility for backs that have had a long day.",Activity]
              ].map(([title,body,Icon],i)=>html`
                <${Reveal} key=${title} delay=${i*.05} className="practice bg-sand p-7 md:p-9 min-h-[240px]">
                  <div className="icon-ring w-12 h-12 rounded-full border border-moss/15 grid place-items-center mb-9"><${Icon} size=${21} strokeWidth=${1.3}/></div>
                  <h3 className="font-fraunces text-2xl font-light">${title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-moss/55">${body}</p>
                </${Reveal}>
              `)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-softsand py-40 md:py-64">
          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-[520px] max-w-[90vw] text-clay/25">
            <${Lotus} className="lotus w-full h-auto"/>
          </div>
          <div className="relative max-w-[1100px] mx-auto px-5 md:px-10 text-center">
            <Reveal>
              <p className="eyebrow text-clay mb-7">03 — Your first class</p>
              <h2 className="font-fraunces font-light text-6xl md:text-8xl leading-[.9] tracking-[-.055em]">Begin this evening,</h2>
              <p className="mt-8 text-moss/60 max-w-md mx-auto leading-relaxed">Bring a mat if you have one. Bring your ordinary self either way.</p>
              <a href="https://forms.gle/MVWqfPhytYQZnmih6" target="_blank" rel="noreferrer"
                 className="btn pill inline-flex items-center gap-3 mt-10 bg-moss text-sand px-8 py-4 text-base font-semibold soft-shadow"
                 data-testid="signup-reserve">Reserve your spot <${ArrowUpRight} size=${18}/></a>
              <p className="mt-4 text-xs text-moss/45">Opens a short Google Form — takes under a minute.</p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-moss text-sand py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-5">
              <div className="font-fraunces italic text-4xl">Shilpi</div>
              <p className="mt-3 text-sand/60">Online yoga, taught gently.</p>
            </div>
            <div className="md:col-span-4 text-sm text-sand/60">
              <div>Evening Batch One · 5:00–6:00 PM IST</div>
              <div className="mt-2">Evening Batch Two · 6:00–7:00 PM IST</div>
            </div>
            <div className="md:col-span-3 md:text-right text-xs text-sand/40">
              © 2026 Shilpi Yoga
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
