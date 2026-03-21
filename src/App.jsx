import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, Activity, Calendar, Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
          className: 'bg-background/80 backdrop-blur-xl border-textDark/10 text-primary',
          targets: navRef.current,
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, { backgroundColor: 'transparent', color: '#FAF8F5', border: '1px solid transparent' });
        },
        onEnter: () => {
          gsap.to(navRef.current, { backgroundColor: 'rgba(250, 248, 245, 0.9)', color: '#0D0D12', border: '1px solid rgba(42, 42, 53, 0.1)' });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav ref={navRef} className="flex justify-between items-center py-4 px-8 rounded-[2rem] text-background border border-transparent transition-all duration-500">
        <div className="font-heading font-bold tracking-tight text-lg">RUSLAN ZINEVYCH</div>
        <div className="hidden md:flex gap-8 font-heading text-sm font-medium">
          <a href="#repertoire" className="hover-lift">Repertoire</a>
          <a href="#pedagogy" className="hover-lift">Pedagogy</a>
          <a href="#philosophy" className="hover-lift">Philosophy</a>
        </div>
        <button className="magnetic-btn bg-accent text-background px-6 py-2 rounded-full font-medium text-sm">
          Book Masterclass
        </button>
      </nav>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary rounded-b-[3rem]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/video-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
        <div className="max-w-4xl">
          <h1 className="hero-text text-background font-heading font-bold text-4xl md:text-5xl leading-tight mb-2 tracking-tight">
            Vocal mastery meets
          </h1>
          <h2 className="hero-text text-accent font-drama italic text-6xl md:text-8xl leading-none mb-8 pr-4">
            Emotive Power.
          </h2>
          <div className="hero-text flex gap-4">
            <button className="magnetic-btn bg-accent text-background px-8 py-4 rounded-full font-heading font-medium flex items-center gap-2 text-lg">
              <Play size={20} fill="currentColor" /> Watch Repertoire
            </button>
            <button className="magnetic-btn border border-background/20 text-background backdrop-blur-md px-8 py-4 rounded-full font-heading font-medium text-lg">
              About the Maestro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const container = useRef(null);
  
  // Card 1: Diagnostic Shuffler (Vocal Mastery)
  const [cards, setCards] = useState([
    "La Bohème - Rodolfo",
    "Tosca - Cavaradossi",
    "Un Ballo in Maschera"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2: Telemetry Typewriter (Pedagogy)
  const [text, setText] = useState("");
  const fullText = "> Analyzing breath control...\n> Optimizing vocal resonance...\n> Transmitting foundational technique...";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => { i = 0; setText(""); }, 5000);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  return (
    <section id="pedagogy" ref={container} className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-background border border-textDark/10 rounded-[2rem] p-8 shadow-xl shadow-primary/5 h-96 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-accent" />
            <span className="font-heading font-bold text-sm tracking-wider uppercase">Stage Presence</span>
          </div>
          <div className="relative flex-1">
            {cards.map((card, i) => (
              <div 
                key={card}
                className="absolute w-full p-4 rounded-xl bg-primary text-background font-drama italic text-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-accent/20"
                style={{
                  top: `${i * 20}px`,
                  scale: 1 - (i * 0.05),
                  opacity: 1 - (i * 0.2),
                  zIndex: 3 - i
                }}
              >
                {card}
              </div>
            ))}
          </div>
          <p className="font-heading text-sm text-textDark/70 mt-4 leading-relaxed">
            Performing iconic tenor roles with precision and unparalleled emotional depth across elite international stages.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-primary border border-accent/20 rounded-[2rem] p-8 shadow-xl shadow-primary/10 h-96 flex flex-col text-background relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <Activity className="text-accent" />
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-accent">Pedagogy Feed</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse ml-auto" />
          </div>
          <div className="font-data text-sm flex-1 whitespace-pre-line text-background/80 relative z-10">
            {text}<span className="inline-block w-2 h-4 bg-accent animate-pulse align-middle ml-1" />
          </div>
          <p className="font-heading text-sm text-background/60 mt-4 leading-relaxed relative z-10">
            Guiding the next generation of voices via Masterclasses at Odesa National Music Academy and worldwide.
          </p>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
        </div>

        {/* Card 3 */}
        <div className="bg-background border border-textDark/10 rounded-[2rem] p-8 shadow-xl shadow-primary/5 h-96 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-accent" />
            <span className="font-heading font-bold text-sm tracking-wider uppercase">Masterclass Schedule</span>
          </div>
          <div className="flex-1 grid grid-cols-7 gap-1 px-2">
            {['S','M','T','W','T','F','S'].map((d,i) => (
              <div key={i} className="text-center font-data text-xs text-textDark/40">{d}</div>
            ))}
            {Array.from({length: 14}).map((_, i) => (
              <div key={i} className={`aspect-square rounded-md flex items-center justify-center font-data text-xs ${i === 4 || i === 9 ? 'bg-accent/20 text-accent font-bold ring-1 ring-accent/50' : 'bg-textDark/5'}`}>
                {i + 1}
              </div>
            ))}
          </div>
          <p className="font-heading text-sm text-textDark/70 mt-4 leading-relaxed">
            Reserve highly sought-after vocal coaching sessions tailored for professional development.
          </p>
        </div>

      </div>
    </section>
  );
};

const Philosophy = () => {
  const philRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line-1', {
        scrollTrigger: { trigger: philRef.current, start: 'top 70%' },
        opacity: 0, y: 20, duration: 1
      });
      gsap.from('.phil-line-2', {
        scrollTrigger: { trigger: philRef.current, start: 'top 50%' },
        opacity: 0, y: 30, duration: 1.5, ease: 'power3.out'
      });
    }, philRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={philRef} className="relative py-32 px-8 md:px-16 bg-primary overflow-hidden rounded-[3rem] my-12 mx-4 max-w-[100vw]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579781354186-012d7e850ad7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="phil-line-1 font-heading text-background/60 text-lg md:text-xl mb-6">
          Most vocal instruction focuses on: superficial sound production.
        </p>
        <p className="phil-line-2 font-heading font-bold text-background text-3xl md:text-5xl leading-tight">
          We focus on: <span className="font-drama italic text-accent font-normal tracking-wide text-5xl md:text-7xl">Organic Resonance.</span>
        </p>
      </div>
    </section>
  );
};

const Protocol = () => {
  const protoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proto-card');
      
      cards.forEach((card, i) => {
        if(i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            }
          });
        }
      });
    }, protoRef);
    return () => ctx.revert();
  }, []);

  const videos = [
    { title: "La Bohème - Rodolfo", desc: "Giacomo Puccini", src: "/videos/video-1.mp4" },
    { title: "Tosca - Cavaradossi", desc: "Giacomo Puccini", src: "/videos/video-2.mp4" },
    { title: "Tosca - Act 3 Duet", desc: "Giacomo Puccini", src: "/videos/video-3.mp4" }
  ];

  return (
    <section id="repertoire" ref={protoRef} className="py-24 px-8 md:px-16 relative">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">Live Repertoire Archive</h2>
        <p className="font-data text-textDark/60 mt-4 text-sm uppercase tracking-widest">Selected Performances</p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {videos.map((vid, i) => (
          <div key={i} className="proto-card sticky top-32 h-[70vh] w-full mb-12 bg-primary rounded-[3rem] overflow-hidden shadow-2xl origin-top flex flex-col md:flex-row shadow-primary/20">
            <div className="p-12 md:w-1/3 flex flex-col justify-center border-r border-textDark/20 bg-primary z-10">
              <span className="font-data text-accent mb-4">OPUS 0{i+1}</span>
              <h3 className="font-drama italic text-4xl text-background mb-4">{vid.title}</h3>
              <p className="font-heading text-background/60">{vid.desc}</p>
              <button className="mt-8 magnetic-btn w-fit text-accent font-heading font-medium flex items-center gap-2 group">
                Watch Full <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="md:w-2/3 h-full relative bg-black">
              <video 
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop"
              >
                <source src={vid.src} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 px-8 md:px-16 mt-24 rounded-t-[4rem] text-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <h3 className="font-heading font-bold text-2xl tracking-tight mb-2">RUSLAN ZINEVYCH</h3>
          <p className="font-drama italic py-2 text-xl text-accent">Tenor & Vocal Pedagogue</p>
          <div className="mt-8 flex items-center gap-3 font-data text-xs text-background/60 bg-textDark/20 w-fit px-4 py-2 rounded-full border border-textDark/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>SYSTEM OPERATIONAL</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-6 text-background/80">Navigation</h4>
          <ul className="space-y-4 font-heading text-sm text-background/50">
            <li><a href="#repertoire" className="hover:text-accent transition-colors">Repertoire</a></li>
            <li><a href="#pedagogy" className="hover:text-accent transition-colors">Pedagogy</a></li>
            <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-6 text-background/80">Contact</h4>
          <ul className="space-y-4 font-heading text-sm text-background/50">
            <li><a href="#" className="hover:text-accent transition-colors">Masterclass Inquiry</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Press & Management</a></li>
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Instagram <ExternalLink size={14} /></a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-textDark/30 text-center md:text-left text-sm text-background/40 font-heading">
        © {new Date().getFullYear()} Ruslan Zinevych. All rights reserved.
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
      <svg className="noise-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Footer />
    </div>
  );
}

export default App;
