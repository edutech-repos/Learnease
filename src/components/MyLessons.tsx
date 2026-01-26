import { motion } from 'motion/react';
import { Eye, Gamepad2, Download } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';

interface MyLessonsProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  onViewLesson?: (lessonId: number) => void;
  onStartQuiz?: (lessonId: number) => void;
}

export function MyLessons({
  userName,
  userType,
  onNavigate,
  onShowProfile,
  onLogout,
  onViewLesson,
  onStartQuiz
}: MyLessonsProps) {
  const lessons = [
    {
      id: 1,
      title: 'Introduction to Thermodynamics',
      subject: 'Physics',
      icon: '🔥',
      quizTaken: true,
      score: 4,
      total: 5,
      color: '#06B6D4'
    },
    {
      id: 2,
      title: 'Photosynthesis & Plant Biology',
      subject: 'Biology',
      icon: '🌱',
      quizTaken: true,
      score: 5,
      total: 5,
      color: '#10B981'
    },
    {
      id: 3,
      title: 'The French Revolution',
      subject: 'History',
      icon: '🇫🇷',
      quizTaken: true,
      score: 5,
      total: 5,
      color: '#F472B6'
    },
    {
      id: 4,
      title: 'Quadratic Equations Fundamentals',
      subject: 'Mathematics',
      icon: '📐',
      quizTaken: true,
      score: 3,
      total: 5,
      color: '#FBBF24'
    },
    {
      id: 5,
      title: 'Python Functions & Methods',
      subject: 'Programming',
      icon: '🐍',
      quizTaken: true,
      score: 3,
      total: 5,
      color: '#8B5CF6'
    },
    {
      id: 6,
      title: 'Shakespeare\'s Tragedies',
      subject: 'Literature',
      icon: '📚',
      quizTaken: true,
      score: 4,
      total: 5,
      color: '#EC4899'
    }
  ];

  return (
    <NavigationLayout
      userName={userName}
      userType={userType}
      currentScreen="lessons"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl text-white mb-2">Your Knowledge Vault ⚡️</h2>
            <p className="text-gray-400 text-sm lg:text-base">
              {lessons.length} lessons generated • Review notes or test your knowledge
            </p>
          </div>
          <motion.button
            onClick={() => alert('Downloading all lessons as PDF bundle... (Mock Action)')}
            className="flex items-center gap-2 px-6 py-3 bg-[#312E81] border border-[#06B6D4]/50 rounded-xl text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Download All Notes</span>
          </motion.button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              className="bg-[#312E81] rounded-xl p-6 border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] transition-all relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${lesson.color}15, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                {/* Icon & Subject Badge */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#1E1B4B] flex items-center justify-center text-3xl border-2 border-transparent group-hover:border-[#06B6D4]/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {lesson.icon}
                  </motion.div>

                  {/* Status Badge */}
                  {lesson.quizTaken ? (
                    <div className="px-3 py-1.5 bg-[#10B981]/20 border border-[#10B981] rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-sm text-[#10B981]">
                        Score: {lesson.score}/{lesson.total}
                      </span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-[#FBBF24]/20 border border-[#FBBF24] rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
                      <span className="text-sm text-[#FBBF24]">Pending Quiz</span>
                    </div>
                  )}
                </div>

                {/* Title & Subject */}
                <h3 className="text-white text-lg mb-2 group-hover:text-[#06B6D4] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5">{lesson.subject}</p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => onViewLesson?.(lesson.id)}
                    className="flex-1 py-2.5 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-lg text-[#06B6D4] flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.02,
                      borderColor: '#06B6D4',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Review Notes</span>
                  </motion.button>

                  <motion.button
                    onClick={() => alert(`Downloading PDF for ${lesson.title}...`)}
                    className="p-2.5 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-lg text-[#06B6D4] flex items-center justify-center relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#06B6D4',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={() => onStartQuiz?.(lesson.id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-lg text-white flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 20px rgba(244, 114, 182, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Gamepad2 className="w-4 h-4 relative z-10" />
                    <span className="text-sm relative z-10">
                      {lesson.quizTaken ? 'Retake Quiz' : 'Attempt Quiz'}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Corner Accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: lesson.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-8 bg-[#312E81] rounded-xl p-6 border border-[#06B6D4]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl text-[#10B981] mb-1">
                {lessons.filter(l => l.quizTaken).length}
              </div>
              <div className="text-gray-400 text-sm">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#FBBF24] mb-1">
                {lessons.filter(l => !l.quizTaken).length}
              </div>
              <div className="text-gray-400 text-sm">Pending Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#F472B6] mb-1">
                {Math.round(
                  lessons
                    .filter(l => l.quizTaken)
                    .reduce((acc, l) => acc + (l.score! / l.total!) * 100, 0) /
                  lessons.filter(l => l.quizTaken).length
                )}%
              </div>
              <div className="text-gray-400 text-sm">Average Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </NavigationLayout>
  );
}