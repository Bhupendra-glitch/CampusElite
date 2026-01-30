
import React, { useState } from 'react';
import { StickyNote, Search, Loader2, Download, Copy, CheckCircle2, Sigma, ListChecks, FileText } from 'lucide-react';
import { generateStudyNotes } from '../geminiService';
import { StudyNote } from '../types';

const NotesGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<StudyNote | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'formulas' | 'keypoints'>('summary');

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateStudyNotes(topic);
      setNotes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">AI Notes Generator</h1>
        <p className="text-slate-500 dark:text-slate-400">Transform any complex topic into streamlined exam notes and formula sheets.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <StickyNote className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Backpropagation in Neural Networks, Maxwell's Equations..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all"
          />
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          <span>Generate Notes</span>
        </button>
      </div>

      {notes && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="flex bg-slate-50 dark:bg-slate-800/50 p-2">
              {[
                { id: 'summary', icon: FileText, label: 'Summary' },
                { id: 'formulas', icon: Sigma, label: 'Formulas' },
                { id: 'keypoints', icon: ListChecks, label: 'Key Points' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-800 dark:text-white">Conceptual Overview</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                    {notes.summary}
                  </p>
                </div>
              )}

              {activeTab === 'formulas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.formulas.map((f, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'keypoints' && (
                <div className="space-y-3">
                  {notes.keyPoints.map((p, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-300 transition-all group">
                      <CheckCircle2 size={24} className="text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                      <p className="text-slate-700 dark:text-slate-300 font-medium">{p}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <Copy size={20} />
                </button>
                <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <Download size={20} />
                </button>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                Verified by Gemini 3 Pro
              </p>
            </div>
          </div>
        </div>
      )}

      {!notes && !loading && (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <StickyNote size={48} className="opacity-20" />
          </div>
          <p className="text-lg font-medium">Ready to simplify? Start by entering a topic above.</p>
        </div>
      )}
    </div>
  );
};

export default NotesGenerator;
