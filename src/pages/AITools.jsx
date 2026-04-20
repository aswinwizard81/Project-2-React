import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { generateStudyContent } from '../services/aiService';
import { Sparkles, Loader2, Copy } from 'lucide-react';

const AITools = () => {
  const { state } = useStudy();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (type) => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const data = await generateStudyContent(selectedTopic, type);
      setResult(data);
    } catch (err) {
      setResult("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-3xl text-white shadow-xl">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles /> AI Study Assistant
        </h1>
        <p className="mt-2 text-indigo-100">Generate summaries, quizzes, and flashcards instantly.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <label className="block text-sm font-semibold text-gray-700">What are we studying today?</label>
        <input 
          list="subjects-list"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter a topic or select a subject..."
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        />
        <datalist id="subjects-list">
          {state.subjects.map(s => <option key={s.id} value={s.name} />)}
        </datalist>

        <div className="grid grid-cols-3 gap-3">
          {['summary', 'quiz', 'flashcards'].map((type) => (
            <button
              key={type}
              onClick={() => handleGenerate(type)}
              disabled={loading}
              className="py-3 px-4 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition disabled:opacity-50 capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
      )}

      {result && !loading && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative animate-in fade-in slide-in-from-bottom-4">
          <button 
            onClick={() => navigator.clipboard.writeText(result)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            <Copy size={18} />
          </button>
          <div className="prose prose-indigo max-w-none whitespace-pre-wrap text-gray-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;