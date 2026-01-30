
import React, { useState } from 'react';
// Added Award and Users to the lucide-react imports
import { MessageCircle, Brain, User, Clock, ChevronUp, MessageSquare, Sparkles, Send, CheckCircle, Award, Users } from 'lucide-react';
import { Doubt } from '../types';
import { getAIDoubtSolution } from '../geminiService';

const DoubtSolver: React.FC = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([
    { id: '1', author: 'Sameer', subject: 'Data Structures', question: 'What is the difference between a Red-Black Tree and an AVL Tree in terms of balancing factors?', timestamp: '2h ago', status: 'OPEN', upvotes: 12 },
    { id: '2', author: 'Neha', subject: 'Operating Systems', question: 'How does the Banker\'s algorithm prevent deadlock effectively in a multi-resource system?', timestamp: '5h ago', status: 'SOLVED', upvotes: 8, aiResponse: 'The Banker\'s algorithm works by simulating the allocation of predetermined maximum possible amounts of all resources, then makes an "s-state" check to test for possible activities, before deciding whether allocation should be allowed to continue.' }
  ]);
  const [newDoubt, setNewDoubt] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [solvingId, setSolvingId] = useState<string | null>(null);

  const handlePost = () => {
    if (!newDoubt.trim()) return;
    const doubt: Doubt = {
      id: Date.now().toString(),
      author: 'You',
      subject,
      question: newDoubt,
      timestamp: 'Just now',
      status: 'OPEN',
      upvotes: 0
    };
    setDoubts([doubt, ...doubts]);
    setNewDoubt('');
  };

  const handleAISolve = async (id: string) => {
    const doubt = doubts.find(d => d.id === id);
    if (!doubt || solvingId) return;
    
    setSolvingId(id);
    const solution = await getAIDoubtSolution(doubt.question, doubt.subject);
    
    setDoubts(prev => prev.map(d => d.id === id ? { ...d, aiResponse: solution, status: 'SOLVED' } : d));
    setSolvingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Community Doubt Solver</h1>
          <p className="text-slate-500 dark:text-slate-400">Collaborate with peers or summon AI to resolve tricky concepts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Post Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-indigo-100 dark:border-indigo-900/30 space-y-4">
            <div className="flex gap-2 mb-2">
              {['Computer Science', 'Mathematics', 'Physics', 'General'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSubject(s)}
                  className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all ${
                    subject === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <textarea 
              value={newDoubt}
              onChange={(e) => setNewDoubt(e.target.value)}
              placeholder="Explain your doubt clearly..."
              className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400 italic">Be specific for better answers.</p>
              <button 
                onClick={handlePost}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Post Doubt <Send size={16} />
              </button>
            </div>
          </div>

          {/* Doubts Feed */}
          <div className="space-y-4">
            {doubts.map(d => (
              <div key={d.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{d.author}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{d.timestamp} in {d.subject}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors">
                      <ChevronUp size={24} />
                    </button>
                    <span className="text-xs font-black text-slate-500">{d.upvotes}</span>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {d.question}
                </p>

                {d.aiResponse && (
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 space-y-2 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Brain size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">AI Solution</span>
                      </div>
                      <Sparkles size={14} className="text-indigo-400 animate-pulse" />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      {d.aiResponse}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600">
                      <MessageSquare size={16} /> Answers (3)
                    </button>
                  </div>
                  {!d.aiResponse && (
                    <button 
                      onClick={() => handleAISolve(d.id)}
                      disabled={solvingId === d.id}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {solvingId === d.id ? <Loader2 className="animate-spin" size={14} /> : <Brain size={14} />}
                      Summon Gemini
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 dark:bg-slate-900 p-6 rounded-3xl text-white shadow-xl space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Award className="text-yellow-400" /> Top Problem Solvers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Aditya', solves: 45 },
                { name: 'Sneha', solves: 32 },
                { name: 'Vivek', solves: 28 }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-indigo-300">#{i+1}</span>
                    <span className="text-sm font-bold">{s.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">{s.solves} Solved</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white">Active Discussions</h3>
            <div className="space-y-4">
              {['Compiler Design Lab', 'DBMS Assignment 4', 'IEEE Paper Reading'].map(topic => (
                <div key={topic} className="flex items-center justify-between text-xs cursor-pointer group">
                  <span className="font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors">#{topic}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Users size={12} /> 14
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} height={size || 24} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default DoubtSolver;
