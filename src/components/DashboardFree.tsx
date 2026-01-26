import { motion } from 'motion/react';
import { Upload, Flame, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { NavigationLayout } from './NavigationLayout';

interface DashboardFreeProps {
  userName: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function DashboardFree({ userName, onNavigate, onShowProfile, onLogout }: DashboardFreeProps) {
  const [isDragging, setIsDragging] = useState(false);

  const trendingTopics = [
    { title: 'Quantum Physics 101', icon: '⚛️', students: '12.3k', difficulty: 'Advanced' },
    { title: 'French Revolution', icon: '🇫🇷', students: '8.7k', difficulty: 'Intermediate' },
    { title: 'Python Basics', icon: '🐍', students: '25.1k', difficulty: 'Beginner' },
    { title: 'Human Anatomy', icon: '🫀', students: '15.4k', difficulty: 'Intermediate' },
    { title: 'Climate Change', icon: '🌍', students: '9.2k', difficulty: 'Beginner' },
    { title: 'Shakespeare Works', icon: '📖', students: '6.8k', difficulty: 'Advanced' }
  ];

  return (
    <NavigationLayout
      userName={userName}
      userType="free"
      currentScreen="dashboard"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Hero Upload Section */}
        <motion.div
          className={`relative bg-[#312E81] rounded-2xl p-6 lg:p-10 mb-8 border-2 transition-all ${
            isDragging 
              ? 'border-solid border-[#10B981] glow-green' 
              : 'border-dashed border-[#06B6D4] glow-cyan'
          }`}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                filter: [
                  'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))',
                  'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))',
                  'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Upload className="w-16 h-16 lg:w-20 lg:h-20 text-[#06B6D4] mb-4" />
            </motion.div>
            <h2 className="text-xl lg:text-2xl text-white mb-2">Drag & Drop your PDF here to spark knowledge!</h2>
            <p className="text-gray-400 text-sm lg:text-base mb-1">Support for PDF, DOCX, TXT files up to 10MB</p>
            <p className="text-[#FBBF24] text-xs lg:text-sm mb-6">5 lessons remaining this month</p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white glow-cyan"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Files
            </motion.button>
          </div>
        </motion.div>

        {/* Upsell Banner */}
        <motion.div
          className="relative bg-gradient-to-r from-[#F472B6]/20 to-[#FBBF24]/20 rounded-xl p-6 mb-8 border-2 border-[#F472B6]/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#F472B6]/10 to-[#FBBF24]/10"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                <span>Unlock Weakness Analysis with Premium ⚡️</span>
              </h3>
              <p className="text-gray-300 text-sm">
                Get AI-powered insights into your weak topics and personalized improvement plans
              </p>
            </div>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-lg text-[#1E1B4B] flex items-center gap-2 whitespace-nowrap relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Upgrade Now</span>
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#FBBF24]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -20]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>

        {/* Trending Sparks Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-[#F472B6]" />
            <h3 className="text-xl lg:text-2xl text-white">Trending Sparks 🔥</h3>
          </div>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">
            Popular topics other learners are exploring right now
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                className="bg-[#312E81] rounded-xl p-5 border border-[#06B6D4]/30 cursor-pointer relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ 
                  scale: 1.03,
                  borderColor: '#06B6D4',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
                }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/0 to-[#F472B6]/0 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  whileHover={{
                    background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(244, 114, 182, 0.1))'
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{topic.icon}</span>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      topic.difficulty === 'Beginner' 
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/50'
                        : topic.difficulty === 'Intermediate'
                          ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/50'
                          : 'bg-[#F472B6]/20 text-[#F472B6] border border-[#F472B6]/50'
                    }`}>
                      {topic.difficulty}
                    </div>
                  </div>

                  <h4 className="text-white mb-3 group-hover:text-[#06B6D4] transition-colors">
                    {topic.title}
                  </h4>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {topic.students} students
                    </span>
                    <motion.span 
                      className="text-[#06B6D4] opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      Start →
                    </motion.span>
                  </div>
                </div>

                {/* Spark Animation on Hover */}
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#FBBF24]"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: Math.cos((i * Math.PI * 2) / 4) * 15,
                        y: Math.sin((i * Math.PI * 2) / 4) * 15
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 text-sm mb-3">
            Want unlimited lessons and advanced features?
          </p>
          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-[#FBBF24] rounded-xl text-[#FBBF24] hover:bg-[#FBBF24]/10 transition-all inline-flex items-center gap-2"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="w-4 h-4" />
            <span>Explore Premium Features</span>
          </motion.button>
        </motion.div>
      </div>
    </NavigationLayout>
  );
}
