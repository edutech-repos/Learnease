import { motion } from 'motion/react';
import { Clock, Trophy, TrendingUp, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';
import { useState, useEffect } from 'react';
import { fetchStudyMaterials } from '../lib/supabase';

interface HistoryProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  userId?: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function History({ userName, userType, userId, onNavigate, onShowProfile, onLogout }: HistoryProps) {
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (userId) {
        setIsLoading(true);
        const { data, error } = await fetchStudyMaterials(userId);
        if (data) {
          // Filter for items that represent some history (e.g., have been created)
          // For Quiz History, ideally we only show items where a quiz was attempted.
          // But effectively, every lesson is a history item.
          // Let's verify if we should only show items with quiz_data or scores.
          // The UI emphasizes scores. So let's include items, but zero out pending ones.

          const mapped = data.map((item: any) => {
            const hasQuiz = item.quiz_data && Array.isArray(item.quiz_data) && item.quiz_data.length > 0;
            const score = item.quiz_score || 0;
            const total = hasQuiz ? item.quiz_data.length : 5; // Default 5

            // Format date
            const dateObj = new Date(item.created_at);
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

            return {
              id: item.id,
              date: dateStr,
              time: timeStr,
              topic: item.title || 'Untitled Topic',
              subject: 'General Knowledge', // Placeholder as we don't strictly have subject column yet
              score: score,
              total: total,
              icon: hasQuiz ? '🏆' : '📝',
              duration: '5 min', // Mock duration
              hasQuiz: hasQuiz
            };
          });

          // Sort by date desc (default from fetch, but good to ensure)
          setHistoryItems(mapped);
        }
        setIsLoading(false);
      }
    }
    loadHistory();
  }, [userId]);

  const getScoreColor = (score: number, total: number) => {
    if (total === 0) return '#6B7280';
    const percentage = (score / total) * 100;
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#FBBF24';
    return '#F472B6';
  };

  const totalQuizzes = historyItems.filter(i => i.hasQuiz).length;
  // Calculate average only based on taken quizzes
  const quizzesTakenItems = historyItems.filter(i => i.hasQuiz);
  const totalCorrect = quizzesTakenItems.reduce((sum, item) => sum + item.score, 0);
  const totalQuestions = quizzesTakenItems.reduce((sum, item) => sum + item.total, 0);

  const avgScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <NavigationLayout
      userName={userName}
      userType={userType}
      currentScreen="history"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl text-white mb-2">History & Progress 📊</h2>
          <p className="text-gray-400 text-sm lg:text-base">
            Track your learning journey and quiz performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#06B6D4]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#06B6D4]/20 rounded-lg">
                <Trophy className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <h4 className="text-white">Lessons Created</h4>
            </div>
            <p className="text-3xl text-[#06B6D4]">{historyItems.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total Materials</p>
          </motion.div>

          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#10B981]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#10B981]/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <h4 className="text-white">Average Score</h4>
            </div>
            <p className="text-3xl text-[#10B981]">{avgScore}%</p>
            <p className="text-sm text-gray-400 mt-1">On {totalQuizzes} Quizzes</p>
          </motion.div>

          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#FBBF24]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#FBBF24]/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#FBBF24]" />
              </div>
              <h4 className="text-white">Correct Answers</h4>
            </div>
            <p className="text-3xl text-[#FBBF24]">{totalCorrect}/{totalQuestions}</p>
            <p className="text-sm text-gray-400 mt-1">Across all quizzes</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-[#312E81]" />

          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 text-[#06B6D4] animate-spin" />
              </div>
            ) : historyItems.length === 0 ? (
              <div className="pl-16 text-gray-400">No history found. Start your first lesson!</div>
            ) : (
              historyItems.map((item, idx) => {
                const scoreColor = getScoreColor(item.score, item.total);
                const percentage = item.total > 0 ? (item.score / item.total) * 100 : 0;

                return (
                  <motion.div
                    key={item.id}
                    className="relative pl-16 lg:pl-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className="absolute left-4 lg:left-6 top-6 w-5 h-5 rounded-full border-4 border-[#1E1B4B] z-10"
                      style={{ backgroundColor: scoreColor }}
                      whileHover={{ scale: 1.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 0 0 ${scoreColor}40`,
                            `0 0 0 8px ${scoreColor}00`,
                            `0 0 0 0 ${scoreColor}00`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      className="bg-[#312E81] rounded-xl p-5 border border-[#06B6D4]/30 hover:border-[#06B6D4] transition-all group cursor-pointer"
                      whileHover={{ scale: 1.01, x: 5 }}
                      onClick={() => {
                        // Ideally navigate to review or quiz
                        onNavigate('lessons');
                      }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <motion.div
                            className="text-3xl lg:text-4xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.div>

                          <div className="flex-1">
                            <h3 className="text-white mb-1 group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                              {item.topic}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-2">
                              <span>{item.subject}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-600" />
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.date}</span>
                              <span>•</span>
                              <span>{item.time}</span>
                            </div>
                          </div>
                        </div>

                        {item.hasQuiz && (
                          <div className="flex items-center gap-4">
                            {/* Score Display */}
                            <div className="text-center">
                              <div className="text-2xl lg:text-3xl mb-1" style={{ color: scoreColor }}>
                                {item.score}/{item.total}
                              </div>
                              <div className="text-xs text-gray-400">
                                {Math.round(percentage)}%
                              </div>
                            </div>
                          </div>
                        )}

                        {!item.hasQuiz && (
                          <div className="flex items-center gap-4 text-gray-500 text-sm italic">
                            No Quiz Taken
                          </div>
                        )}
                      </div>

                      {/* Progress Bar (Only if quiz taken) */}
                      {item.hasQuiz && (
                        <div className="mt-4">
                          <div className="h-1.5 bg-[#1E1B4B] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: scoreColor }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: idx * 0.05 }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              }))}
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
