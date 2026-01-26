import { motion } from 'motion/react';
import { Clock, Trophy, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';

interface HistoryProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function History({ userName, userType, onNavigate, onShowProfile, onLogout }: HistoryProps) {
  const historyItems = [
    {
      id: 1,
      date: 'Oct 28, 2024',
      time: '2:45 PM',
      topic: 'Photosynthesis Basics',
      subject: 'Biology',
      score: 4,
      total: 5,
      icon: '🌱',
      duration: '8 min'
    },
    {
      id: 2,
      date: 'Oct 27, 2024',
      time: '4:20 PM',
      topic: 'Newton\'s Laws',
      subject: 'Physics',
      score: 5,
      total: 5,
      icon: '🚀',
      duration: '12 min'
    },
    {
      id: 3,
      date: 'Oct 26, 2024',
      time: '1:15 PM',
      topic: 'French Revolution',
      subject: 'History',
      score: 3,
      total: 5,
      icon: '📚',
      duration: '10 min'
    },
    {
      id: 4,
      date: 'Oct 24, 2024',
      time: '5:30 PM',
      topic: 'Algebra II',
      subject: 'Mathematics',
      score: 3,
      total: 5,
      icon: '📐',
      duration: '15 min'
    },
    {
      id: 5,
      date: 'Oct 23, 2024',
      time: '3:10 PM',
      topic: 'Cell Structure',
      subject: 'Biology',
      score: 5,
      total: 5,
      icon: '🔬',
      duration: '9 min'
    },
    {
      id: 6,
      date: 'Oct 22, 2024',
      time: '6:45 PM',
      topic: 'World War II',
      subject: 'History',
      score: 4,
      total: 5,
      icon: '⚔️',
      duration: '11 min'
    }
  ];

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#FBBF24';
    return '#F472B6';
  };

  const totalQuizzes = historyItems.length;
  const totalCorrect = historyItems.reduce((sum, item) => sum + item.score, 0);
  const totalQuestions = historyItems.reduce((sum, item) => sum + item.total, 0);
  const avgScore = Math.round((totalCorrect / totalQuestions) * 100);

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
          <h2 className="text-2xl lg:text-3xl text-white mb-2">Quiz History 📊</h2>
          <p className="text-gray-400 text-sm lg:text-base">
            Track your progress and review past performances
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
              <h4 className="text-white">Total Quizzes</h4>
            </div>
            <p className="text-3xl text-[#06B6D4]">{totalQuizzes}</p>
            <p className="text-sm text-gray-400 mt-1">Completed</p>
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
            <p className="text-sm text-gray-400 mt-1">Keep it up!</p>
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
            <p className="text-sm text-gray-400 mt-1">Total questions</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-[#312E81]" />

          <div className="space-y-6">
            {historyItems.map((item, idx) => {
              const scoreColor = getScoreColor(item.score, item.total);
              const percentage = (item.score / item.total) * 100;

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
                          <h3 className="text-white mb-1 group-hover:text-[#06B6D4] transition-colors">
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

                      <div className="flex items-center gap-4">
                        {/* Score Display */}
                        <div className="text-center">
                          <div className="text-2xl lg:text-3xl mb-1" style={{ color: scoreColor }}>
                            {item.score}/{item.total}
                          </div>
                          <div className="text-xs text-gray-400">
                            {percentage}%
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className={`px-4 py-2 rounded-lg border-2 ${
                          percentage >= 80
                            ? 'bg-[#10B981]/20 border-[#10B981]'
                            : percentage >= 60
                              ? 'bg-[#FBBF24]/20 border-[#FBBF24]'
                              : 'bg-[#F472B6]/20 border-[#F472B6]'
                        }`}>
                          {percentage >= 80 ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-[#10B981]" />
                              <span className="text-[#10B981] text-sm">Excellent</span>
                            </div>
                          ) : percentage >= 60 ? (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-[#FBBF24]" />
                              <span className="text-[#FBBF24] text-sm">Good</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-[#F472B6]" />
                              <span className="text-[#F472B6] text-sm">Review</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
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
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
