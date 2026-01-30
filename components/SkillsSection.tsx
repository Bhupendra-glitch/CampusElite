
import React, { useState, useMemo } from 'react';
import { Cpu, Terminal, Book, Monitor, Layout, FileJson, PlayCircle, Loader2, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { generateSkillRoadmap } from '../geminiService';

const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Programming');
  const [activeSkill, setActiveSkill] = useState<{ title: string, category: string } | null>(null);
  const [roadmap, setRoadmap] = useState<{ weeks: { title: string, topics: string[] }[] } | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  const skills = [
    { title: 'Python for DS', icon: Terminal, level: 'Beginner', category: 'Programming', progress: 45 },
    { title: 'Advanced React', icon: Layout, level: 'Intermediate', category: 'Web Dev', progress: 12 },
    { title: 'System Design', icon: Cpu, level: 'Advanced', category: 'Backend', progress: 0 },
    { title: 'SQL Essentials', icon: FileJson, level: 'Beginner', category: 'Database', progress: 88 },
    { title: 'TypeScript Core', icon: Monitor, level: 'Intermediate', category: 'Programming', progress: 60 },
    { title: 'Node.js APIs', icon: Cpu, level: 'Intermediate', category: 'Backend', progress: 25 },
    { title: 'Next.js 14', icon: Layout, level: 'Advanced', category: 'Web Dev', progress: 5 },
  ];

  // Fix: Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    return skills.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const fetchRoadmap = async (skillTitle: string) => {
    setLoadingRoadmap(true);
    setRoadmap(null);
    try {
      const data = await generateSkillRoadmap(skillTitle);
      setRoadmap(data);
    } catch (error) {
      console.error("Failed to fetch roadmap", error);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const handleOpenRoadmap = (skill: any) => {
    setActiveSkill(skill);
    fetchRoadmap(skill.title);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Skill Lab</h1>
          <p className="text-slate-500 dark:text-slate-400">Master the languages and frameworks top tech companies use.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          {['Programming', 'Web Dev', 'Backend', 'Database'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xl' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, i) => (
          <div 
            key={i} 
            onClick={() => handleOpenRoadmap(skill)}
            className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-6 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000">
               <skill.icon size={100} />
            </div>

            <div className="flex justify-between items-start relative z-10">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                <skill.icon size={32} />
              </div>
              <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg shadow-sm ${
                skill.level === 'Beginner' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' : 
                skill.level === 'Intermediate' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800' : 
                'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800'
              }`}>
                {skill.level}
              </span>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">{skill.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Step-by-step curriculum generated by AI for rapid industrial mastery.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>LAB PROGRESS</span>
                <span className="text-indigo-600 dark:text-indigo-400">{skill.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${skill.progress}%` }} 
                />
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-all shadow-xl relative z-10">
              <PlayCircle size={18} /> Continue Lab
            </button>
          </div>
        ))}
        
        {/* Empty State / Coming Soon */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center space-y-4 opacity-70">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-inner">
            <Book className="text-slate-300 dark:text-slate-600" size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-sm">Expanding Syllabus</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-tighter">Web3 & Cybersecurity coming next</p>
          </div>
        </div>
      </div>

      {/* Roadmap Modal Overlay */}
      {activeSkill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setActiveSkill(null)} />
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-white/20 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-600 text-white">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                      <Sparkles size={24} />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black tracking-tight">{activeSkill.title} Roadmap</h2>
                      <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest">AI-Personalized Learning Path</p>
                   </div>
                </div>
                <button onClick={() => setActiveSkill(null)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {loadingRoadmap ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-6">
                    <Loader2 size={48} className="text-indigo-600 animate-spin" />
                    <div className="text-center">
                      <p className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm italic">Curating curriculum from industry standards...</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Gemini 1.5 Flash is thinking</p>
                    </div>
                  </div>
                ) : roadmap ? (
                  <div className="space-y-8">
                    {roadmap.weeks.map((week, idx) => (
                      <div key={idx} className="relative pl-8 border-l-2 border-indigo-100 dark:border-indigo-900/50 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900" />
                        <h4 className="text-lg font-black text-indigo-600 dark:text-indigo-400 mb-4">{week.title}</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {week.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-indigo-300 transition-all">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[10px] font-black text-indigo-600">{tIdx + 1}</div>
                                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{topic}</span>
                               </div>
                               <CheckCircle2 className="text-slate-200 dark:text-slate-700 group-hover:text-green-500 transition-colors" size={20} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                   <ShieldCheck className="text-green-500" size={14} /> Ready to start session
                 </p>
                 <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl transition-all">
                   Begin Week 1
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Helper internal icon for shield check since it wasn't in original skillsSection imports
const ShieldCheck = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} height={size || 24} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default SkillsSection;
