
import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Trophy, 
  Users, 
  Zap, 
  Timer, 
  ChevronRight, 
  Loader2, 
  Target, 
  CheckCircle2, 
  XCircle, 
  Gamepad2,
  Radar
} from 'lucide-react';
import { PeerChallenge } from '../types';

const ChallengeArena: React.FC = () => {
  const [challenges, setChallenges] = useState<PeerChallenge[]>([
    { id: '1', opponent: 'Sneha Kapur', topic: 'Linked Lists', status: 'ACTIVE', myScore: 8, opponentScore: 9 },
    { id: '2', opponent: 'Vivek Sharma', topic: 'OS Semaphores', status: 'PENDING' },
    { id: '3', opponent: 'Aditya Raj', topic: 'DBMS SQL', status: 'COMPLETED', myScore: 10, opponentScore: 7 },
  ]);

  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [activeDuel, setActiveDuel] = useState<PeerChallenge | null>(null);
  const [duelStep, setDuelStep] = useState(0); // 0: Start, 1: Q1, 2: Q2, 3: Q3, 4: Result
  const [myDuelScore, setMyDuelScore] = useState(0);
  const [arenaPoints, setArenaPoints] = useState(450);

  // Matchmaking Simulation
  const handleMatchmaking = () => {
    setIsMatchmaking(true);
    setTimeout(() => {
      const opponents = ['Ishani Roy', 'Kabir Das', 'Rohan Mehta', 'Ayesha T.'];
      const topics = ['Graphs', 'Probability', 'Recursion', 'SQL Joins'];
      const newChallenge: PeerChallenge = {
        id: Date.now().toString(),
        opponent: opponents[Math.floor(Math.random() * opponents.length)],
        topic: topics[Math.floor(Math.random() * topics.length)],
        status: 'PENDING'
      };
      setChallenges(prev => [newChallenge, ...prev]);
      setIsMatchmaking(false);
    }, 3000);
  };

  const startDuel = (duel: PeerChallenge) => {
    setActiveDuel(duel);
    setDuelStep(1);
    setMyDuelScore(0);
  };

  const handleDuelAnswer = (isCorrect: boolean) => {
    if (isCorrect) setMyDuelScore(prev => prev + 1);
    
    if (duelStep < 3) {
      setDuelStep(prev => prev + 1);
    } else {
      setDuelStep(4);
      finishDuel();
    }
  };

  const finishDuel = () => {
    if (!activeDuel) return;
    const opponentScore = Math.floor(Math.random() * 4); // 0 to 3
    const isVictory = myDuelScore > opponentScore;

    setChallenges(prev => prev.map(c => 
      c.id === activeDuel.id 
        ? { ...c, status: 'COMPLETED', myScore: myDuelScore, opponentScore } 
        : c
    ));

    if (isVictory) setArenaPoints(prev => prev + 150);
    else setArenaPoints(prev => Math.max(0, prev - 50));
  };

  // Duel Mini-Game UI
  if (activeDuel && duelStep < 4) {
    const questions = [
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)"], correct: 1 },
      { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Heap"], correct: 1 },
      { q: "A primary key must be...", options: ["Nullable", "Unique", "Sorted"], correct: 1 },
    ];
    const currentQ = questions[duelStep - 1];

    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-in zoom-in duration-300">
        <div className="flex justify-center gap-12 items-center">
          <div className="space-y-2">
             <div className="w-20 h-20 rounded-full bg-indigo-600 border-4 border-indigo-200 flex items-center justify-center font-black text-2xl text-white">ME</div>
             <p className="font-bold text-slate-800 dark:text-white">Score: {myDuelScore}</p>
          </div>
          <div className="text-4xl font-black text-slate-300 italic">VS</div>
          <div className="space-y-2">
             <div className="w-20 h-20 rounded-full bg-rose-500 border-4 border-rose-200 flex items-center justify-center font-black text-2xl text-white">{activeDuel.opponent.charAt(0)}</div>
             <p className="font-bold text-slate-800 dark:text-white">Opponent</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-8">
           <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Question {duelStep} of 3</p>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">{currentQ.q}</h2>
           </div>
           <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleDuelAnswer(idx === currentQ.correct)}
                  className="w-full py-4 px-6 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-2xl font-bold transition-all text-left flex justify-between items-center group"
                >
                  {opt}
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // Result UI
  if (activeDuel && duelStep === 4) {
    const duelResult = challenges.find(c => c.id === activeDuel.id);
    const isWin = duelResult && (duelResult.myScore || 0) > (duelResult.opponentScore || 0);
    const isDraw = duelResult && (duelResult.myScore || 0) === (duelResult.opponentScore || 0);

    return (
      <div className="max-w-lg mx-auto py-12 text-center space-y-6 animate-in zoom-in duration-500">
         <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl ${isWin ? 'bg-green-100 text-green-600' : isDraw ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-600'}`}>
            {isWin ? <Trophy size={64} /> : isDraw ? <Gamepad2 size={64} /> : <XCircle size={64} />}
         </div>
         <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-800 dark:text-white">
              {isWin ? 'VICTORY!' : isDraw ? 'DRAW!' : 'DEFEAT!'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
              Points: {isWin ? '+150 XP' : isDraw ? '+25 XP' : '-50 XP'}
            </p>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-around">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">You</p>
              <p className="text-3xl font-black text-indigo-600">{duelResult?.myScore}</p>
            </div>
            <div className="w-px bg-slate-100 dark:bg-slate-800" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">{activeDuel.opponent}</p>
              <p className="text-3xl font-black text-rose-500">{duelResult?.opponentScore}</p>
            </div>
         </div>
         <button 
           onClick={() => setActiveDuel(null)}
           className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl"
         >
           Back to Arena
         </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Points */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Challenge Arena</h1>
          <p className="text-slate-500 dark:text-slate-400">Compete with friends and rise up the campus leaderboard.</p>
        </div>
        <div className="flex bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl items-center gap-3 border border-indigo-500/20">
          <Zap size={20} className="text-yellow-400 fill-yellow-400 animate-pulse" />
          <div className="leading-tight">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Arena Power</p>
            <p className="font-black text-xl">{arenaPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-1">
             <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Live Battles</h3>
             <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
               Matchmaking Active
             </span>
          </div>

          <div className="space-y-4">
            {isMatchmaking && (
              <div className="bg-indigo-50 dark:bg-indigo-900/10 border-2 border-dashed border-indigo-200 dark:border-indigo-800 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
                <Radar size={48} className="text-indigo-600 animate-spin" />
                <div>
                   <h4 className="font-black text-indigo-700 dark:text-indigo-400">Syncing with Campus Network...</h4>
                   <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mt-1">Finding Opponents in your Branch</p>
                </div>
              </div>
            )}

            {challenges.map(duel => (
              <div key={duel.id} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group ${duel.status === 'COMPLETED' ? 'opacity-70' : ''}`}>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">ME</div>
                      <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-rose-100 flex items-center justify-center font-bold text-rose-600 text-xs">{duel.opponent.charAt(0)}</div>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 dark:text-white text-lg leading-tight">{duel.topic}</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">VS {duel.opponent}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {duel.status === 'ACTIVE' && (
                       <div className="text-center">
                          <div className="text-2xl font-black text-indigo-600">{duel.myScore} : {duel.opponentScore}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Current Score</div>
                       </div>
                    )}
                    {duel.status === 'PENDING' && (
                       <div className="flex items-center gap-2 text-amber-500 font-bold text-sm bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-800">
                          <Timer size={16} /> Incoming Duel
                       </div>
                    )}
                    {duel.status === 'COMPLETED' && (
                       <div className="text-right">
                          <div className={`text-xl font-black flex items-center gap-2 ${duel.myScore! > duel.opponentScore! ? 'text-green-500' : duel.myScore! === duel.opponentScore! ? 'text-slate-400' : 'text-rose-500'}`}>
                             {duel.myScore! > duel.opponentScore! ? <CheckCircle2 size={18} /> : null}
                             {duel.myScore! > duel.opponentScore! ? 'VICTORY' : duel.myScore! === duel.opponentScore! ? 'DRAW' : 'DEFEAT'}
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{duel.myScore} VS {duel.opponentScore}</p>
                       </div>
                    )}
                    
                    {duel.status !== 'COMPLETED' ? (
                      <button 
                        onClick={() => startDuel(duel)}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <div className="p-3 text-slate-300">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Trophy size={160} />
            </div>
            <h3 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-indigo-400">
              <Users size={14} /> Campus Elite Ranks
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { name: 'Sameer J.', rank: 1, xp: 4850, avatar: 'SJ' },
                { name: 'Me', rank: arenaPoints > 500 ? 12 : 14, xp: arenaPoints, avatar: 'AV' },
                { name: 'Sneha K.', rank: 16, xp: 2790, avatar: 'SK' }
              ].map(user => (
                <div key={user.name} className={`flex justify-between items-center p-3 rounded-2xl transition-all ${user.name === 'Me' ? 'bg-indigo-600/40 border border-indigo-500/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-indigo-400">#{user.rank}</span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-[10px]">{user.avatar}</div>
                    <span className="text-sm font-bold tracking-tight">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-black text-indigo-300 block">{user.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Full Leaderboard
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm space-y-6">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-2xl flex items-center justify-center">
               <Target size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-slate-800 dark:text-white text-lg">New Challenge</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Competitive learning boosts retention by up to 40% compared to solo study."
              </p>
            </div>
            <button 
              onClick={handleMatchmaking}
              disabled={isMatchmaking}
              className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 dark:hover:bg-indigo-700 shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isMatchmaking ? <Loader2 size={18} className="animate-spin" /> : <Swords size={18} />}
              {isMatchmaking ? 'Finding Opponent...' : 'Random Matchmaking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeArena;
