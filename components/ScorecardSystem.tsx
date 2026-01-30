
import React, { useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BarChart3, TrendingUp, Target, BrainCircuit, Sparkles, Download, Info } from 'lucide-react';
import { QuizResult } from '../types';

interface ScorecardProps {
  history: QuizResult[];
}

const ScorecardSystem: React.FC<ScorecardProps> = ({ history }) => {
  const [showDemo, setShowDemo] = useState(false);

  // Sample data if history is empty
  const demoData: QuizResult[] = [
    { topic: 'Data Structures', score: 8, total: 10, date: '2023-10-01', feedback: '' },
    { topic: 'Algorithms', score: 6, total: 10, date: '2023-10-02', feedback: '' },
    { topic: 'Operating Systems', score: 9, total: 10, date: '2023-10-03', feedback: '' },
    { topic: 'DBMS', score: 5, total: 10, date: '2023-10-04', feedback: '' },
    { topic: 'Computer Networks', score: 7, total: 10, date: '2023-10-05', feedback: '' },
  ];

  const activeHistory = history.length > 0 ? history : (showDemo ? demoData : []);

  // 1. Calculate Overall Accuracy
  const stats = useMemo(() => {
    if (activeHistory.length === 0) return { accuracy: 0, xp: 0, best: 'N/A', worst: 'N/A' };
    
    const totalScorePercent = activeHistory.reduce((acc, curr) => acc + (curr.score / curr.total), 0);
    const avgAcc = Math.round((totalScorePercent / activeHistory.length) * 100);
    
    // XP Logic: 450 base + 100 per test + 50 per perfect score
    const baseXP = activeHistory.length * 100;
    const bonusXP = activeHistory.filter(h => h.score === h.total && h.total > 0).length * 50;
    const xp = 450 + baseXP + bonusXP;

    // Topic Performance Map
    const topicMap: Record<string, { scores: number[], totals: number[] }> = {};
    activeHistory.forEach(h => {
      if (!topicMap[h.topic]) topicMap[h.topic] = { scores: [], totals: [] };
      topicMap[h.topic].scores.push(h.score);
      topicMap[h.topic].totals.push(h.total);
    });

    const topicStats = Object.keys(topicMap).map(topic => {
      const sumS = topicMap[topic].scores.reduce((a, b) => a + b, 0);
      const sumT = topicMap[topic].totals.reduce((a, b) => a + b, 0);
      return { name: topic, acc: sumS / sumT };
    });

    const sortedTopics = [...topicStats].sort((a, b) => b.acc - a.acc);
    
    return {
      accuracy: avgAcc,
      xp: xp,
      best: sortedTopics[0]?.name || 'N/A',
      worst: sortedTopics[sortedTopics.length - 1]?.name || 'N/A'
    };
  }, [activeHistory]);

  // Chart Data Preparation
  const chartData = useMemo(() => {
    return activeHistory.slice(0, 10).reverse().map(item => ({
      name: item.date.split('/')[0] + '/' + item.date.split('/')[1], // Short date
      score: Math.round((item.score / item.total) * 100)
    }));
  }, [activeHistory]);

  const pieData = useMemo(() => {
    const topicMap: Record<string, { total: number, score: number }> = {};
    activeHistory.forEach(h => {
      if (!topicMap[h.topic]) topicMap[h.topic] = { total: 0, score: 0 };
      topicMap[h.topic].total += h.total;
      topicMap[h.topic].score += h.score;
    });
    return Object.keys(topicMap).map(topic => ({
      name: topic,
      value: Math.round((topicMap[topic].score / topicMap[topic].total) * 100)
    })).slice(0, 5);
  }, [activeHistory]);

  const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

  const handleExport = () => {
    if (activeHistory.length === 0) return;

    // CSV Headers
    const headers = ['Date', 'Topic', 'Score', 'Total', 'Percentage', 'Status'];
    
    // Map data to rows
    const rows = activeHistory.map(item => {
      const percentage = (item.score / item.total) * 100;
      const status = percentage >= 80 ? 'Mastered' : percentage >= 50 ? 'Competent' : 'Focus Needed';
      return [
        item.date,
        `"${item.topic.replace(/"/g, '""')}"`, // Escape commas in topic
        item.score,
        item.total,
        `${percentage.toFixed(1)}%`,
        status
      ];
    });

    // Construct CSV content
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `CampusElite_Performance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (activeHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
          <BarChart3 size={48} />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Your data is being processed...</h2>
          <p className="text-slate-500 dark:text-slate-400">Complete at least one mock test to unlock your performance analytics and AI focus recommendations.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowDemo(true)}
            className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Sparkles size={16} className="text-yellow-500" /> Preview with Demo Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {showDemo && history.length === 0 && (
        <div className="bg-indigo-600 p-3 rounded-2xl text-white text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20">
          <Info size={14} /> Viewing as Guest (Demo Data)
          <button onClick={() => setShowDemo(false)} className="underline ml-4">Clear Demo</button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall Accuracy', value: `${stats.accuracy}%`, icon: TrendingUp, color: 'indigo', detail: '+2% from last week' },
          { label: 'Best Subject', value: stats.best, icon: Target, color: 'emerald', detail: 'High performance area' },
          { label: 'Focus Needed', value: stats.worst, icon: BrainCircuit, color: 'rose', detail: 'Improvement suggested' },
          { label: 'Total XP Earned', value: stats.xp.toLocaleString(), icon: Sparkles, color: 'amber', detail: `Level ${Math.floor(stats.xp / 1000) + 1} Specialist` }
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-${card.color}-50 dark:bg-${card.color}-900/20 rounded-2xl text-${card.color}-600 dark:text-${card.color}-400`}>
                <card.icon size={24} />
              </div>
              {i === 0 && <span className="text-[10px] font-black text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg uppercase tracking-wider">Ascending</span>}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{card.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight truncate">{card.value}</p>
              <p className="text-[10px] font-bold text-slate-400">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Test History Trend (%)</h3>
            <div className="flex gap-2">
               <div className="w-3 h-3 bg-indigo-500 rounded-full" />
               <span className="text-[10px] font-bold text-slate-400">SCORE %</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b820" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} 
                  domain={[0, 100]}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    backgroundColor: '#0f172a',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Breakdown Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-8">Concept Mastery</h3>
          <div className="h-64 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text for Pie */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.accuracy}%</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase">AVG ACC</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Mastery History</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Detailed breakdown of all attempted sessions</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <Download size={14} /> Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5 text-left">Timestamp</th>
                <th className="px-8 py-5 text-left">Subject / Topic</th>
                <th className="px-8 py-5 text-left">Raw Score</th>
                <th className="px-8 py-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {activeHistory.map((item, idx) => {
                const percentage = (item.score / item.total) * 100;
                return (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6 text-xs text-slate-500 dark:text-slate-400 font-bold">{item.date}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">{item.topic}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-800 dark:text-white">{item.score}/{item.total}</span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] uppercase font-black px-3 py-1 rounded-lg tracking-wider ${
                        percentage >= 80 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
                        percentage >= 50 ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                      }`}>
                        {percentage >= 80 ? 'Mastered' : percentage >= 50 ? 'Competent' : 'Focus Needed'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScorecardSystem;
