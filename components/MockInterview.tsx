
import React, { useState, useEffect, useRef } from 'react';
import { Mic2, Send, Loader2, PlayCircle, StopCircle, Award, BrainCircuit, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { InterviewMessage } from '../types';
import { getInterviewQuestion, evaluateInterviewAnswer } from '../geminiService';

const MockInterview: React.FC = () => {
  const [role, setRole] = useState('Frontend Developer');
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startInterview = async () => {
    setIsLoading(true);
    setIsStarted(true);
    const firstQuestion = await getInterviewQuestion(role, "Starting a new interview.");
    setMessages([{ role: 'ai', text: firstQuestion }]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isEvaluating) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsEvaluating(true);
    const lastAiMsg = messages[messages.length - 1]?.text || "";
    const evalData = await evaluateInterviewAnswer(lastAiMsg, userMsg);
    
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].feedback = evalData.feedback;
      return updated;
    });

    const nextQuestion = await getInterviewQuestion(role, messages.map(m => m.text).join("\n") + "\nUser: " + userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: nextQuestion }]);
    setIsEvaluating(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isEvaluating]);

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <Mic2 size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">AI Placement Pro</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Master technical rounds with our Gemini-powered interview bot.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Select Domain</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Frontend Developer', 'Backend Developer', 'Data Scientist', 'HR Round'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    role === r ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 text-slate-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startInterview}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <PlayCircle />}
            Start Mock Session
          </button>

          <div className="flex justify-center gap-8 pt-4">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <BrainCircuit size={16} /> Technical Logic
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <MessageSquare size={16} /> HR Skills
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <Award size={16} /> Real-time Feedback
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center">
            <Mic2 size={20} />
          </div>
          <div>
            <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-xs">{role} Interview</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase animate-pulse">Session Active</p>
          </div>
        </div>
        <button 
          onClick={() => setIsStarted(false)}
          className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
        >
          End Session
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] space-y-2`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'ai' 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700' 
                : 'bg-indigo-600 text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
              {msg.feedback && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-left-2">
                   <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">AI Feedback</p>
                      <p className="text-xs text-green-800 dark:text-green-300 italic">{msg.feedback}</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isEvaluating && (
          <div className="flex justify-start">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <Loader2 className="animate-spin text-indigo-600" size={16} />
              <span className="text-xs text-slate-500 font-medium">Interviewer is typing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-lg flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your detailed answer here..."
          className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none dark:text-white"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isEvaluating}
          className={`p-3 rounded-xl transition-all ${
            !input.trim() || isEvaluating ? 'bg-slate-100 text-slate-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-90'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MockInterview;
