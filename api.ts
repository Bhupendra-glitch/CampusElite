
import { Doubt, PeerChallenge, QuizResult, SmartNotification, UserProfileData } from './types';

// Mock DB Initial State
const INITIAL_DOUBTS: Doubt[] = [
  { id: '1', author: 'Sameer', subject: 'Data Structures', question: 'What is the difference between a Red-Black Tree and an AVL Tree?', timestamp: '2h ago', status: 'OPEN', upvotes: 12 },
  // Fixed: An object literal cannot have multiple properties with the same name. (removed duplicate upvotes: 8)
  { id: '2', author: 'Neha', subject: 'Operating Systems', question: 'How does the Banker\'s algorithm prevent deadlock effectively?', timestamp: '5h ago', status: 'SOLVED', upvotes: 8, aiResponse: 'The Banker\'s algorithm simulates allocation to ensure the system stays in a safe state.' }
];

const STORAGE_KEYS = {
  PROFILE: 'ce_backend_profile',
  HISTORY: 'ce_backend_history',
  DOUBTS: 'ce_backend_doubts',
  CHALLENGES: 'ce_backend_challenges',
  NOTIFICATIONS: 'ce_backend_notifs',
  WAITLIST: 'ce_backend_waitlist'
};

// Simulation helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CampusEliteAPI = {
  // --- Profile ---
  async getProfile(): Promise<UserProfileData | null> {
    await delay(600);
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  },

  async updateProfile(profile: UserProfileData): Promise<void> {
    await delay(800);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  // --- Doubts ---
  async getDoubts(): Promise<Doubt[]> {
    await delay(700);
    const data = localStorage.getItem(STORAGE_KEYS.DOUBTS);
    return data ? JSON.parse(data) : INITIAL_DOUBTS;
  },

  async saveDoubt(doubt: Doubt): Promise<void> {
    await delay(500);
    const existing = await this.getDoubts();
    const updated = [doubt, ...existing];
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
  },

  async updateDoubt(id: string, updates: Partial<Doubt>): Promise<void> {
    const existing = await this.getDoubts();
    const updated = existing.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
  },

  // --- Quiz History ---
  async getQuizHistory(): Promise<QuizResult[]> {
    await delay(400);
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  async saveQuizResult(result: QuizResult): Promise<void> {
    await delay(400);
    const existing = await this.getQuizHistory();
    const updated = [result, ...existing];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  },

  // --- Challenges ---
  async getChallenges(): Promise<PeerChallenge[]> {
    await delay(600);
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    const initial: PeerChallenge[] = [
      { id: '1', opponent: 'Sneha Kapur', topic: 'Linked Lists', status: 'ACTIVE', myScore: 8, opponentScore: 9 },
      { id: '2', opponent: 'Vivek Sharma', topic: 'OS Semaphores', status: 'PENDING' }
    ];
    return data ? JSON.parse(data) : initial;
  },

  async saveChallenge(challenge: PeerChallenge): Promise<void> {
    const existing = await this.getChallenges();
    const updated = [challenge, ...existing];
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(updated));
  },

  // --- Campus Corner ---
  async joinWaitlist(): Promise<void> {
    await delay(1200);
    localStorage.setItem(STORAGE_KEYS.WAITLIST, 'true');
  },

  async getWaitlistStatus(): Promise<boolean> {
    return localStorage.getItem(STORAGE_KEYS.WAITLIST) === 'true';
  },

  // --- Notifications ---
  async getNotifications(): Promise<SmartNotification[]> {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const initial: SmartNotification[] = [
      { id: '1', title: 'CT Alert', message: 'Discrete Math CT tomorrow at 10 AM.', type: 'CT', timestamp: '2h ago', isRead: false },
      { id: '2', title: 'New Internship', message: 'Microsoft SWE Intern roles are now open.', type: 'INTERN', timestamp: '5h ago', isRead: false }
    ];
    return data ? JSON.parse(data) : initial;
  },

  async markNotifRead(id: string): Promise<void> {
    const existing = await this.getNotifications();
    const updated = existing.map(n => n.id === id ? { ...n, isRead: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  }
};
