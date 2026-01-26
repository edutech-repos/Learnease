import { motion } from 'motion/react';
import { BookOpen, Play, Clock, TrendingUp } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';

interface MyLessonsProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function MyLessons({ userName, userType, onNavigate, onShowProfile, onLogout }: MyLessonsProps) {
  const lessons = [
    {
      id: 1,
      title: 'Understanding Photosynthesis',
      subject: 'Biology',
      icon: '🌱',
      date: 'Today',
      duration: '15 min',
      progress: 100,
      color: '#10B981'
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      icon: '🚀',
      date: 'Yesterday',
      duration: '22 min',
      progress: 75,
      color: '#06B6D4'
    },
    {
      id: 3,
      title: 'French Revolution Overview',
      subject: 'History',
      icon: '📚',
      date: '2 days ago',
      duration: '18 min',
      progress: 100,
      color: '#F472B6'
    },
    {
      id: 4,
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      icon: '📐',
      date: '3 days ago',
      duration: '25 min',
      progress: 50,
      color: '#FBBF24'
    },
    {
      id: 5,
      title: 'Python Functions & Methods',
      subject: 'Programming',
      icon: '🐍',
      date: '5 days ago',
      duration: '30 min',
      progress: 30,
      color: '#8B5CF6'
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
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl text-white mb-2">My Lessons 📖</h2>
          <p className="text-gray-400 text-sm lg:text-base">
            {lessons.length} lessons generated • Continue where you left off
          </p>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              className="bg-[#312E81] rounded-xl p-5 lg:p-6 border border-[#06B6D4]/30 hover:border-[#06B6D4] transition-all group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Icon & Subject */}
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-[#1E1B4B] flex items-center justify-center text-3xl border-2 border-transparent group-hover:border-[#06B6D4] transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {lesson.icon}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-white mb-1 group-hover:text-[#06B6D4] transition-colors">
                      {lesson.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-gray-400">{lesson.subject}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-gray-500">{lesson.date}</span>
                    </div>
                  </div>
                </div>

                {/* Progress & Action */}
                <div className="flex items-center gap-4">
                  {/* Progress Circle */}
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#1E1B4B"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke={lesson.color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: lesson.progress / 100 }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        style={{
                          filter: `drop-shadow(0 0 5px ${lesson.color})`
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      {lesson.progress}%
                    </div>
                  </div>

                  {/* Study Button */}
                  <motion.button
                    className="px-6 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-lg text-white flex items-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Play className="w-4 h-4" fill="white" />
                    <span className="relative">
                      {lesson.progress === 100 ? 'Review' : 'Continue'}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar (Mobile) */}
              <div className="mt-4 lg:hidden">
                <div className="h-1.5 bg-[#1E1B4B] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: lesson.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lesson.progress}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#10B981]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#10B981]/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <h4 className="text-white">Completed</h4>
            </div>
            <p className="text-3xl text-[#10B981]">3</p>
            <p className="text-sm text-gray-400 mt-1">Lessons finished</p>
          </motion.div>

          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#FBBF24]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#FBBF24]/20 rounded-lg">
                <Clock className="w-5 h-5 text-[#FBBF24]" />
              </div>
              <h4 className="text-white">In Progress</h4>
            </div>
            <p className="text-3xl text-[#FBBF24]">2</p>
            <p className="text-sm text-gray-400 mt-1">Keep going!</p>
          </motion.div>

          <motion.div
            className="bg-[#312E81] rounded-xl p-5 border border-[#F472B6]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#F472B6]/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-[#F472B6]" />
              </div>
              <h4 className="text-white">Total Time</h4>
            </div>
            <p className="text-3xl text-[#F472B6]">110</p>
            <p className="text-sm text-gray-400 mt-1">Minutes learned</p>
          </motion.div>
        </div>
      </div>
    </NavigationLayout>
  );
}
