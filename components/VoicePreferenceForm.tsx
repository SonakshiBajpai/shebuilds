"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type LogEntry = { who: "User" | "Assistant" | "System"; text: string };

interface VoicePreferenceFormProps {
  onFormUpdate?: (data: any) => void;
}

export default function VoicePreferenceForm({ onFormUpdate }: VoicePreferenceFormProps) {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [listening, setListening] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [formData, setFormData] = useState<any>({});
  const recognitionRef = useRef<any>(null);
  const sessionIdRef = useRef<string>(uuidv4());
  const currentQuestionIndexRef = useRef<number>(0);

  const questions = [
    { key: 'age', question: "What is your age?", type: 'text' },
    { key: 'currentCity', question: "What city are you currently living in?", type: 'text' },
    { key: 'profession', question: "What is your profession or field of work?", type: 'text' },
    { key: 'preferredCity', question: "Which city would you prefer to move to?", type: 'text' },
    { key: 'sleepSchedule', question: "What's your sleep schedule? Are you an early bird, night owl, or flexible?", type: 'select' },
    { key: 'cleanliness', question: "How would you describe your cleanliness level? Very clean, moderately clean, or casual?", type: 'select' },
    { key: 'guestPolicy', question: "What's your guest policy? No guests, occasional guests, or frequent guests?", type: 'select' },
    { key: 'foodHabits', question: "What are your food habits? Vegetarian, non-vegetarian, vegan, or no preference?", type: 'select' },
    { key: 'drinking', question: "Do you drink alcohol? Never, occasionally, socially, or regularly?", type: 'select' },
    { key: 'smoking', question: "Do you smoke? Never, occasionally, or regularly?", type: 'select' },
    { key: 'extroversion', question: "On a scale of 1 to 5, how extroverted are you? 1 being very introverted, 5 being very extroverted.", type: 'number' },
    { key: 'agreeableness', question: "On a scale of 1 to 5, how agreeable are you with others? 1 being competitive, 5 being very cooperative.", type: 'number' },
    { key: 'conscientiousness', question: "On a scale of 1 to 5, how organized are you? 1 being spontaneous, 5 being very organized.", type: 'number' },
    { key: 'neuroticism', question: "On a scale of 1 to 5, how do you handle stress? 1 being very calm, 5 being sensitive to stress.", type: 'number' },
    { key: 'openness', question: "On a scale of 1 to 5, how open are you to new experiences? 1 being prefer routine, 5 being love new experiences.", type: 'number' },
    { key: 'roomType', question: "What type of room do you prefer? Single room, twin sharing, or any?", type: 'select' },
    { key: 'floorPreference', question: "Do you have a floor preference? Ground floor, low floor, mid floor, high floor, or any?", type: 'select' },
    { key: 'windowPreference', question: "What's your window preference? Lots of windows, some windows, or no preference?", type: 'select' },
    { key: 'lightPreference', question: "What's your natural light preference? Bright, moderate, or dim?", type: 'select' },
    { key: 'verifiedOnly', question: "Do you prefer only verified roommates? Yes or no?", type: 'boolean' }
  ];

  const append = (entry: LogEntry) => setLog((l) => [...l, entry]);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SpeechRecognition) {
      append({ who: "System", text: "SpeechRecognition not supported in this browser." });
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = (e: any) => {
      const text = e.results[0][0].transcript.trim();
      append({ who: "User", text });
      setListening(false);
      processUserResponse(text);
    };

    recog.onerror = () => {
      append({ who: "System", text: "Could not understand, please repeat." });
      speak("I didn't catch that. Could you repeat?");
      setListening(false);
    };

    recog.onend = () => setListening(false);

    recognitionRef.current = recog;

    // start conversation with complete context
    setTimeout(() => {
      initializeConversation();
    }, 500);
  }, []);

  const speak = (text: string) => {
    append({ who: "Assistant", text });
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    utter.onend = () => {
      startListening();
    };
  };

  const parseResponse = (answer: string, questionKey: string, questionType: string) => {
    let parsedValue = answer.toLowerCase().trim();
    
    switch (questionType) {
      case 'number':
        const num = parseInt(parsedValue);
        return isNaN(num) ? 3 : Math.max(1, Math.min(5, num)); // Default to 3, clamp between 1-5
      case 'boolean':
        return parsedValue.includes('yes') || parsedValue.includes('true');
      case 'select':
        // Map common responses to form values
        if (questionKey === 'sleepSchedule') {
          if (parsedValue.includes('early') || parsedValue.includes('bird')) return 'early-bird';
          if (parsedValue.includes('night') || parsedValue.includes('owl')) return 'night-owl';
          return 'flexible';
        }
        if (questionKey === 'cleanliness') {
          if (parsedValue.includes('very') && parsedValue.includes('clean')) return 'very-clean';
          if (parsedValue.includes('moderate')) return 'moderately-clean';
          return 'casual';
        }
        if (questionKey === 'guestPolicy') {
          if (parsedValue.includes('no')) return 'no-guests';
          if (parsedValue.includes('frequent')) return 'frequent';
          return 'occasional';
        }
        if (questionKey === 'foodHabits') {
          if (parsedValue.includes('vegetarian') && !parsedValue.includes('non')) return 'vegetarian';
          if (parsedValue.includes('non-vegetarian') || parsedValue.includes('non vegetarian')) return 'non-vegetarian';
          if (parsedValue.includes('vegan')) return 'vegan';
          return 'no-preference';
        }
        if (questionKey === 'drinking' || questionKey === 'smoking') {
          if (parsedValue.includes('never')) return 'never';
          if (parsedValue.includes('regular')) return 'regularly';
          if (parsedValue.includes('social')) return 'socially';
          return 'occasionally';
        }
        if (questionKey === 'roomType') {
          if (parsedValue.includes('single')) return 'Single Room';
          if (parsedValue.includes('twin') || parsedValue.includes('sharing')) return 'Twin Sharing';
          return 'Any';
        }
        if (questionKey === 'floorPreference') {
          if (parsedValue.includes('ground')) return 'Ground Floor';
          if (parsedValue.includes('low')) return 'Low Floor';
          if (parsedValue.includes('mid')) return 'Mid Floor';
          if (parsedValue.includes('high')) return 'High Floor';
          return 'Any';
        }
        return parsedValue;
      default:
        return answer;
    }
  };

  const askNextQuestion = () => {
    const currentIndex = currentQuestionIndexRef.current;
    if (currentIndex >= questions.length) {
      speak("🎉 Congratulations! You've completed all the questions. Your roommate preferences have been saved!");
      return;
    }
    
    const currentQ = questions[currentIndex];
    setCurrentQuestion(currentQ.question);
    console.log(`Asking question ${currentIndex + 1}/${questions.length}:`, currentQ.question);
    speak(currentQ.question);
  };

  const initializeConversation = () => {
    currentQuestionIndexRef.current = 0;
    setQuestionCount(0);
    setFormData({});
    speak("Hi! I'm your roommate preference assistant. I'll ask you all the questions to help find your perfect roommate match. Let's start!");
    setTimeout(() => {
      askNextQuestion();
    }, 2000);
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (e) {
      append({ who: "System", text: "Failed to start listening." });
    }
  };

  const processUserResponse = (message: string) => {
    const currentIndex = currentQuestionIndexRef.current;
    console.log(`Processing response for question ${currentIndex + 1}:`, message);
    
    if (currentIndex >= questions.length) {
      speak("We've already completed all the questions. Thank you!");
      return;
    }

    const currentQ = questions[currentIndex];
    const parsedValue = parseResponse(message, currentQ.key, currentQ.type);
    
    console.log(`Parsed value for ${currentQ.key}:`, parsedValue);
    
    // Update form data using functional update to avoid stale state
    setFormData((prevFormData: any) => {
      const newFormData = { ...prevFormData };
      if (currentQ.key.includes('personality') || ['extroversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'].includes(currentQ.key)) {
        if (!newFormData.personality) newFormData.personality = {};
        newFormData.personality[currentQ.key] = parsedValue;
      } else {
        newFormData[currentQ.key] = parsedValue;
      }
      return newFormData;
    });

    // Log the form field that was populated
    append({ 
      who: "System", 
      text: `✅ Saved "${parsedValue}" to ${currentQ.key.replace(/([A-Z])/g, ' $1').toLowerCase()}` 
    });

    // Increment question index
    currentQuestionIndexRef.current = currentIndex + 1;
    const newCount = currentIndex + 1;
    setQuestionCount(newCount);
    
    console.log(`Moving from question ${currentIndex + 1} to question ${newCount + 1}`);

    // Acknowledge and move to next question
    const acknowledgments = [
      "Got it! ",
      "Perfect! ",
      "Thanks! ",
      "Great choice! ",
      "Noted! "
    ];
    const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    
    if (newCount >= questions.length) {
      speak(`${ack}That completes all the questions! 🎉 Your roommate preferences have been saved and you're ready to find perfect matches!`);
      // Get the final form data and pass it to parent
      setFormData((finalFormData: any) => {
        if (onFormUpdate) {
          onFormUpdate(finalFormData);
        }
        return finalFormData;
      });
    } else {
      const nextQuestion = questions[newCount];
      console.log(`Asking next question (${newCount + 1}/${questions.length}):`, nextQuestion.question);
      speak(`${ack}Next question: ${nextQuestion.question}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            🎤 Voice Onboarding Assistant
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Complete your roommate preference profile by speaking naturally
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm text-center mb-3">
              <strong>📋 Complete Questionnaire:</strong> I'll ask you 20 questions covering basic details, lifestyle, personality, room preferences, and safety. Just speak naturally!
            </p>
            <p className="text-blue-600 text-xs text-center">
              ✨ Your responses will automatically fill the onboarding form fields
            </p>
            {questionCount > 0 && (
              <div className="mt-3">
                <div className="flex justify-between items-center text-xs text-blue-600 mb-1">
                  <span>Progress</span>
                  <div className="flex items-center space-x-2">
                    <span>{questionCount}/{questions.length} questions</span>
                    {questionCount >= questions.length && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        ✓ Complete!
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      questionCount >= questions.length ? 'bg-green-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${(questionCount / questions.length) * 100}%` }}
                  />
                </div>
                {currentQuestion && questionCount < questions.length && (
                  <div className="mt-2 text-xs text-blue-800 font-medium">
                    Current: {currentQuestion}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => {
                setLog([]);
                setQuestionCount(0);
                setFormData({});
                currentQuestionIndexRef.current = 0;
                sessionIdRef.current = uuidv4();
                initializeConversation();
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              🔄 Restart Conversation
            </button>
            
            <button 
              onClick={startListening} 
              disabled={listening}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                listening 
                  ? 'bg-red-500 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
              }`}
            >
              {listening ? "🎙️ Listening..." : "🎤 Speak Answer"}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Log</h3>
            <div className="space-y-3">
              {log.map((entry, i) => (
                <div key={i} className={`p-3 rounded-lg ${
                  entry.who === "User" 
                    ? "bg-blue-100 text-blue-900 ml-8" 
                    : entry.who === "Assistant"
                    ? "bg-green-100 text-green-900 mr-8"
                    : entry.text.includes("✅ Saved")
                    ? "bg-purple-100 text-purple-900"
                    : "bg-yellow-100 text-yellow-900"
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {entry.who === "User" ? "👤" : entry.who === "Assistant" ? "🤖" : entry.text.includes("✅ Saved") ? "💾" : "⚠️"} 
                      {entry.who === "System" && entry.text.includes("✅ Saved") ? "Form Field" : entry.who}:
                    </span>
                  </div>
                  <p className="mt-1">{entry.text}</p>
                </div>
              ))}
              {log.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Conversation will appear here...
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              💡 Make sure to allow microphone access when prompted
            </p>
            <p className="text-xs text-gray-400">
              🎯 I'll guide you through all {questions.length} questions automatically - no typing needed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 