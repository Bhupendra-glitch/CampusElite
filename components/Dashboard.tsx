
import React, { useMemo } from 'react';
import { AppView, QuizResult, SmartNotification, UserProfileData } from '../types';
import { 
  Trophy, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Code, 
  Users,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';

interface DashboardProps {
  setView: (view: AppView) => void;
  history: QuizResult[];
  notifications: SmartNotification[];
  userProfile: UserProfileData;
  totalXPOverride?: number; // Added to support generic XP awards
}

const Dashboard: React.FC<DashboardProps> = ({ setView, history, notifications, userProfile, totalXPOverride }) => {
  // 1. Calculate Average Accuracy
  const avgAccuracy = useMemo(() => {
    if (history.length === 0) return 0;
    const totalScorePercent = history.reduce((acc, curr) => acc + (curr.score / curr.total), 0);
    return Math.round((totalScorePercent / history.length) * 100);
  }, [history]);

  // 2. Calculate Gamified XP
  const totalXP = useMemo(() => {
    if (totalXPOverride !== undefined) return totalXPOverride;
    const baseXP = history.length * 100;
    const bonusXP = history.filter(h => h.score === h.total && h.total > 0).length * 50;
    return 450 + baseXP + bonusXP; 
  }, [history, totalXPOverride]);

  // 3. Calculate Proper Streak
  const streak = useMemo(() => {
    if (history.length === 0) return 0;
    
    // Get unique dates from history, sorted newest to oldest
    const uniqueDates: string[] = Array.from<string>(new Set(history.map(h => h.date))).sort((a: string, b: string) => 
      new Date(b).getTime() - new Date(a).getTime()
    );

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let checkDate = new Date(today);

    // Check if the most recent activity was today or yesterday
    const latestDateStr = uniqueDates[0] as string;
    const latestDate = new Date(latestDateStr);
    latestDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - latestDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) return 0; // Streak broken

    // Iterate through unique dates and check if they are consecutive
    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i] as string);
      date.setHours(0, 0, 0, 0);

      // If this date matches our current check date, increment streak and move back one day
      if (date.getTime() === checkDate.getTime()) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (date.getTime() < checkDate.getTime()) {
        break;
      }
    }
    
    return currentStreak;
  }, [history]);

  const unreadNotifs = notifications.filter(n => !n.isRead).slice(0, 2);

  const getScoreRank = (score: number, total: number) => {
    const percentage = score / total;
    if (percentage === 1) return { label: 'S-Rank', color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' };
    if (percentage >= 0.8) return { label: 'A-Rank', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' };
    if (percentage >= 0.6) return { label: 'B-Rank', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' };
    return { label: 'C-Rank', color: 'text-slate-500 bg-slate-50 dark:bg-slate-800' };
  };

  const firstName = userProfile.fullName.split(' ')[0] || 'Student';

  return (
    <div className="space-y-8 pb-10">
      {/* Alert Banner for CTs */}
      {unreadNotifs.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl flex items-center justify-between animate-in zoom-in duration-300">
          <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-sm font-medium"><strong>Priority:</strong> {unreadNotifs[0].message}</p>
          </div>
          <button 
            onClick={() => setView(AppView.EXAM_PREP)}
            className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase tracking-widest border-b border-amber-400"
          >
            Study Now
          </button>
        </div>
      )}

      {/* Hero Welcome */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-5xl font-black tracking-tight leading-[1.1]">Dominate Your <span className="text-yellow-400">Class Tests.</span></h1>
            <p className="text-indigo-100 text-lg font-medium">
              AI-generated PYQs, automated study notes, and real-time peer matching. {firstName}, your journey to the top starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setView(AppView.EXAM_PREP)}
                className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-50 hover:shadow-2xl transition-all active:scale-95"
              >
                Launch Prep <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setView(AppView.NOTES_GEN)}
                className="bg-indigo-500/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500/50 transition-all"
              >
                Generate Notes
              </button>
            </div>
          </div>
          <div className="hidden lg:block shrink-0">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
               <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-indigo-900 shadow-xl">
                    <Trophy size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Global Rank</p>
                    <p className="text-3xl font-black tracking-tighter">#14 Elite</p>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-white/80">
                    <span>XP PROGRESS</span>
                    <span>{totalXP % 1000} / 1000</span>
                  </div>
                  <div className="w-56 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(totalXP % 1000) / 10}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-white/50 text-center uppercase tracking-widest">Level {Math.floor(totalXP / 1000) + 1} Specialist</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Accuracy', value: `${avgAccuracy}%`, icon: Target, color: 'blue' },
          { label: 'Total XP', value: totalXP.toLocaleString(), icon: Trophy, color: 'amber' },
          { label: 'Study Streak', value: `${streak} Days`, icon: Zap, color: 'purple' },
          { label: 'Tests Done', value: history.length, icon: BookOpen, color: 'emerald' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className={`w-14 h-14 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-2xl flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 shrink-0 shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest truncate">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Clock size={16} /> Recent Activity
            </h3>
            {history.length > 4 && (
              <button 
                onClick={() => setView(AppView.SCORECARD)}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline"
              >
                View Analytics
              </button>
            )}
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
            {history.length > 0 ? history.slice(0, 5).map((res, i) => {
              const rank = getScoreRank(res.score, res.total);
              return (
                <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-400 dark:text-slate-500 text-sm border border-slate-100 dark:border-slate-700">
                      {res.score}/{res.total}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 dark:text-slate-100 text-sm group-hover:text-indigo-600 transition-colors">{res.topic}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{res.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm ${rank.color}`}>
                      {rank.label}
                    </span>
                    <button className="p-2 text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="p-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen size={24} className="text-slate-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-bold">No activity yet</p>
                  <p className="text-xs text-slate-400 italic">Complete a mock test or daily dose to see your progress here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 px-2">
            <TrendingUp size={16} /> Smart Focus
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div onClick={() => setView(AppView.DSA_DOSE)} className="group bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between">
              <div>
                <Code className="text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-slate-800 dark:text-white text-lg">Daily DSA Challenge</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Your graph traversal streak is at risk. Solve today's dose!</p>
              </div>
              <div className="mt-6 flex justify-between items-center text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                <span>Attempt Now</span>
                <Zap size={14} className="animate-pulse" />
              </div>
            </div>

            <div onClick={() => setView(AppView.CAMPUS_CORNER)} className="group bg-slate-900 dark:bg-indigo-950 p-8 rounded-[2rem] shadow-xl border border-transparent cursor-pointer hover:shadow-indigo-500/20 transition-all">
              <Users className="text-orange-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="font-black text-white text-lg">Campus Connect</h4>
              <p className="text-xs text-indigo-200/70 mt-2 leading-relaxed">3 peers from your branch are studying "Probability" right now.</p>
              <div className="mt-6 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <span>Find Partner</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
