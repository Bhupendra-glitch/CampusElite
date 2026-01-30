
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Code, 
  Cpu, 
  Megaphone, 
  Users, 
  BarChart3,
  Sun,
  Moon,
  Bell,
  Swords,
  FileText,
  Mic2,
  StickyNote,
  MessageCircle,
  Handshake,
  Trophy,
  UserCircle,
  CloudLightning,
  RefreshCw
} from 'lucide-react';
import { AppView, QuizResult, SmartNotification, UserProfileData, AuthStatus } from './types';
import { CampusEliteAPI } from './api';
import Dashboard from './components/Dashboard';
import ExamPrep from './components/ExamPrep';
import DSADose from './components/DSADose';
import SkillsSection from './components/SkillsSection';
import CampusCorner from './components/CampusCorner';
import ConnectHub from './components/ConnectHub';
import ScorecardSystem from './components/ScorecardSystem';
import Profile from './components/Profile';
import ChallengeArena from './components/ChallengeArena';
import NotificationCenter from './components/NotificationCenter';
import ResumeGenerator from './components/ResumeGenerator';
import MockInterview from './components/MockInterview';
import NotesGenerator from './components/NotesGenerator';
import DoubtSolver from './components/DoubtSolver';
import PartnerMatch from './components/PartnerMatch';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('campus_elite_theme') === 'dark');
  const [authStatus, setAuthStatus] = useState<AuthStatus>('LANDING');
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Theme Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('campus_elite_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('campus_elite_theme', 'light');
    }
  }, [isDarkMode]);

  // Initial Backend Sync
  useEffect(() => {
    const syncBackend = async () => {
      setIsSyncing(true);
      const profile = await CampusEliteAPI.getProfile();
      if (profile) {
        setUserProfile(profile);
        setAuthStatus('AUTHENTICATED');
        const history = await CampusEliteAPI.getQuizHistory();
        const notifs = await CampusEliteAPI.getNotifications();
        setQuizHistory(history);
        setNotifications(notifs);
      }
      setIsSyncing(false);
    };
    syncBackend();
  }, []);

  const handleRegisterComplete = async (data: UserProfileData) => {
    setIsSyncing(true);
    await CampusEliteAPI.updateProfile(data);
    setUserProfile(data);
    setAuthStatus('AUTHENTICATED');
    setIsSyncing(false);
  };

  const handleQuizComplete = async (result: QuizResult) => {
    setIsSyncing(true);
    await CampusEliteAPI.saveQuizResult(result);
    setQuizHistory(prev => [result, ...prev]);
    setIsSyncing(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (authStatus === 'LANDING') {
    return <LandingPage onLogin={() => setAuthStatus('AUTHENTICATED')} onRegister={() => setAuthStatus('REGISTER')} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
  }

  if (authStatus === 'REGISTER') {
    return <RegisterPage onComplete={handleRegisterComplete} onBack={() => setAuthStatus('LANDING')} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
  }

  if (!userProfile && authStatus === 'AUTHENTICATED') {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.EXAM_PREP, label: 'Exam Prep', icon: BookOpen },
    { id: AppView.NOTES_GEN, label: 'Notes Bot', icon: StickyNote },
    { id: AppView.DOUBT_SOLVER, label: 'Doubts Feed', icon: MessageCircle },
    // Fixed: Property 'PART_MATCH' does not exist on type 'typeof AppView'. Did you mean 'PARTNER_MATCH'?
    { id: AppView.PARTNER_MATCH, label: 'Study Partner', icon: Handshake },
    { id: AppView.DSA_DOSE, label: 'Daily DSA', icon: Code },
    { id: AppView.CHALLENGE_ARENA, label: 'Challenges', icon: Swords },
    { id: AppView.MOCK_INTERVIEW, label: 'Mock Interview', icon: Mic2 },
    { id: AppView.RESUME_GEN, label: 'Resume Builder', icon: FileText },
    { id: AppView.SKILLS, label: 'Skill Lab', icon: Cpu },
    { id: AppView.CAMPUS_CORNER, label: 'Campus Corner', icon: Megaphone },
    { id: AppView.CONNECT_HUB, label: 'Student Connect', icon: Users },
    { id: AppView.SCORECARD, label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 dark:bg-indigo-950 text-white flex flex-col hidden md:flex border-r border-indigo-800/50">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 italic">
            <Trophy className="text-yellow-400" /> CampusElite
          </h1>
        </div>
        <nav className="flex-1 mt-4 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-indigo-600 dark:bg-indigo-800 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div onClick={() => setCurrentView(AppView.PROFILE)} className="p-4 border-t border-indigo-800 cursor-pointer hover:bg-indigo-900 transition-all">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-indigo-400 flex items-center justify-center overflow-hidden">
              {userProfile?.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" /> : <UserCircle size={32} />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{userProfile?.fullName}</p>
              <p className="text-[10px] text-indigo-400 uppercase font-bold">Settings</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {navItems.find(i => i.id === currentView)?.label || 'My Profile'}
            </h2>
            {isSyncing && (
              <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                <CloudLightning size={12} className="animate-pulse" /> Syncing Backend
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsNotifOpen(true)} className="p-2 relative text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell size={20} />
              {notifications.some(n => !n.isRead) && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {(() => {
              switch (currentView) {
                case AppView.DASHBOARD: return <Dashboard userProfile={userProfile!} setView={setCurrentView} history={quizHistory} notifications={notifications} />;
                case AppView.EXAM_PREP: return <ExamPrep onQuizComplete={handleQuizComplete} />;
                case AppView.SCORECARD: return <ScorecardSystem history={quizHistory} />;
                case AppView.PROFILE: return <Profile profileData={userProfile!} onSaveProfile={handleRegisterComplete} setView={setCurrentView} />;
                case AppView.CONNECT_HUB: return <ConnectHub onChallenge={() => setCurrentView(AppView.CHALLENGE_ARENA)} />;
                case AppView.CAMPUS_CORNER: return <CampusCorner />;
                case AppView.DSA_DOSE: return <DSADose onSolve={() => {}} />;
                case AppView.NOTES_GEN: return <NotesGenerator />;
                case AppView.DOUBT_SOLVER: return <DoubtSolver />;
                case AppView.MOCK_INTERVIEW: return <MockInterview />;
                case AppView.RESUME_GEN: return <ResumeGenerator profileData={userProfile!} />;
                case AppView.CHALLENGE_ARENA: return <ChallengeArena />;
                case AppView.PARTNER_MATCH: return <PartnerMatch />;
                default: return <Dashboard userProfile={userProfile!} setView={setCurrentView} history={quizHistory} notifications={notifications} />;
              }
            })()}
          </div>
        </div>

        <NotificationCenter 
          isOpen={isNotifOpen} 
          onClose={() => setIsNotifOpen(false)} 
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <AIChatbot />
      </main>
    </div>
  );
};

export default App;
