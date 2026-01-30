
import React from 'react';
import { Trophy, ArrowRight, Zap, ShieldCheck, Users, Code, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister, isDarkMode, onToggleTheme }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500 text-slate-900 dark:text-white">
      {/* Theme Toggle for Landing */}
      <button 
        onClick={onToggleTheme}
        className="fixed top-8 right-8 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 text-slate-500 dark:text-slate-400 hover:scale-110 transition-transform"
      >
        {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
      </button>

      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-16 relative z-10 text-center">
        {/* Hero Section */}
        <div className="space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={14} className="animate-pulse" /> The Future of Campus Learning
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
            Level Up Your <span className="text-indigo-600">College Journey.</span>
          </h1>
          
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Personalized exam prep, daily DSA challenges, and professional networking. Powered by Gemini AI for the next generation of engineers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={onRegister}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              Login
            </button>
          </div>
        </div>

        {/* Feature Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          {[
            { title: 'AI Exam Prep', desc: 'Auto-generated PYQs for CTs and End Terms based on your syllabus.', icon: BookOpen, color: 'text-blue-500' },
            { title: 'Daily DSA', desc: 'Solve high-yield algorithmic problems curated by Gemini AI.', icon: Code, color: 'text-purple-500' },
            { title: 'Campus Connect', desc: 'Find study partners and collaborate on elite-level projects.', icon: Users, color: 'text-orange-500' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-4 hover:border-indigo-500 transition-colors">
              <feature.icon className={feature.color} size={32} />
              <h3 className="text-xl font-black text-slate-800 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Brand */}
        <div className="flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <Trophy size={20} className="text-yellow-500" />
          <span className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">CampusElite Ecosystem</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
