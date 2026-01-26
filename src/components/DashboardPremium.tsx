import { motion } from 'motion/react';
import { Upload, FileText, Shield, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { NavigationLayout } from './NavigationLayout';

interface DashboardPremiumProps {
  userName: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function DashboardPremium({ userName, onNavigate, onShowProfile, onLogout }: DashboardPremiumProps) {
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = () => {
    setFileSelected(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const weaknessTopics = [
    { 
      title: 'Photosynthesis: Dark Reactions', 
      tag: 'Biology',
      attempts: 3,
      avgScore: '40%',
      icon: '🌱'
    },
    { 
      title: 'Quadratic Equations', 
      tag: 'Math',
      attempts: 5,
      avgScore: '52%',
      icon: '📐'
    },
    { 
      title: 'French Revolution Causes', 
      tag: 'History',
      attempts: 2,
      avgScore: '45%',
      icon: '📚'
    }
  ];

  return (
    <NavigationLayout
      userName={userName}
      userType="premium"
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
              : fileSelected 
                ? 'border-solid border-[#10B981] glow-green'
                : 'border-dashed border-[#06B6D4] glow-cyan'
          }`}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileSelect();
          }}
          whileHover={{ scale: fileSelected ? 1 : 1.01 }}
        >
          {!fileSelected ? (
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
              <p className="text-gray-400 text-sm lg:text-base mb-6">Support for PDF, DOCX, TXT files up to 50MB</p>
              <motion.button
                onClick={handleFileSelect}
                className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white glow-cyan"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Or Click to Browse
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#10B981]/20 rounded-lg border border-[#10B981]">
                  <FileText className="w-8 h-8 text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">biology_notes.pdf</h3>
                  <p className="text-sm text-gray-400">2.4 MB • PDF Document</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#06B6D4]">Extracting Knowledge...</span>
                  <span className="text-sm text-[#FBBF24]">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-[#1E1B4B] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#06B6D4] via-[#F472B6] to-[#FBBF24] relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                          '0 0 10px rgba(6, 182, 212, 0.5)',
                          '0 0 20px rgba(6, 182, 212, 0.8)',
                          '0 0 10px rgba(6, 182, 212, 0.5)'
                        ]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>

              {uploadProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <motion.button
                    className="flex-1 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Generate Lesson 🚀
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setFileSelected(false);
                      setUploadProgress(0);
                    }}
                    className="px-6 py-3 bg-[#1E1B4B] border border-[#F472B6]/50 rounded-xl text-[#F472B6] hover:bg-[#F472B6]/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Weakness Breakers Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#F472B6]" />
            <h3 className="text-xl lg:text-2xl text-white">Weakness Breakers 🛡️</h3>
          </div>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">
            AI-identified topics where you need more practice
          </p>

          <div className="relative">
            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {weaknessTopics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-72 lg:w-80 bg-[#312E81] rounded-xl p-6 border-2 border-[#F472B6]/50 relative overflow-hidden snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: '#F472B6',
                    boxShadow: '0 0 30px rgba(244, 114, 182, 0.5), 0 0 60px rgba(244, 114, 182, 0.2)'
                  }}
                >
                  {/* Urgent Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F472B6]/10 to-[#EF4444]/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{topic.icon}</span>
                      <div className="px-3 py-1 bg-[#F472B6]/20 border border-[#F472B6] rounded-full text-xs text-[#F472B6]">
                        Weak Topic
                      </div>
                    </div>

                    <h4 className="text-white mb-3">{topic.title}</h4>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-400">Attempts: </span>
                        <span className="text-[#FBBF24]">{topic.attempts}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Avg Score: </span>
                        <span className="text-[#EF4444]">{topic.avgScore}</span>
                      </div>
                    </div>

                    <motion.button
                      className="w-full py-2 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-lg text-white text-sm relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Improve Now
                      </span>
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-[#F472B6]/20 rounded-bl-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {weaknessTopics.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-[#F472B6]/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Premium Features Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#312E81] to-[#1E1B4B] rounded-xl p-6 border border-[#FBBF24]/30 glow-yellow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <span>⚡️</span>
                <span>You're using Premium Features</span>
              </h4>
              <p className="text-gray-400 text-sm">
                Unlimited lessons, weakness analysis, and personalized learning paths
              </p>
            </div>
            <motion.button
              className="px-6 py-3 bg-[#FBBF24] rounded-lg text-[#1E1B4B]"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Benefits
            </motion.button>
          </div>
        </motion.div>
      </div>
    </NavigationLayout>
  );
}
