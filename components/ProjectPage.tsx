import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { Job, PortfolioData } from '../types';

interface ProjectPageProps {
  job: Job;
  personal: PortfolioData['personal'];
  onBack: () => void;
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

const ProjectPage: React.FC<ProjectPageProps> = ({ job, personal, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const embedUrl = job.videoUrl ? getYouTubeEmbedUrl(job.videoUrl) : null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-32">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-neutral-100">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 font-mono-accent text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
        
        <div className="font-serif-accent text-lg font-semibold tracking-tight">
          {personal.name}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20">
        
        {/* Header */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
            <div>
              {/* Removed "Case Study" label */}
              
              <h1 className="text-5xl md:text-7xl font-serif-accent text-neutral-900 mb-4 leading-[1.1]">
                {job.role}
              </h1>
              
              {/* Updated Company Typography and made it smaller + clickable link */}
              <h2 className="text-xl md:text-2xl text-neutral-400 font-light flex flex-wrap items-center gap-2 font-mono-accent uppercase tracking-wide">
                <a 
                  href={job.link || '#'} 
                  target={job.link ? "_blank" : "_self"} 
                  rel="noreferrer"
                  className={job.link ? "hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-2" : "cursor-default"}
                >
                  @ {job.company}
                  {job.link && <ArrowUpRight size={18} />}
                </a>

                {job.id === 'eo-studio' && (
                  <>
                    <span className="text-neutral-300 mx-1">|</span>
                    <a 
                      href="https://www.eoschool.io/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      EO School
                      <ArrowUpRight size={18} />
                    </a>
                  </>
                )}
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[200px] border-l border-neutral-200 pl-6">
               <div>
                  <div className="flex items-center gap-2 text-neutral-400 mb-1">
                    <Calendar size={14} />
                    <span className="text-xs font-mono-accent uppercase tracking-wider">Timeline</span>
                  </div>
                  <div className="text-sm font-medium">{job.period}</div>
               </div>
               <div>
                  <div className="flex items-center gap-2 text-neutral-400 mb-1">
                    <MapPin size={14} />
                    <span className="text-xs font-mono-accent uppercase tracking-wider">Location</span>
                  </div>
                  <div className="text-sm font-medium">{job.location}</div>
               </div>
            </div>
          </div>
        </header>

        {/* Content - Flattened Layout */}
        <div className="space-y-12">
            <div>
                <h3 className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest mb-6">
                    Key Responsibilities
                </h3>
                
                {/* Full width leading summary - Increased size from text-sm to text-xl */}
                <div className="prose prose-lg prose-neutral max-w-none mb-12">
                    <p className="text-xl leading-relaxed font-light text-neutral-600">
                        {job.summary || "Leading growth initiatives and driving measurable impact through strategic marketing and product experimentation."}
                    </p>
                </div>

                {/* Video Embed if available */}
                {embedUrl && (
                   <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-neutral-100 bg-neutral-900 aspect-video">
                     <iframe
                       width="100%"
                       height="100%"
                       src={embedUrl}
                       title="Project Video"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                   </div>
                )}

                {/* Full width Achievements Box */}
                <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                    <h4 className="font-mono-accent text-base mb-6 text-neutral-900 uppercase tracking-wide">Impact</h4>
                    <ul className="space-y-6">
                        {job.bullets.map((bullet, index) => (
                            <li key={index} className="flex items-start gap-4 text-neutral-700 leading-relaxed">
                                <span className="font-mono-accent text-orange-500 font-bold text-sm mt-1.5">0{index + 1}</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Footer for Project Page */}
        <div className="mt-32 pt-12 border-t border-neutral-100 flex justify-between items-center">
             <button onClick={onBack} className="text-sm font-medium hover:text-orange-500 transition-colors flex items-center gap-2">
                <ArrowLeft size={16} /> Previous Project
             </button>
        </div>

      </main>
    </div>
  );
};

export default ProjectPage;