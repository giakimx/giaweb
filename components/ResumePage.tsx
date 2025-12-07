import React, { useEffect } from 'react';
import { ArrowLeft, Download, Mail, Linkedin, MapPin } from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumePageProps {
  data: PortfolioData;
  onBack: () => void;
}

const ResumePage: React.FC<ResumePageProps> = ({ data, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { personal, experience, education, strengths, tools, socials } = data;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] font-sans selection:bg-orange-500 selection:text-white pb-32">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-neutral-800">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 font-mono-accent text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
        
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 font-mono-accent text-xs uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
        >
          <Download size={14} />
          Print / PDF
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 pb-12 border-b border-neutral-800">
            <div className="flex items-start gap-6">
                <img 
                   src={personal.avatarUrl} 
                   alt={personal.name} 
                   className="w-24 h-24 rounded-full object-cover grayscale border-2 border-neutral-700 hidden md:block"
                />
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif-accent font-medium text-white mb-2">{personal.name}</h1>
                    <h2 className="text-xl text-neutral-400 font-light mb-4">{personal.title} <span className="mx-2 text-neutral-700">|</span> Brand Strategist</h2>
                    <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                        {personal.summary}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-sm font-mono-accent text-neutral-500 min-w-fit">
                <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <span>{personal.location}</span>
                </div>
                <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <span>{personal.email}</span>
                </a>
                <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <span>linkedin.com{socials.find(s => s.platform === 'LinkedIn')?.handle}</span>
                    <ArrowLeft size={10} className="rotate-[135deg]" />
                </a>
            </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Column: Experience */}
            <div className="lg:col-span-8 space-y-16">
                <section>
                    <h3 className="text-2xl font-serif-accent text-white mb-8 flex items-center gap-3">
                        Experience
                        <div className="h-px bg-neutral-800 flex-grow ml-4"></div>
                    </h3>
                    
                    <div className="space-y-12">
                        {experience.map((job) => (
                            <div key={job.id} className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h4 className="text-xl font-medium text-white group-hover:text-orange-400 transition-colors">
                                        {job.company} <span className="text-neutral-500 font-light text-base mx-1">|</span> {job.role}
                                    </h4>
                                    <span className="font-mono-accent text-xs text-neutral-500 uppercase tracking-widest whitespace-nowrap">
                                        {job.period}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono-accent text-neutral-600 uppercase tracking-widest mb-4">
                                    <MapPin size={10} />
                                    {job.location}
                                </div>
                                <ul className="space-y-2">
                                    {job.bullets.map((bullet, i) => (
                                        <li key={i} className="text-neutral-400 text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-600">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar Column: Education, Skills, Tools */}
            <div className="lg:col-span-4 space-y-12">
                
                {/* Education */}
                <section>
                    <h3 className="text-xl font-serif-accent text-white mb-6 border-b border-neutral-800 pb-2">Education</h3>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-6">
                            <h4 className="text-lg font-medium text-white leading-tight mb-1">{edu.school}</h4>
                            <p className="text-xs font-mono-accent text-neutral-500 mb-2">{edu.period} | {edu.location}</p>
                            <p className="text-sm text-neutral-400 mb-2">{edu.degree}</p>
                            {edu.honors.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {edu.honors.map((honor, hIdx) => (
                                        <span key={hIdx} className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                                            + {honor}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-xl font-serif-accent text-white mb-6 border-b border-neutral-800 pb-2">Skills</h3>
                    <div className="space-y-6">
                        {strengths.map((category, idx) => (
                            <div key={idx}>
                                <h4 className="text-xs font-mono-accent text-neutral-500 uppercase tracking-widest mb-2">{category.title}</h4>
                                <ul className="space-y-1">
                                    {category.items.map((skill, sIdx) => (
                                        <li key={sIdx} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">
                                            • {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tools */}
                <section>
                    <h3 className="text-xl font-serif-accent text-white mb-6 border-b border-neutral-800 pb-2">Tools</h3>
                    <div className="space-y-4">
                        {tools.map((category, idx) => (
                            <div key={idx}>
                                <h4 className="text-xs font-mono-accent text-neutral-500 uppercase tracking-widest mb-2">{category.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((tool, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1.5 bg-neutral-800 rounded-md text-xs text-neutral-300 font-mono-accent hover:bg-neutral-700 transition-colors">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>

      </main>
    </div>
  );
};

export default ResumePage;