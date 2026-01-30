
import React, { useState, useEffect } from 'react';
// Added Trophy to imports
import { Code, Terminal, Lightbulb, RefreshCw, CheckCircle, ChevronDown, AlertCircle, Sparkles, Trophy } from 'lucide-react';
import { getDSADose } from '../geminiService';

interface DSADoseProps {
  onSolve?: () => void;
}

const DSADose: React.FC<DSADoseProps> = ({ onSolve }) => {
  const [dose, setDose] = useState<{ title: string, problem: string, hint: string, difficulty: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const fetchDose = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDSADose();
      setDose(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load today's challenge. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setShowHint(false);
    }
  };

  useEffect(() => {
    fetchDose();
  }, []);

  const handleMarkSolved = () => {
    if (completed) return;
    
    setCompleted(true);
    setShowSuccessToast(true);
    if (onSolve) onSolve();
    
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <div className="text-center space-y-1">
          <p className="font-black text-slate-700 dark:text-slate-300">Generating Today's High-Yield Problem...</p>
          <p className="text-xs text-slate-400 uppercase tracking-widest">Powered by Gemini AI</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Connection Error</h2>
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
        <button 
          onClick={fetchDose}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 fade-in duration-500">
          <div className="bg-green-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-green-500/30">
            <Sparkles className="animate-pulse" size={24} />
            <div className="leading-tight">
              <p className="font-black text-sm">Challenge Mastered!</p>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">+150 Arena XP Awarded</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Daily DSA Dose</h1>
          <p className="text-slate-500 dark:text-slate-400">Master the logic behind complex algorithms every single day.</p>
        </div>
        <button 
          onClick={fetchDose}
          className="p-3 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          title="Get New Challenge"
        >
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3 font-mono">
                <Terminal size={20} className="text-indigo-400" />
                <span className="text-xs uppercase font-black tracking-widest opacity-80">Execution Context</span>
              </div>
              <span className={`text-[10px] px-4 py-1.5 rounded-full uppercase font-black tracking-widest shadow-lg ${
                dose?.difficulty === 'Hard' ? 'bg-rose-500' : dose?.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
              }`}>
                {dose?.difficulty}
              </span>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{dose?.title}</h2>
                 <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Fresh from Gemini Pro</p>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {dose?.problem}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Code className="text-indigo-600" size={14} /> Pseudocode Lab
               </h3>
               {completed && (
                  <span className="text-[10px] font-black text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={12} /> Accepted
                  </span>
               )}
            </div>
            <div 
              className={`bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-6 font-mono text-sm min-h-[250px] outline-none transition-all ${completed ? 'opacity-60 pointer-events-none' : 'focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800'}`} 
              contentEditable={!completed}
              spellCheck={false}
            >
              {!completed ? (
                <>
                  <span className="text-indigo-500">// Describe your approach or paste code here...</span>
                  <br /><br />
                  <span className="text-slate-400">class</span> Solution &#123;<br />
                  &nbsp;&nbsp;<span className="text-slate-400">public:</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;vector&lt;<span className="text-slate-400">int</span>&gt; solve(vector&lt;<span className="text-slate-400">int</span>&gt;& nums) &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                  &#125;;
                </>
              ) : (
                <div className="italic text-slate-400">Solution submitted and locked.</div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Solution state: {completed ? 'Finalized' : 'In Progress'}</p>
              <button 
                onClick={handleMarkSolved}
                disabled={completed}
                className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                  completed ? 'bg-green-600 text-white cursor-default' : 'bg-slate-900 dark:bg-indigo-600 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {completed ? <><CheckCircle size={18} /> Problem Solved</> : 'Submit for Review'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 font-black uppercase tracking-widest text-xs">
              <Lightbulb size={24} className="text-amber-500" />
              <h3>Gemini Insights</h3>
            </div>
            <p className="text-xs text-amber-800/80 dark:text-amber-300 leading-relaxed font-bold italic">
              "Focus on space-time tradeoffs. Could a hash map reduce your complexity from O(n²) to O(n)?"
            </p>
            <button 
              onClick={() => setShowHint(!showHint)}
              className="w-full py-3 border-2 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-all"
            >
              {showHint ? 'Hide Hint' : 'Deep Dive Into Hint'}
            </button>
            {showHint && (
              <div className="mt-4 p-5 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs leading-relaxed text-amber-900 dark:text-amber-200 animate-in fade-in slide-in-from-top-2">
                {dose?.hint}
              </div>
            )}
          </div>

          <div className="bg-indigo-900 dark:bg-indigo-950 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000">
               <Trophy size={140} />
            </div>
            <div className="space-y-1 relative z-10">
               <h3 className="font-black text-xs uppercase tracking-widest text-indigo-400">Weekly Elite List</h3>
               <p className="text-[10px] font-bold text-indigo-300/60 uppercase">Last updated: 2h ago</p>
            </div>
            <div className="space-y-4 relative z-10">
              {[
                { name: 'Aditya Raj', score: 1250, badge: 'S' },
                { name: 'Sneha Kapur', score: 1180, badge: 'A' },
                { name: 'Vivek Sharma', score: 1120, badge: 'A' }
              ].map((user, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-4 font-black text-indigo-400 text-xs">{i+1}</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center font-black text-[10px]">{user.badge}</div>
                    <span className="text-sm font-bold tracking-tight">{user.name}</span>
                  </div>
                  <span className="font-mono text-xs font-black text-indigo-300">{user.score}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all relative z-10">
              Full Standings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSADose;
