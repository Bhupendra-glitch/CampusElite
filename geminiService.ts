
import { GoogleGenAI, Type } from "@google/genai";
import { Question, StudyNote, ChatMessage } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (topic: string, examType: string): Promise<Question[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Generate 5 multiple-choice questions for a college level ${examType} on the topic: ${topic}. Each question must have exactly 4 options.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Failed to parse quiz JSON", error);
    return [];
  }
};

export const getChatResponse = async (history: ChatMessage[]): Promise<string> => {
  const systemInstruction = `You are "Elite AI", the intelligent assistant for the CampusElite student platform. 
  Your goals are:
  1. Help students with academic doubts.
  2. Explain CampusElite features (Exam Prep, Skill Lab, Daily DSA, Student Connect).
  3. Be encouraging, professional yet witty, and empathetic to college student life.
  4. Keep responses concise but impactful. Use Markdown for formatting.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    })),
    config: {
      systemInstruction,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });

  return response.text || "I'm having a small glitch in my circuits. Could you repeat that?";
};

export const generateStudyNotes = async (topic: string): Promise<StudyNote> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Generate comprehensive study notes for the topic: ${topic}. Include a concise summary, a list of important formulas or laws, and 5 high-yield key points for an exam.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          formulas: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "formulas", "keyPoints"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const generateSkillRoadmap = async (skill: string): Promise<{ weeks: { title: string, topics: string[] }[] }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 4-week learning roadmap for a college student to master ${skill}. Provide 3-4 specific topics per week.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weeks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "e.g. Week 1: Basics" },
                topics: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "topics"]
            }
          }
        },
        required: ["weeks"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const getAIDoubtSolution = async (question: string, subject: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Solve this academic doubt in ${subject}: "${question}". Provide a clear, step-by-step explanation suitable for a college student.`,
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });
  return response.text || "I'm sorry, I couldn't process that doubt. Try rephrasing.";
};

export const getDSADose = async (): Promise<{ title: string, problem: string, hint: string, difficulty: string }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: "Provide a unique Data Structures and Algorithms problem suitable for competitive programming practice. Return a JSON object with title, detailed problem description, a technical hint, and difficulty level (Easy, Medium, or Hard).",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          problem: { type: Type.STRING },
          hint: { type: Type.STRING },
          difficulty: { type: Type.STRING }
        },
        required: ["title", "problem", "hint", "difficulty"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text.trim());
  } catch (err) {
    console.error("DSA parse error", err);
    throw err;
  }
};

export const getPerformanceFeedback = async (score: number, total: number, topic: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `A student scored ${score}/${total} on a test about ${topic}. Provide a short, encouraging feedback and one specific area they should focus on next.`,
    config: {
      thinkingConfig: { thinkingBudget: 0 }
    }
  });
  return response.text || "Keep studying and you will excel!";
};

export const getInterviewQuestion = async (role: string, history: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `You are an expert interviewer for a ${role} position. Based on the conversation history: [${history}], ask the next relevant technical or behavioral question. Keep it concise.`,
  });
  return response.text || "Tell me about yourself.";
};

export const evaluateInterviewAnswer = async (question: string, answer: string): Promise<{ score: number, feedback: string }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate this interview answer. Question: "${question}", Answer: "${answer}". Provide a score from 1-10 and brief constructive feedback.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING }
        },
        required: ["score", "feedback"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};
