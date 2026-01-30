
import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { CampusEliteAPI } from '../api';

interface CampusUpdate {
  id: string;
  title: string;
  category: 'EXAM' | 'JOB' | 'INTERN' | 'CT';
  date: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  fullContent?: string;
}

const CampusCorner: React.FC = () => {
  const [selectedUpdate, setSelectedUpdate] = useState<CampusUpdate | null>(null);
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await CampusEliteAPI.getWaitlistStatus();
      setWaitlistJoined(status);
    };
    fetchStatus();
  }, []);

  const handleJoinWaitlist = async () => {
    setIsSyncing(true);
    await CampusEliteAPI.joinWaitlist();
    setWaitlistJoined(true);
    setIsSyncing(false);
  };

  const updates: CampusUpdate[] = [
    { 
      id: '1', 
      title: 'End Term Examination Schedule Released', 
      category: 'EXAM', 
      date: 'May 15 - June 02', 
      description: 'The final schedule for the upcoming Spring semester end-terms is now live on the portal.',
      urgency: 'high',
      fullContent: 'The Examination Department has finalized the Spring 2024 End Term schedule. All students are required to clear their dues before May 1st to receive their Admit Cards.'
    },
    { 
      id: '2', 
      title: 'Google STEP Internship 2025', 
      category: 'INTERN', 
      date: 'Apply by Oct 30', 
      description: 'A great opportunity for 1st and 2nd year students to gain experience at Google.',
      urgency: 'medium',
      fullContent: 'STEP is a 12-week internship for first and second-year undergraduate students with a passion for computer science.'
    }
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'EXAM': return <GraduationCap size={20} />;
      case 'JOB': return <Briefcase size={20} />;
      case 'INTERN': return <Briefcase size={20} />;
      case 'CT': return <Clock size={20} />;
      default: return <Megaphone size={20} />;
    }
  };

  const getUrgencyColor = (u: string) => {
    switch (u) {
      case 'high': return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'medium': return 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'low': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Campus Corner</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Stay updated with the latest academic and career news.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {updates.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="p-8 space-y-5">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${getUrgencyColor(item.urgency)} border shadow-sm`}>
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex items-center gap-2">
                  {item.urgency === 'high' && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                      <AlertTriangle size={10} /> Urgent
                    </span>
                  )}
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <Calendar size={14} className="text-indigo-500" /> {item.date}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedUpdate(item)}
                  className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Read Full Update <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => window.open('https://portal.university.edu', '_blank')}
                  className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-white rounded-xl transition-all shadow-sm"
                  title="Official Link"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-indigo-900 to-indigo-950 dark:from-indigo-950 dark:to-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl group border border-indigo-500/10">
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
            <Briefcase size={12} className="text-yellow-400" /> Career Accelerator
          </div>
          <h2 className="text-4xl font-black tracking-tighter leading-none">Internship Readiness Program</h2>
          <p className="text-indigo-100/70 text-lg leading-relaxed font-medium italic">
            "Join our 6-week elite cohort to master the technical and soft skills needed for Tier-1 roles."
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleJoinWaitlist}
              disabled={waitlistJoined || isSyncing}
              className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 ${
                waitlistJoined 
                  ? 'bg-green-500 text-white cursor-default shadow-green-500/20' 
                  : 'bg-white text-indigo-900 hover:scale-105 active:scale-95'
              }`}
            >
              {isSyncing ? <Loader2 size={18} className="animate-spin" /> : (waitlistJoined ? <><CheckCircle2 size={18} /> Joined & Confirmed</> : 'Join Waitlist')}
            </button>
          </div>
        </div>
      </section>

      {/* Modal for updates */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedUpdate(null)} />
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl shadow-lg ${getUrgencyColor(selectedUpdate.urgency)}`}>
                  {getCategoryIcon(selectedUpdate.category)}
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none">{selectedUpdate.title}</h2>
              </div>
              <button onClick={() => setSelectedUpdate(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-400">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-8 text-slate-700 dark:text-slate-300">
              <p className="text-lg font-medium leading-relaxed">{selectedUpdate.description}</p>
              <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />
              <p className="leading-relaxed whitespace-pre-wrap">{selectedUpdate.fullContent}</p>
            </div>
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
              <button onClick={() => setSelectedUpdate(null)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl transition-all">
                Close Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusCorner;
