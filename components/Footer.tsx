
import React from 'react';
import { Twitter, Github, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20 relative z-10">
        <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center font-mono text-xs font-bold">N</div>
                <span className="font-bold text-lg tracking-tight">NSD-CORE</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs mb-6">
                Engineered for high-fidelity narrative and visual synthesis. 
                Redefining the interaction between prompt and output.
            </p>
            <div className="flex gap-4">
                <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                <SocialIcon icon={<Github className="w-4 h-4" />} />
                <SocialIcon icon={<Disc className="w-4 h-4" />} />
            </div>
        </div>
        
        <FooterColumn title="Product" links={['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap']} />
        <FooterColumn title="Company" links={['Our Team', 'Our Values', 'Blog', 'Careers']} />
        <FooterColumn title="Resources" links={['Downloads', 'Documentation', 'Contact', 'Community']} />
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 relative z-10">
        <p>© 2024 NSD-CORE LLC. All rights reserved.</p>
        <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Conditions</a>
        </div>
      </div>

      {/* Animated Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 w-full overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent w-[200%] animate-wave"></div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
    <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-white">{title}</h4>
        <nav className="flex flex-col gap-3">
            {links.map(link => (
                <a key={link} href="#" className="text-sm text-white/50 hover:text-violet-400 transition-colors">
                    {link}
                </a>
            ))}
        </nav>
    </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
        {icon}
    </a>
);
