
import React, { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, IdCard, Building2, AlignLeft, Camera, Save, CheckCircle2, Award, Star, Code, Swords, FileText, UserCircle } from 'lucide-react';
import { UserProfileData, AppView } from '../types';

interface ProfileProps {
  setView?: (view: AppView) => void;
  profileData: UserProfileData;
  onSaveProfile: (data: UserProfileData) => void;
}

const Profile: React.FC<ProfileProps> = ({ setView, profileData, onSaveProfile }) => {
  // Use local form state for immediate input feedback
  const [formState, setFormState] = useState<UserProfileData>(profileData);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if profileData changes externally
  useEffect(() => {
    setFormState(profileData);
  }, [profileData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formState);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please select an image under 2MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Profile Header Banner */}
        <div className="h-40 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700" />
        
        <div className="px-8 pb-8 relative">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          {/* Avatar Section */}
          <div className="relative -mt-20 mb-8 inline-block group cursor-pointer" onClick={handlePhotoClick}>
            <div className="w-36 h-36 rounded-3xl border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:opacity-90 transition-opacity flex items-center justify-center">
              {formState.photoUrl ? (
                <img 
                  src={formState.photoUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle size={80} className="text-slate-300 dark:text-slate-600" />
              )}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={32} className="text-white" />
              </div>
            </div>
            <button 
              type="button"
              className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors border border-indigo-500/20 z-10"
            >
              <Camera size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <IdCard size={12} /> Student ID
                    </label>
                    <input 
                      type="text"
                      name="rollNumber"
                      value={formState.rollNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={12} /> Branch & Year
                    </label>
                    <input 
                      type="text"
                      name="branchYear"
                      value={formState.branchYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Building2 size={12} /> College
                    </label>
                    <input 
                      type="text"
                      name="collegeName"
                      value={formState.collegeName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-bold text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlignLeft size={12} /> Bio
                  </label>
                  <textarea 
                    name="bio"
                    rows={4}
                    value={formState.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-medium text-slate-700 dark:text-slate-200 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className={`flex items-center gap-2 px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${
                      isSaved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaved ? <><CheckCircle2 size={16} /> Updated</> : <><Save size={16} /> Save Changes</>}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
               <button 
                  onClick={() => setView && setView(AppView.RESUME_GEN)}
                  className="w-full p-6 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-3xl group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
               >
                  <FileText className="text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-black text-indigo-700 dark:text-indigo-400">Smart Resume Builder</h4>
                  <p className="text-[10px] font-bold text-indigo-500/70 uppercase tracking-widest mt-1">Generate v1.0 Draft</p>
               </button>

               <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                    <Award size={14} className="text-yellow-500" /> Achievements
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
                      { icon: Code, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                      { icon: Swords, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                    ].map((badge, i) => (
                      <div key={i} className={`${badge.bg} aspect-square rounded-xl flex items-center justify-center`}>
                        <badge.icon className={badge.color} size={24} />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-center mt-4 text-slate-400">Unlock more badges by completing Daily DSA and Arena Challenges.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
