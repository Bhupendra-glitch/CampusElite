
import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Trophy,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { UserProfileData } from '../types';

interface ResumeGeneratorProps {
  profileData: UserProfileData;
}

const ResumeGenerator: React.FC<ResumeGeneratorProps> = ({ profileData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const resume = {
    name: profileData.fullName,
    title: `${profileData.branchYear} | Aspiring Engineer`,
    email: `${profileData.fullName.toLowerCase().replace(/\s+/g, '.')}@${profileData.collegeName.toLowerCase().split(',')[0].trim().replace(/\s+/g, '')}.edu`,
    phone: '+91 98765 43210',
    location: 'Campus Residence',
    github: 'github.com/profile',
    linkedin: 'linkedin.com/in/profile',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Algorithms'],
    experience: [
      { role: 'Student Developer', company: profileData.collegeName, period: '2023 - Present', desc: 'Working on internal university management portals and club projects.' },
    ],
    education: { college: profileData.collegeName, degree: profileData.branchYear, cgpa: '8.5/10', year: '2021 - 2025' }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    // Short delay to show the "Processing" state for UX
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 800);
  };

  const handleShareLink = async () => {
    setIsSharing(true);
    try {
      // Create a simulated shareable URL
      const shareUrl = `${window.location.origin}/profile/${profileData.rollNumber.toLowerCase()}`;
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy link', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Print styles to only show the resume sheet */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #resume-print-area, #resume-print-area * {
              visibility: visible;
            }
            #resume-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 20px;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              border: none !important;
            }
            aside, header, .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-500/30">
            <CheckCircle2 className="text-green-400" size={20} />
            <p className="text-sm font-bold tracking-tight">Portfolio link copied to clipboard!</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 no-print">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Resume & Skill Hub</h1>
          <p className="text-slate-500 dark:text-slate-400">Generate professional documents and shareable skill cards instantly.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-70"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? 'Processing...' : 'Export PDF'}
          </button>
          <button 
            onClick={handleShareLink}
            disabled={isSharing}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-70"
          >
            {isSharing ? <Loader2 size={16} className="animate-spin" /> : (showToast ? <CheckCircle2 size={16} className="text-green-500" /> : <Share2 size={16} />)}
            {isSharing ? 'Copying...' : 'Share Link'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Preview */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1 no-print">Professional Resume Preview</h3>
          <div id="resume-print-area" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 min-h-[800px] text-slate-800 dark:text-slate-200 overflow-hidden relative">
            {/* Header */}
            <div className="space-y-4 pb-8 border-b border-slate-100 dark:border-slate-800">
               <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tighter text-indigo-600">{resume.name}</h2>
                    <p className="text-lg font-bold text-slate-600 dark:text-slate-400">{resume.title}</p>
                  </div>
                  <div className="text-right text-sm space-y-1 font-medium text-slate-500">
                    <p className="flex items-center justify-end gap-2"><Mail size={14} /> {resume.email}</p>
                    <p className="flex items-center justify-end gap-2"><MapPin size={14} /> {resume.location}</p>
                    <p className="flex items-center justify-end gap-2"><Globe size={14} /> {resume.github}</p>
                  </div>
               </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 space-y-8">
                <section className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Education</h4>
                  <div className="space-y-1">
                    <p className="font-bold">{resume.education.college}</p>
                    <p className="text-sm text-slate-500">{resume.education.degree}</p>
                    <p className="text-sm font-bold">CGPA: {resume.education.cgpa}</p>
                  </div>
                </section>
                <section className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map(s => (
                      <span key={s} className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold rounded border border-slate-100 dark:border-slate-700">{s}</span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-2 space-y-8">
                <section className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Work Experience</h4>
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <p className="font-black text-slate-800 dark:text-white">{exp.role}</p>
                        <p className="text-[10px] font-bold text-slate-400">{exp.period}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-500">{exp.company}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </section>

                <section className="space-y-4">
                   <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Summary</h4>
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                     "{profileData.bio}"
                   </p>
                </section>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-10">
               <ShieldCheck size={120} className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Skill Card & GitHub Summary */}
        <div className="space-y-8 no-print">
          <section className="space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Shareable Skill Card</h3>
             <div className="aspect-[4/5] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Trophy size={150} />
                </div>
                <div className="space-y-2 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <Award size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight">Skill Matrix v1.0</h4>
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Verified by CampusElite</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="space-y-1">
                      <div className="flex justify-between text-xs font-black uppercase">
                        <span>Elite Score</span>
                        <span>2,840</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: '75%' }} />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      {['Frontend', 'Backend', 'DSA', 'Logic'].map(cat => (
                        <div key={cat} className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                          <p className="text-[10px] font-bold opacity-60 uppercase">{cat}</p>
                          <p className="text-sm font-black">Grade A+</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex justify-between items-center relative z-10 border-t border-white/10 pt-4">
                   <p className="font-black text-lg italic tracking-tighter truncate max-w-[120px]">{resume.name}</p>
                   <div className="flex gap-2">
                     <Github size={16} />
                     <Linkedin size={16} />
                   </div>
                </div>
             </div>
          </section>

          <section className="space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">GitHub Summary</h3>
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl font-mono text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed relative group">
                  <button className="absolute top-2 right-2 p-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={12} />
                  </button>
                  ## 👋 Hi, I'm {resume.name.split(' ')[0]}!<br/>
                  ⚡ Engineering student at {profileData.collegeName.split(',')[0]}<br/>
                  🛠️ Focused on: React, Node.js, Cloud<br/>
                  🚀 Top Languages: TS (45%), JS (30%), Python (25%)<br/>
                  🏆 Daily DSA Streak: 12 days
                </div>
                <p className="text-[10px] text-slate-400 font-bold text-center">Copy this to your GitHub profile README.md</p>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
