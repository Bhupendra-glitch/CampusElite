
import React, { useState, useMemo } from 'react';
import { 
  Handshake, 
  Search, 
  Star, 
  UserCheck, 
  ShieldCheck, 
  Filter, 
  Loader2, 
  CheckCircle, 
  X,
  Sparkles
} from 'lucide-react';
import { StudentProfile } from '../types';

const PartnerMatch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const initialPartners: StudentProfile[] = [
    { 
      id: '1', name: 'Arjun Vardhan', role: 'Full Stack', github: '', linkedin: '', avatar: 'https://picsum.photos/seed/p10/200', 
      skills: ['React', 'Node.js'], weakAreas: ['Operating Systems', 'Probability'], availability: 'Evening (6-9 PM)'
    },
    { 
      id: '2', name: 'Ishani Roy', role: 'Data Scientist', github: '', linkedin: '', avatar: 'https://picsum.photos/seed/p11/200', 
      skills: ['Python', 'Probability'], weakAreas: ['React', 'CSS'], availability: 'Late Night (10 PM+)'
    },
    { 
      id: '3', name: 'Kabir Das', role: 'ML Engineer', github: '', linkedin: '', avatar: 'https://picsum.photos/seed/p12/200', 
      skills: ['TensorFlow', 'Linear Algebra'], weakAreas: ['DBMS', 'SQL'], availability: 'Weekends'
    },
    { 
      id: '4', name: 'Sneha Kapur', role: 'UI/UX Designer', github: '', linkedin: '', avatar: 'https://picsum.photos/seed/p13/200', 
      skills: ['Figma', 'Prototyping'], weakAreas: ['Python', 'Data Structures'], availability: 'Afternoons'
    },
    { 
      id: '5', name: 'Rohan Mehta', role: 'Cloud Architect', github: '', linkedin: '', avatar: 'https://picsum.photos/seed/p14/200', 
      skills: ['AWS', 'Docker'], weakAreas: ['Algorithms', 'Linear Algebra'], availability: 'Flexible'
    }
  ];

  // Filtering Logic
  const filteredPartners = useMemo(() => {
    return initialPartners.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.weakAreas?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || p.role.includes(activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleRequest = async (id: string, name: string) => {
    if (requestedIds.has(id)) return;
    
    setProcessingId(id);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setRequestedIds(prev => new Set(prev).add(id));
    setProcessingId(null);
    setShowToast(`Request sent to ${name}! They'll be notified.`);
    
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            Study Partner Hub <Sparkles className="text-yellow-400" size={24} />
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Find peers who complement your skills and boost your productivity.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by name, subject, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <X size={16} className="text-slate-400" />
              </button>
            )}
          </div>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            {['All', 'Full Stack', 'Data', 'ML', 'Designer'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      {filteredPartners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredPartners.map((p, i) => {
            const isRequested = requestedIds.has(p.id);
            const isProcessing = processingId === p.id;

            return (
              <div key={p.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group relative">
                <div className={`h-24 bg-gradient-to-r ${
                  i % 3 === 0 ? 'from-indigo-600 to-violet-600' : 
                  i % 3 === 1 ? 'from-emerald-500 to-teal-500' : 
                  'from-orange-500 to-rose-500'
                } opacity-80 group-hover:scale-110 transition-transform duration-700`} />
                
                <div className="px-8 pb-8 relative -mt-12">
                  <div className="relative inline-block mb-4">
                    <img src={p.avatar} alt={p.name} className="w-24 h-24 rounded-3xl border-4 border-white dark:border-slate-900 shadow-2xl object-cover" />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
                      <Star size={16} className="text-indigo-900 fill-indigo-900" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white">{p.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <UserCheck size={12} className="text-indigo-500" /> {p.role}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Can Teach You</p>
                       <div className="flex flex-wrap gap-2">
                         {p.skills.map(s => (
                           <span key={s} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black rounded-lg border border-green-100 dark:border-green-800/50 uppercase tracking-wider">{s}</span>
                         ))}
                       </div>
                    </div>

                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Needs Help In</p>
                       <div className="flex flex-wrap gap-2">
                         {p.weakAreas?.map(s => (
                           <span key={s} className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 text-[10px] font-black rounded-lg border border-rose-100 dark:border-rose-800/50 uppercase tracking-wider">{s}</span>
                         ))}
                       </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Availability</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.availability}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compatibility</p>
                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{85 + (i * 2)}%</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRequest(p.id, p.name)}
                    disabled={isRequested || isProcessing}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 mt-2 ${
                      isRequested 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default shadow-none border border-slate-200 dark:border-slate-700' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20 active:scale-95'
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : isRequested ? (
                      <><CheckCircle size={16} /> Request Sent</>
                    ) : (
                      <><Handshake size={16} /> Request to Study</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
            <Search size={40} />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-slate-800 dark:text-white">No matching partners found</p>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filters.</p>
          </div>
        </div>
      )}

      {/* Safety Banner */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl text-indigo-600 dark:text-indigo-400 shrink-0">
          <ShieldCheck size={48} />
        </div>
        <div className="space-y-2 flex-1 text-center md:text-left">
          <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight">Safety First Studying</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Study Partner Hub verifies students through their college domain emails. We recommend meeting in public campus spaces like libraries or designated study zones.
          </p>
        </div>
        <button className="px-8 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">
          Community Guidelines
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in">
          <div className="bg-slate-900 dark:bg-indigo-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-500/30">
            <CheckCircle className="text-green-400" size={20} />
            <p className="text-sm font-bold tracking-tight">{showToast}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerMatch;
