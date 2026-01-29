import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Loader2, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { QuizQuestion, generateQuiz, generateQuizMock, GenerateQuizRequest } from '../lib/api';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    textContent: string;
    userId: string;
    initialData?: { question: string; options: string[]; answer: string }[];
}

export function QuizModal({ isOpen, onClose, textContent, userId, initialData }: QuizModalProps) {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    const startQuiz = async () => {
        setIsLoading(true);
        setError(null);
        setHasStarted(true);

        // Use initial data if available
        if (initialData && initialData.length > 0) {
            // Convert initial data format (answer string) to QuizQuestion format (answer index)
            const convertedQuestions: QuizQuestion[] = initialData.map((q, idx) => ({
                id: idx + 1,
                question: q.question,
                options: q.options,
                correctAnswer: q.options.indexOf(q.answer) !== -1 ? q.options.indexOf(q.answer) : 0
            }));

            setQuestions(convertedQuestions);
            setSelectedAnswers(new Array(convertedQuestions.length).fill(null));
            setCurrentQuestion(0);
            setShowResults(false);
            setIsLoading(false);
            return;
        }

        try {
            const request: GenerateQuizRequest = {
                userId,
                textContent,
            };

            const response = await generateQuiz(request);
            setQuestions(response.questions);
            setSelectedAnswers(new Array(response.questions.length).fill(null));
            setCurrentQuestion(0);
            setShowResults(false);
        } catch (err) {
            console.error('Quiz generation failed:', err);
            // Use mock quiz as fallback
            const mockResponse = generateQuizMock({ userId, textContent });
            setQuestions(mockResponse.questions);
            setSelectedAnswers(new Array(mockResponse.questions.length).fill(null));
            setError('Using offline quiz - webhook unavailable');
        } finally {
            setIsLoading(false);
        }
    };

    const selectAnswer = (optionIndex: number) => {
        if (showResults) return;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = optionIndex;
        setSelectedAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setShowResults(false);
    };

    if (!isOpen) return null;

    const currentQ = questions[currentQuestion];
    const score = calculateScore();
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-[#1E1B4B] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#06B6D4]/30"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[#06B6D4]/20">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl text-white flex items-center gap-2">
                                🎯 Quiz Time
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        {error && (
                            <div className="mt-3 text-sm text-yellow-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {!hasStarted && (
                            <motion.div
                                className="text-center py-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl text-white mb-2">Ready to test your knowledge?</h3>
                                <p className="text-gray-400 mb-6">
                                    We'll generate 5 questions based on your lesson content.
                                </p>
                                <motion.button
                                    onClick={startQuiz}
                                    disabled={isLoading}
                                    className="px-8 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white font-bold flex items-center gap-2 mx-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating Quiz...
                                        </>
                                    ) : (
                                        <>
                                            Start Quiz
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        )}

                        {isLoading && hasStarted && (
                            <div className="text-center py-12">
                                <Loader2 className="w-12 h-12 text-[#06B6D4] animate-spin mx-auto mb-4" />
                                <p className="text-gray-400">Generating your quiz...</p>
                            </div>
                        )}

                        {!isLoading && hasStarted && questions.length > 0 && !showResults && currentQ && (
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {/* Progress */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                                        <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                                    </div>
                                    <div className="h-2 bg-[#312E81] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <h3 className="text-lg text-white mb-6">{currentQ.question}</h3>

                                {/* Options */}
                                <div className="space-y-3">
                                    {currentQ.options.map((option, idx) => {
                                        const isSelected = selectedAnswers[currentQuestion] === idx;
                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() => selectAnswer(idx)}
                                                className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${isSelected
                                                    ? 'bg-[#06B6D4]/20 border-2 border-[#06B6D4]'
                                                    : 'bg-[#312E81] border-2 border-transparent hover:border-[#06B6D4]/50'
                                                    }`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isSelected ? 'bg-[#06B6D4] text-white' : 'bg-[#1E1B4B] text-gray-400'
                                                    }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="text-white">{option}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        onClick={prevQuestion}
                                        disabled={currentQuestion === 0}
                                        className={`px-6 py-2 rounded-lg ${currentQuestion === 0
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-[#312E81] text-white hover:bg-[#312E81]/80'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={nextQuestion}
                                        disabled={selectedAnswers[currentQuestion] === null}
                                        className={`px-6 py-2 rounded-lg ${selectedAnswers[currentQuestion] === null
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white'
                                            }`}
                                    >
                                        {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Results */}
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {/* Score Header */}
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="inline-block"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 80 ? 'text-[#FBBF24]' :
                                            percentage >= 60 ? 'text-[#06B6D4]' :
                                                'text-gray-400'
                                            }`} />
                                    </motion.div>
                                    <h3 className="text-2xl text-white mb-2">Quiz Complete!</h3>
                                    <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-[#10B981]' :
                                        percentage >= 60 ? 'text-[#06B6D4]' :
                                            percentage >= 40 ? 'text-[#FBBF24]' :
                                                'text-[#EF4444]'
                                        }`}>
                                        {score} / {questions.length}
                                    </div>
                                    <p className="text-gray-400 mt-2">{percentage}% Correct</p>
                                </div>

                                {/* Answer Review */}
                                <div className="space-y-4 mb-6">
                                    <h4 className="text-white font-medium">Review Answers:</h4>
                                    {questions.map((q, idx) => {
                                        const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                                        const userAnswer = selectedAnswers[idx];
                                        return (
                                            <motion.div
                                                key={idx}
                                                className={`p-4 rounded-xl border-2 ${isCorrect ? 'bg-[#10B981]/10 border-[#10B981]/50' : 'bg-[#EF4444]/10 border-[#EF4444]/50'
                                                    }`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm mb-2">{q.question}</p>
                                                        {!isCorrect && userAnswer !== null && (
                                                            <p className="text-[#EF4444] text-sm">
                                                                Your answer: {q.options[userAnswer]}
                                                            </p>
                                                        )}
                                                        <p className="text-[#10B981] text-sm">
                                                            Correct: {q.options[q.correctAnswer]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <motion.button
                                        onClick={resetQuiz}
                                        className="flex-1 py-3 bg-[#312E81] border border-[#06B6D4]/50 rounded-xl text-white flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Try Again
                                    </motion.button>
                                    <motion.button
                                        onClick={onClose}
                                        className="flex-1 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Done
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
