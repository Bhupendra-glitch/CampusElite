
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  EXAM_PREP = 'EXAM_PREP',
  DSA_DOSE = 'DSA_DOSE',
  SKILLS = 'SKILLS',
  CAMPUS_CORNER = 'CAMPUS_CORNER',
  CONNECT_HUB = 'CONNECT_HUB',
  SCORECARD = 'SCORECARD',
  PROFILE = 'PROFILE',
  CHALLENGE_ARENA = 'CHALLENGE_ARENA',
  RESUME_GEN = 'RESUME_GEN',
  MOCK_INTERVIEW = 'MOCK_INTERVIEW',
  NOTES_GEN = 'NOTES_GEN',
  DOUBT_SOLVER = 'DOUBT_SOLVER',
  PARTNER_MATCH = 'PARTNER_MATCH'
}

export type AuthStatus = 'LANDING' | 'REGISTER' | 'AUTHENTICATED';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  date: string;
  topic: string;
  feedback: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  role: string;
  github: string;
  linkedin: string;
  avatar: string;
  skills: string[];
  weakAreas?: string[];
  availability?: string;
}

export interface UserProfileData {
  fullName: string;
  rollNumber: string;
  branchYear: string;
  collegeName: string;
  email: string; // New field
  bio: string;
  photoUrl: string;
}

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'CT' | 'INTERN' | 'DSA' | 'CHALLENGE' | 'DOUBT';
  timestamp: string;
  isRead: boolean;
}

export interface PeerChallenge {
  id: string;
  opponent: string;
  topic: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
  myScore?: number;
  opponentScore?: number;
}

export interface InterviewMessage {
  role: 'ai' | 'user';
  text: string;
  feedback?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface StudyNote {
  summary: string;
  formulas: string[];
  keyPoints: string[];
}

export interface Doubt {
  id: string;
  author: string;
  subject: string;
  question: string;
  timestamp: string;
  status: 'OPEN' | 'SOLVED';
  aiResponse?: string;
  upvotes: number;
}
