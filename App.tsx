import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Linkedin, FileText, ChevronRight, ArrowRight, Share2, ExternalLink, ArrowDown } from 'lucide-react';
import { PORTFOLIO_CONTENT, BRAND_LOGOS } from './constants';
import AIChatBot from './components/AIChatBot';
import ProjectPage from './components/ProjectPage';
import ResumePage from './components/ResumePage';
import ThoughtsPage from './components/ThoughtsPage';
import { Job } from './types';

type ViewState = 'home' | 'project' | 'resume' | 'thoughts';

export const App: React.FC = () => {
  const { personal, experience, socials, strengths, tools, funFacts, education, blog } = PORTFOLIO_CONTENT;
  const [view, setView] = useState<ViewState>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Ensure scroll position resets to top when switching to home view
  useEffect(() => {
    if (view === 'home') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setView('project');
  };

  const handleBack = () => {
    setSelectedJob(null);
    setView('home');
  };

  const handleScrollTo = (id: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (view !== 'home') {
      setView('home');
      // Small timeout to allow the home view to render before scrolling
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  const handleFactClick = (index: number) => {
    switch (index) {
      case 1: // EO Studio
        const eoJob = experience.find(j => j.id === 'eo-studio');
        if (eoJob) handleJobClick(eoJob);
        break;
      case 2: // Marks
        const marksJob = experience.find(j => j.id === 'marks');
        if (marksJob) handleJobClick(marksJob);
        break;
      case 4: // Madbunny
        const bunnyJob = experience.find(j => j.id === 'madbunny');
        if (bunnyJob) handleJobClick(bunnyJob);
        break;
      case 5: // Maps
        window.open("https://maps.app.goo.gl/9rnG9W6NSok8NJPG6", "_blank");
        break;
    }
  };

  if (view === 'resume') {
    return <ResumePage data={PORTFOLIO_CONTENT} onBack={handleBack} />;
  }

  if (view === 'thoughts') {
    return <ThoughtsPage blog={blog} onBack={handleBack} />;
  }

  if (view === 'project' && selectedJob) {
    return (
      <ProjectPage 
        job={selectedJob} 
        personal={personal} 
        onBack={handleBack} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-dot-pattern text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-32">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-neutral-100">
        <button onClick={() => setView('home')} className="font-serif-accent text-2xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
          Gia Kim
        </button>
        
        <div className="hidden md:flex items-center gap-10 text-xs font-mono-accent tracking-widest uppercase text-neutral-500">
          <button onClick={() => handleScrollTo('about')} className="hover:text-neutral-900 transition-colors uppercase">About</button>
          <button onClick={() => handleScrollTo('projects')} className="hover:text-neutral-900 transition-colors uppercase">Projects</button>
          <button onClick={() => setView('thoughts')} className="hover:text-neutral-900 transition-colors uppercase">Thoughts</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleScrollTo('connect')}
            className="group hidden sm:flex items-center gap-2 px-5 py-2.5 border border-neutral-200 rounded-full text-xs font-mono-accent uppercase tracking-wide hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
          >
            Contact
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-32">
        
        {/* Hero / Visual Intro Section */}
        <section id="about" className="py-12 md:py-24 overflow-hidden">
           <div className="max-w-4xl mx-auto text-center space-y-12 mb-16 px-6">
             <h1 className="text-3xl md:text-5xl font-serif-accent font-medium leading-snug tracking-tight text-neutral-900">
               Hi - 
               <span className="relative inline-block mx-3 align-bottom">
                 <img 
                   src={personal.avatarUrl} 
                   alt="Me" 
                   className="h-10 w-10 md:h-14 md:w-14 object-cover rounded-md rotate-3 shadow-md hover:rotate-0 transition-transform duration-300" 
                 />
               </span>
               I'm a customer-obsessed growth marketer and brand strategist, bringing creativity and data-driven expertise to projects worldwide.
             </h1>
           </div>

           {/* Infinite Logo Carousel */}
           <div className="relative w-full overflow-hidden mask-linear-gradient">
             <div className="flex w-[200%] animate-marquee hover:paused">
               {/* First Set */}
               <div className="flex w-1/2 justify-around items-center px-4">
                 {BRAND_LOGOS.map((brand, i) => (
                   <div key={`logo-1-${i}`} className="flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 px-8">
                     <img 
                       src={brand.url} 
                       alt={brand.name} 
                       className="h-8 md:h-12 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                       onError={(e) => {
                         (e.target as HTMLImageElement).style.display = 'none';
                         // Fallback to text if image fails
                         ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'block';
                       }}
                     />
                     <span className="hidden text-xl font-serif-accent font-bold mt-2">{brand.name}</span>
                   </div>
                 ))}
               </div>
               {/* Duplicate Set for smooth loop */}
               <div className="flex w-1/2 justify-around items-center px-4">
                 {BRAND_LOGOS.map((brand, i) => (
                   <div key={`logo-2-${i}`} className="flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 px-8">
                     <img 
                       src={brand.url} 
                       alt={brand.name} 
                       className="h-8 md:h-12 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                       onError={(e) => {
                         (e.target as HTMLImageElement).style.display = 'none';
                         ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'block';
                       }}
                     />
                     <span className="hidden text-xl font-serif-accent font-bold mt-2">{brand.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </section>

        {/* Learn More About Me Section (Clean Grid with Dividers) */}
        <section className="py-12 border-t border-neutral-100">
          <div className="mb-12 text-center">
             <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest block mb-2">
               Learn more about me ↓
             </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16">
            {funFacts.map((fact, index) => {
              const isClickable = [1, 2, 4, 5].includes(index);
              return (
                <div 
                  key={index} 
                  onClick={() => isClickable && handleFactClick(index)}
                  className={`
                     flex flex-col gap-2 px-0 md:px-8 relative
                     ${index % 2 !== 0 ? 'md:border-l md:border-neutral-200' : ''} 
                     ${index % 3 !== 0 ? 'lg:border-l lg:border-neutral-200' : 'lg:border-l-0'}
                     ${index === 3 ? 'lg:border-l-0' : ''}
                     ${isClickable ? 'cursor-pointer group' : ''}
                  `}
                >
                   <span className={`font-mono-accent text-[10px] tracking-widest transition-colors duration-300 ${isClickable ? 'text-neutral-300 group-hover:text-orange-500' : 'text-neutral-300'}`}>
                     {(index + 1).toString().padStart(3, '0')}
                   </span>
                   <p className={`text-neutral-600 leading-relaxed text-sm font-light transition-colors duration-300 ${isClickable ? 'group-hover:text-orange-500' : ''}`}>
                     {fact}
                   </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section - Polaroid Grid Layout */}
        <section id="projects">
           <div className="mb-20 border-b border-neutral-200 pb-8 flex items-end justify-between">
             {/* Updated Header Typography to match "Hello!" exactly in size */}
             <h2 className="text-3xl md:text-5xl font-serif-accent font-medium leading-snug tracking-tight text-neutral-900">Projects</h2>
             <span className="hidden md:block font-mono-accent text-xs text-neutral-400 uppercase tracking-widest mb-2">01 - Recent work</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 px-4">
             {experience.map((job, index) => (
               <div 
                 key={index} 
                 onClick={() => handleJobClick(job)}
                 className={`group relative cursor-pointer perspective-1000 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
               >
                 {/* Polaroid Card */}
                 <div className={`
                    bg-white p-4 pb-28 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] 
                    transition-all duration-500 ease-out 
                    hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] 
                    hover:scale-[1.02] hover:-rotate-1
                    ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
                 `}>
                    {/* Image Area - 4:3 Aspect Ratio */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img 
                          src={job.imageUrl} 
                          alt={job.company} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                    </div>

                    {/* Text Area (Visible on Polaroid Margin) */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 flex flex-row justify-between items-center px-6">
                        {/* Left Side: Title + Tags */}
                        <div className="flex flex-col items-start gap-1">
                            <h3 className="font-serif-accent text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 leading-tight">
                                {job.company}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {job.tags?.map((tag, tIdx) => (
                                    <span key={tIdx} className="px-2 py-0.5 border border-neutral-200 bg-neutral-50 rounded text-[10px] font-mono-accent uppercase tracking-wider text-neutral-500">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Role + Period */}
                        <div className="flex flex-col items-end gap-1 text-right">
                             <p className="font-mono-accent text-xs uppercase tracking-widest text-neutral-500">
                                {job.role}
                             </p>
                             <p className="font-mono-accent text-[10px] uppercase tracking-widest text-neutral-400">
                                {job.period}
                             </p>
                        </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Skills & Tools Section (Redesigned to Card Layout) */}
        <section id="skills" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Skills Card */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
               <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest">02 - skills</span>
            </div>
            <div className="flex-1 bg-white rounded-xl border border-neutral-200 p-8 hover:border-neutral-300 transition-all duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg flex flex-col">
               <div className="space-y-6">
                 {strengths.map((category, idx) => (
                    <div key={idx}>
                      {idx > 0 && <div className="h-px bg-neutral-100 my-4" />} {/* Divider */}
                      <h4 className="font-mono-accent text-xs text-neutral-500 uppercase tracking-widest mb-3">{category.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, i) => (
                           <span key={i} className="px-3 py-1.5 border border-neutral-200 rounded text-xs text-neutral-600 font-mono-accent hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all cursor-default">
                              {skill}
                           </span>
                        ))}
                      </div>
                    </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Weapons Card */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
               <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest">03 - weapons</span>
            </div>
            <div className="flex-1 bg-white rounded-xl border border-neutral-200 p-8 hover:border-neutral-300 transition-all duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg flex flex-col">
                <div className="space-y-6">
                  {tools.map((category, idx) => (
                    <div key={idx}>
                      {idx > 0 && <div className="h-px bg-neutral-100 my-4" />} {/* Divider */}
                      <h4 className="font-mono-accent text-xs text-neutral-500 uppercase tracking-widest mb-3">{category.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((tool, i) => (
                          <span key={i} className="px-3 py-1.5 border border-neutral-200 rounded text-xs text-neutral-600 font-mono-accent hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all cursor-default">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>

        </section>

        {/* Bento Grid: AI & Contact Points */}
        <section id="connect" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* AI Card */}
          <div className="lg:col-span-7">
            <div className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest">04 - G(ia)PT</span>
              </div>
              <AIChatBot embedded={true} />
            </div>
          </div>

          {/* Contact Points Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-4">
                <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest">05 - connect</span>
            </div>
            <div className="flex-1 bg-neutral-900 text-white rounded-xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group">
               {/* Abstract decorative gradient blob */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-400 to-pink-600 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-700"></div>

               <div>
                  <div className="w-12 h-12 border border-neutral-700 rounded-lg flex items-center justify-center mb-8 text-neutral-400">
                    <Share2 size={20} />
                  </div>
                  <h3 className="font-serif-accent text-3xl mb-2">Connect</h3>
                  <p className="text-neutral-400 text-lg font-light">Find me ↓</p>
               </div>
               
               <div className="mt-12 space-y-4">
                  {socials.map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-all group/link"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{social.platform}</span>
                        <span className="text-xs font-mono-accent text-neutral-400">{social.handle}</span>
                      </div>
                      <ExternalLink size={16} className="text-neutral-500 group-hover/link:text-white transition-colors" />
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-500 text-sm font-mono-accent">
          <div className="flex flex-col md:flex-row gap-8 items-center">
             <span className="text-neutral-900 font-semibold">Gia Kim</span>
             <span>© 2026</span>
          </div>
          <div className="flex gap-8 uppercase tracking-wider text-xs">
            <button onClick={() => setView('resume')} className="hover:text-neutral-900 hover:underline decoration-neutral-900 underline-offset-4 uppercase">Resume</button>
          </div>
        </footer>

      </main>
    </div>
  );
};