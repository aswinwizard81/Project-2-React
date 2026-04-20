import axios from 'axios';

// Replace with your actual Gemini API Key from Google AI Studio
const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const generateStudyContent = async (topic, type) => {
  const prompts = {
    summary: `Provide a concise, bulleted summary of the topic: "${topic}". Focus on key concepts for a college student.`,
    quiz: `Generate 3 multiple-choice questions with answers for the topic: "${topic}".`,
    flashcards: `Create 5 front-and-back flashcard concepts for: "${topic}".`
  };

  try {
    const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: prompts[type] }] }]
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Service Error:", error);
    // This allows the UI to catch the error and show a "sharp" toast notification
    throw new Error(error.response?.data?.error?.message || "Failed to generate AI content.");
  }
};