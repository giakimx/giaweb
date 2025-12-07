export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  link?: string;
  imageUrl: string;
  bullets: string[];
  tags?: string[];
  summary?: string;
  videoUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface Education {
  school: string;
  period: string;
  location: string;
  degree: string;
  honors: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
}

export interface ToolCategory {
  title: string;
  items: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    linkedin: string;
    linkedinUrl: string;
    summary: string;
    avatarUrl: string;
    locationImg: string;
  };
  experience: Job[];
  education: Education[];
  socials: SocialLink[];
  strengths: ToolCategory[];
  tools: ToolCategory[];
  funFacts: string[];
  blog: BlogPost[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}