
import React, { useState, useRef } from 'react';
import { UserProfileData } from '../types';
import { User, IdCard, GraduationCap, Building2, Mail, Loader2, Sparkles, Sun, Moon, Camera } from 'lucide-react';

interface RegisterPageProps {
  onComplete: (data: UserProfileData) => void;
  onBack: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onComplete, onBack, isDarkMode, onToggleTheme }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<UserProfileData>({
    fullName: '',
    rollNumber: '',
    branchYear: '',
    collegeName: '',
    email: '',
    bio: 'Aspiring software engineer ready to dominate.',
    photoUrl: '' // Removed default hardcoded URL
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      onComplete(formData);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        setFormData(prev => ({
          ...prev,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-500">
      {/* Theme Toggle for Register */}
      <button 
        onClick={onToggleTheme}
        className="fixed top-8 right-8 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 text-slate-500 dark:text-slate-400 hover:scale-110 transition-transform"
      >
        {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
      </button>

      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px]" />

      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 space-y-8 relative z-10 animate-in zoom-in duration-500">
        <div className="space-y-2 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-600/20 mb-4">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Your Identity</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Upload a photo and fill in your details to begin.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div 
              onClick={handlePhotoClick}
              className="relative w-28 h-28 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-xl cursor-pointer group overflow-hidden flex items-center justify-center"
            >
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              ) : (
                <User size={40} className="text-slate-300 dark:text-slate-600" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Tap to upload photo</p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <User size={12} /> Full Name
              </label>
              <input 
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Arjun Vardhan"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <IdCard size={12} /> Roll Number
                </label>
                <input 
                  required
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="2022CSE105"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap size={12} /> Branch & Year
                </label>
                <input 
                  required
                  name="branchYear"
                  value={formData.branchYear}
                  onChange={handleChange}
                  placeholder="CSE - 3rd Year"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={12} /> College Name
              </label>
              <input 
                required
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="IIT Delhi"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Mail size={12} /> Official Email
              </label>
              <input 
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              Back
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Launch Identity</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
