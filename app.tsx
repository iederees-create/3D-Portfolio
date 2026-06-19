import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, useScroll, useTransform, motionValue, useMotionValue } from 'framer-motion';

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

export const ContactButton = () => {
  return (
    <button 
      className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest transition-transform duration-200 active:scale-95"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      Contact Me
    </button>
  );
};

export const LiveProjectButton = ({ url }: { url?: string }) => {
  return (
    <a 
      href={url || "#"} 
      target="_blank" 
      rel="noreferrer"
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 inline-block text-center"
    >
      Live Project
    </a>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  x = 0, 
  y = 30, 
  as = 'div', 
  className = '' 
}: FadeInProps) => {
  const Component = motion.create(as);
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </Component>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = ""
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Find centers
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    // Distances
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    
    // Edge bounds activation check with padding allowance
    if (
      e.clientX >= rect.left - padding &&
      e.clientX <= rect.right + padding &&
      e.clientY >= rect.top - padding &&
      e.clientY <= rect.bottom + padding
    ) {
      setTransition(activeTransition);
      setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0px)`);
    } else {
      setTransition(inactiveTransition);
      setTransform("translate3d(0px, 0px, 0px)");
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ transform, transition, willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

export const AnimatedText = ({ text }: { text: string }) => {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const words = text.split("");

  return (
    <p 
      ref={targetRef} 
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] select-none flex flex-wrap justify-center"
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((char, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        // Track opacity mapping for each character sequentially
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <span key={i} className="relative inline-block">
            <span className="opacity-0">{char === " " ? "\u00A0" : char}</span>
            <motion.span style={{ opacity }} className="absolute left-0 top-0">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};


// ==========================================
// CORE SECTIONS
// ==========================================

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-between relative overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-20">
        <div className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] space-x-4 md:space-x-8 flex justify-between w-full">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#price" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </div>
      </FadeIn>

      {/* Main Portrait Wrapped Dynamically */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30} duration={0.8}>
          <Magnet padding={150} strength={3}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
              alt="Jack Portrait" 
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.15} y={40}>
          <h1 
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
            style={{ fontSize: 'clamp(14vw, 16vw, 17.5vw)' }}
          >
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Layout Row */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p 
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gifs = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
  ];

  const row1 = gifs.slice(0, 11);
  const row2 = gifs.slice(11);

  // Triple elements for absolute layout wrapping seamless coverage
  const triRow1 = [...row1, ...row1, ...row1];
  const triRow2 = [...row2, ...row2, ...row2];

  const sectionTop = sectionRef.current?.offsetTop || 0;
  const offset = (scrollY - sectionTop + window.innerHeight) * 0.3;

  const xRow1 = offset - 200;
  const xRow2 = -(offset - 200);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full">
      {/* Row 1 */}
      <div 
        className="flex gap-3 mb-3 transition-transform duration-75 ease-out" 
        style={{ transform: `translateX(${xRow1}px)`, willChange: 'transform' }}
      >
        {triRow1.map((url, idx) => (
          <img 
            key={`r1-${idx}`} 
            src={url} 
            alt="Showcase Visual" 
            loading="lazy"
            className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
          />
        ))}
      </div>

      {/* Row 2 */}
      <div 
        className="flex gap-3 transition-transform duration-75 ease-out" 
        style={{ transform: `translateX(${xRow2}px)`, willChange: 'transform' }}
      >
        {triRow2.map((url, idx) => (
          <img 
            key={`r2-${idx}`} 
            src={url} 
            alt="Showcase Visual" 
            loading="lazy"
            className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen bg-[#0C0C0C] w-full relative flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      
      {/* Corner Structural Assets */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-10">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon Asset" className="w-full h-auto" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] z-10">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D Geometry" className="w-full h-auto" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-10">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego Asset" className="w-full h-auto" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] z-10">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D Elements" className="w-full h-auto" />
      </FadeIn>

      {/* Main Structural Layout Elements */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-20 w-full max-w-4xl">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full">
          <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const serviceItems = [
    { num: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
    { num: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
    { num: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
    { num: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
    { num: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." }
  ];

  return (
    <section className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 w-full">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Services
        </h2>

        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {serviceItems.map((item, idx) => (
            <FadeIn delay={idx * 0.1} key={idx} className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10">
              <div className="font-black leading-none min-w-[120px]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {item.num}
              </div>
              <div className="flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="font-medium uppercase mb-2" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                    {item.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  project: {
    num: string;
    title: string;
    category: string;
    images: string[];
    url: string;
  };
  index: number;
  totalCards: number;
  progress: any;
}

const ProjectCard = ({ project, index, totalCards, progress }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stacking target calculations bounded strictly via inputs
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const outputRange = [1, targetScale];
  
  const scale = useTransform(
    progress, 
    [index / totalCards, (index + 1) / totalCards], 
    outputRange
  );

  return (
    <div 
      ref={containerRef} 
      className="sticky w-full h-[85vh] flex justify-center items-center" 
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div 
        style={{ scale }}
        className="w-full bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Card Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">{project.category}</span>
              <h3 className="font-medium text-[#D7E2EA] uppercase text-base sm:text-xl md:text-2xl">{project.title}</h3>
            </div>
          </div>
          <LiveProjectButton url={project.url} />
        </div>

        {/* Dynamic Multi-Column Image Grid */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 mt-4 overflow-hidden items-stretch">
          {/* Left Split Column */}
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 justify-between h-full">
            <div className="w-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] flex-1 max-h-[230px]">
              <img src={project.images[0]} alt="Project Detail Left Top" className="w-full h-full object-cover" />
            </div>
            <div className="w-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] flex-1 max-h-[340px]">
              <img src={project.images[1]} alt="Project Detail Left Bottom" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Right Tall Hero Visual */}
          <div className="col-span-6 w-full h-full overflow-hidden rounded-[30px] sm:rounded-[45px] md:rounded-[60px]">
            <img src={project.images[2]} alt="Project Primary Full View" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Structural mapping connecting provided git links to standard mock image components
  const dynamicProjects = [
    {
      num: "01",
      title: "Nextlevel Studio",
      category: "Client Project",
      url: "https://github.com/iederees-create/summit-painting-ct-ct.git",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
      ]
    },
    {
      num: "02",
      title: "Aura Brand Identity",
      category: "Personal Showcase",
      url: "https://github.com/iederees-create/amore-nails-ct.git",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
      ]
    },
    {
      num: "03",
      title: "Solaris Digital",
      category: "Client System",
      url: "https://github.com/iederees-create/pixel-perfect-hair.git",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 pb-32"
    >
      <div className="max-w-5xl mx-auto pt-20">
        <h2 className="hero-heading font-black uppercase tracking-tight text-center mb-10" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Project
        </h2>

        {/* Dynamic Card Pin Engine */}
        <div className="relative flex flex-col gap-0">
          {dynamicProjects.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              index={idx} 
              totalCards={dynamicProjects.length} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ENTRY WRAPPER
// ==========================================

export default function App() {
  return (
    <main className="bg-[#0C0C0C] w-full min-h-screen relative overflow-x-clip text-white select-none">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
