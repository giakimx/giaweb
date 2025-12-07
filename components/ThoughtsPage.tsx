import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Hash, ChevronRight } from 'lucide-react';
import { PortfolioData, BlogPost } from '../types';

interface ThoughtsPageProps {
  blog: PortfolioData['blog'];
  onBack: () => void;
}

const ThoughtsPage: React.FC<ThoughtsPageProps> = ({ blog, onBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  const parseInline = (text: string) => {
    // Split by bold (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const content = part.slice(2, -2);
            // Handle nested italics (_text_)
            return (
                <strong key={i} className="font-semibold text-neutral-900">
                    {content.split(/(_.*?_)/g).map((sub, j) => {
                        if (sub.startsWith('_') && sub.endsWith('_')) {
                            return <em key={j} className="italic">{sub.slice(1, -1)}</em>;
                        }
                        return sub;
                    })}
                </strong>
            );
        }
        // Handle italics outside bold
        return (
            <React.Fragment key={i}>
                {part.split(/(_.*?_)/g).map((sub, j) => {
                    if (sub.startsWith('_') && sub.endsWith('_')) {
                        return <em key={j} className="italic">{sub.slice(1, -1)}</em>;
                    }
                    return sub;
                })}
            </React.Fragment>
        );
    });
  };

  const renderBlock = (block: string, index: number) => {
    // Headers (## Title)
    if (block.startsWith('## ')) {
        return <h3 key={index} className="text-2xl font-serif-accent font-medium mt-12 mb-6 text-neutral-900">{block.replace('## ', '')}</h3>;
    }
    // Images (![alt](url))
    const imageMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
        return (
            <figure key={index} className="my-10">
                <img 
                    src={imageMatch[2]} 
                    alt={imageMatch[1]} 
                    className="w-full h-auto rounded-lg border border-neutral-100 shadow-sm"
                />
                {imageMatch[1] && (
                    <figcaption className="text-center text-xs text-neutral-400 mt-3 font-mono-accent uppercase tracking-wider">
                        {imageMatch[1]}
                    </figcaption>
                )}
            </figure>
        );
    }
    // Horizontal Rule (---)
    if (block === '---') {
        return <hr key={index} className="my-12 border-neutral-200" />;
    }
    // List Items (- Item)
    if (block.startsWith('- ')) {
        return (
            <div key={index} className="flex gap-3 mb-3 ml-4 text-neutral-700 font-light leading-relaxed">
                <span className="text-orange-500">•</span>
                <span>{parseInline(block.replace('- ', ''))}</span>
            </div>
        );
    }
    // Standard Paragraph
    return (
        <p key={index} className="mb-6 text-neutral-700 leading-relaxed font-light">
            {parseInline(block)}
        </p>
    );
  };

  // Individual Post View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-32">
        <nav className="max-w-4xl mx-auto px-6 py-8 flex items-center sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
          <button 
            onClick={() => setSelectedPost(null)}
            className="group flex items-center gap-2 font-mono-accent text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Thoughts
          </button>
        </nav>

        <main className="max-w-3xl mx-auto px-6 pt-16">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6 font-mono-accent text-xs text-neutral-400 uppercase tracking-wider">
               <span className="text-orange-500 font-medium">{selectedPost.category}</span>
               <span>•</span>
               <span>{selectedPost.date}</span>
               <span>•</span>
               <span>Gia Kim</span>
               <span>•</span>
               <span>{selectedPost.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif-accent font-medium leading-tight text-neutral-900 mb-8">
              {selectedPost.title}
            </h1>
            <p className="text-xl text-neutral-500 font-light leading-relaxed border-l-2 border-orange-500 pl-6 italic">
              {selectedPost.excerpt}
            </p>
          </header>

          <article className="prose prose-neutral prose-lg max-w-none">
            {selectedPost.content.map((block, idx) => renderBlock(block, idx))}
          </article>

          <div className="mt-20 pt-10 border-t border-neutral-100">
             <h3 className="font-serif-accent text-2xl mb-6">More Thoughts</h3>
             <div className="grid gap-6">
                {blog.filter(p => p.id !== selectedPost.id).length > 0 ? (
                  blog.filter(p => p.id !== selectedPost.id).map(post => (
                    <button 
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="text-left group block"
                    >
                        <h4 className="text-lg font-medium group-hover:text-orange-500 transition-colors">{post.title}</h4>
                        <span className="text-xs text-neutral-400 font-mono-accent">{post.date}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-neutral-400 font-light">More articles coming soon.</p>
                )}
             </div>
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-32">
      <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-sm border-b border-neutral-200">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 font-mono-accent text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
        
        {/* Removed header title as requested */}
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16">
        <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-serif-accent font-medium mb-6">Growth In Action (GIA)</h1>
            <p className="text-neutral-500 font-light text-lg">
                A log of the chaotic beauty behind experiments and the zero-to-one startup journey.
            </p>
        </div>

        <div className="space-y-4">
            {blog.map((post, index) => (
                <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-white p-8 rounded-xl border border-neutral-200 hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 text-xs font-mono-accent uppercase tracking-widest">
                            <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded">{post.category}</span>
                            <span className="text-neutral-400">{post.date}</span>
                        </div>
                        <h2 className="text-2xl font-serif-accent font-medium mb-3 group-hover:text-orange-600 transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-neutral-500 font-light leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-400 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                        Read Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ThoughtsPage;