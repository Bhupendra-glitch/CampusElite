
import React, { useState } from 'react';
import { Search, Loader2, BookOpen, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { Question, QuizResult } from '../types';
import { generateQuiz, getPerformanceFeedback } from '../geminiService';

interface ExamPrepProps {
  onQuizComplete: (result: QuizResult) => void;
}

const ExamPrep: React.FC<ExamPrepProps> = ({ onQuizComplete }) => {
  const [topic, setTopic] = useState('');
  const [examType, setExamType] = useState('End Term');
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleStartQuiz = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const questions = await generateQuiz(topic, examType);
    setQuiz(questions);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setIsLoading(false);
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = index;
    setUserAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < (quiz?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      quiz?.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswer) score++;
      });
      
      const total = quiz?.length || 0;
      const resultFeedback = await getPerformanceFeedback(score, total, topic);
      setFeedback(resultFeedback);
      
      onQuizComplete({
        score,
        total,
        topic,
        date: new Date().toLocaleDateString(),
        feedback: resultFeedback
      });
      setShowResult(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-indigo-600 gap-4">
        <Loader2 className="animate-spin" size={64} />
        <div className="text-center">
          <p className="text-xl font-bold">Generating Personalized Quiz...</p>
          <p className="text-slate-500">Gemini AI is analyzing {topic} and {examType} PYQs</p>
        </div>
      </div>
    );
  }

  if (showResult && quiz) {
    const score = quiz.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.correctAnswer ? 1 : 0), 0);
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full text-indigo-600 mb-2">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Test Completed!</h2>
          <div className="text-5xl font-extrabold text-indigo-600">
            {score} <span className="text-2xl text-slate-400">/ {quiz.length}</span>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl text-indigo-900 italic">
            "{feedback}"
          </div>
          <button 
            onClick={() => setQuiz(null)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all"
          >
            Practice Another Topic
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl px-2">Review Answers</h3>
          {quiz.map((q, idx) => (
            <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-400">Q{idx + 1}.</span>
                <p className="font-semibold text-slate-800">{q.question}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-8">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className={`p-3 rounded-lg text-sm border ${
                    oIdx === q.correctAnswer 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : oIdx === userAnswers[idx] 
                        ? 'bg-red-50 border-red-200 text-red-800' 
                        : 'bg-slate-50 border-slate-100 text-slate-600'
                  }`}>
                    {opt}
                    {oIdx === q.correctAnswer && <CheckCircle size={14} className="inline ml-2" />}
                    {oIdx === userAnswers[idx] && oIdx !== q.correctAnswer && <XCircle size={14} className="inline ml-2" />}
                  </div>
                ))}
              </div>
              <p className="ml-8 text-xs text-slate-500 bg-slate-50 p-2 rounded italic">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (quiz) {
    const q = quiz[currentQuestionIndex];
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6 px-4">
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {topic} • {examType}
          </span>
          <span className="text-slate-500 font-medium">Question {currentQuestionIndex + 1} of {quiz.length}</span>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-8">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
            />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 leading-relaxed">
            {q.question}
          </h3>
          
          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                  userAnswers[currentQuestionIndex] === idx
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'
                }`}
              >
                <span>{option}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  userAnswers[currentQuestionIndex] === idx ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200'
                }`}>
                  {userAnswers[currentQuestionIndex] === idx && <CheckCircle className="text-white" size={14} />}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              disabled={userAnswers[currentQuestionIndex] === undefined}
              className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                userAnswers[currentQuestionIndex] === undefined
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
              }`}
            >
              {currentQuestionIndex === quiz.length - 1 ? 'Finish Test' : 'Next Question'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">AI Exam Generator</h1>
        <p className="text-slate-500 text-lg">Type any topic from your syllabus to get AI-generated PYQs and mock tests.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Enter Topic or Subject</label>
          <div className="relative">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Operating Systems, Thermodynamics, Discrete Math..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none text-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Exam Context</label>
          <div className="grid grid-cols-2 gap-4">
            {['Class Test (CT)', 'End Term Exam'].map((type) => (
              <button
                key={type}
                onClick={() => setExamType(type)}
                className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                  examType === type ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartQuiz}
          disabled={!topic.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            !topic.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Generate Mock Test <Search size={20} />
        </button>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-bold">Recommended Topics</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Data Structures', 'Microprocessors', 'DBMS', 'Automata Theory'].map(t => (
              <button 
                key={t} 
                onClick={() => setTopic(t)}
                className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;
