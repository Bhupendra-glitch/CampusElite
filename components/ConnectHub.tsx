
import React, { useState } from 'react';
import { 
  Users, 
  Github, 
  Linkedin, 
  MessageSquare, 
  Award, 
  MapPin, 
  Swords, 
  X, 
  ShieldCheck, 
  ExternalLink,
  Search,
  BookOpen,
  Calendar,
  Zap
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ConnectHubProps {
  onChallenge: (name: string) => void;
}

const ConnectHub: React.FC<ConnectHubProps> = ({ onChallenge }) => {
  const [selectedDossier, setSelectedDossier] = useState<StudentProfile | null>(null);

  const students: StudentProfile[] = [
    { 
      id: '1', 
      name: 'Aditya Raj', 
      role: 'Full Stack Developer', 
      github: 'https://github.com', 
      linkedin: 'https://linkedin.com', 
      avatar: 'https://picsum.photos/seed/p1/200', 
      skills: ['React', 'Node.js', 'AWS'],
      weakAreas: ['Operating Systems', 'Probability'],
      availability: '6 PM - 9 PM'
    },
    { 
      id: '2', 
      name: 'Sneha Kapur', 
      role: 'UI/UX Designer', 
      github: 'https://github.com', 
      linkedin: 'https://linkedin.com', 
      avatar: 'https://picsum.photos/seed/p2/200', 
      skills: ['Figma', 'Sketch', 'HTML'],
      weakAreas: ['Python', 'Data Structures'],
      availability: 'Afternoons'
    },
    { 
      id: '3', 
      name: 'Vivek Sharma', 
      role: 'Competitive Coder', 
      github: 'https://github.com', 
      linkedin: 'https://linkedin.com', 
      avatar: 'https://picsum.photos/seed/p3/200', 
      skills: ['C++', 'Algorithms', 'Java'],
      weakAreas: ['DBMS', 'SQL'],
      availability: 'Late Night'
    },
    { 
      id: '4', 
      name: 'Isha Mehra', 
      role: 'Data Scientist', 
      github: 'https://github.com', 
      linkedin: 'https://linkedin.com', 
      avatar: 'https://picsum.photos/seed/p4/200', 
      skills: ['Python', 'R', 'Keras'],
      weakAreas: ['React', 'CSS'],
      availability: 'Flexible'
    },
  ];

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Student Connect</h1>
          <p className="text-slate-500 dark:text-slate-400">Network with peers and find collaborators for your next project.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">4,203 Students Online</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-sm flex flex-col h-full">
            <div className="h-20 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-80" />
            <div className="px-6 pb-6 text-center flex-1 flex flex-col">
              <div className="relative -mt-10 mb-4 inline-block mx-auto">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl object-cover"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{student.name}</h3>
                <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 py-1 rounded-md uppercase tracking-widest">{student.role}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-1 mt-4">
                {student.skills.map(s => (
                  <span key={s} className="text-[9px] px-2 py-0.5 font-bold bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-700 uppercase">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 flex justify-center gap-4">
                <button 
                  onClick={() => onChallenge(student.name)}
                  className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  title="Challenge to Duel"
                >
                  <Swords size={20} />
                </button>
                <a 
                  href={student.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={student.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              <button 
                onClick={() => setSelectedDossier(student)}
                className="w-full mt-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-colors"
              >
                View Dossier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Communities Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
          <Award className="text-orange-500" /> Active Communities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'GDSC Chapter', members: 450, location: 'Lab 4', image: 'https://picsum.photos/seed/gdsc/400/200' },
            { name: 'Algorithmic Society', members: 210, location: 'Virtual', image: 'https://picsum.photos/seed/algo/400/200' },
            { name: 'Design Syndicate', members: 120, location: 'Workshop B', image: 'https://picsum.photos/seed/design/400/200' },
          ].map(club => (
            <div key={club.name} className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer shadow-lg">
              <img src={club.image} alt={club.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-2">
                <h3 className="font-black text-xl leading-tight">{club.name}</h3>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-widest">
                  <span className="flex items-center gap-1"><Users size={12} /> {club.members}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {club.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dossier Modal Overlay */}
      {selectedDossier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setSelectedDossier(null)} />
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Confidential Dossier</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Elite ID: #{selectedDossier.id.padStart(4, '0')}</p>
                   </div>
                </div>
                <button onClick={() => setSelectedDossier(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-500">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="shrink-0 text-center space-y-4">
                    <img 
                      src={selectedDossier.avatar} 
                      alt={selectedDossier.name} 
                      className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-slate-800 shadow-2xl mx-auto object-cover" 
                    />
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">{selectedDossier.name}</h3>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">{selectedDossier.role}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Zap size={10} className="text-yellow-500" /> Availability
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{selectedDossier.availability || 'TBD'}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <MapPin size={10} className="text-blue-500" /> Status
                        </p>
                        <p className="text-sm font-bold text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active Now
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Mastered Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDossier.skills.map(s => (
                          <span key={s} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-lg border border-indigo-100 dark:border-indigo-800/50 uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Learning Targets</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDossier.weakAreas?.map(s => (
                          <span key={s} className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-lg border border-rose-100 dark:border-rose-800/50 uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <h4 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <Calendar size={18} className="text-indigo-500" /> Study Mission
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "Looking to collaborate on system design projects or practice mock coding interviews for the upcoming internship season."
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    onChallenge(selectedDossier.name);
                    setSelectedDossier(null);
                  }}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Swords size={18} /> Initiate Challenge
                </button>
                <div className="flex gap-2">
                   <a 
                    href={selectedDossier.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-indigo-600 transition-colors"
                   >
                     <Github size={20} />
                   </a>
                   <a 
                    href={selectedDossier.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-blue-500 transition-colors"
                   >
                     <Linkedin size={20} />
                   </a>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ConnectHub;
