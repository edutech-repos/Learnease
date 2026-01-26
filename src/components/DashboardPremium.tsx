import { motion } from 'motion/react';
import { CloudUpload, Zap, Shield, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { NavigationLayout } from './NavigationLayout';

interface DashboardPremiumProps {
  userName: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  onIgniteLesson?: () => void;
  onShowComparison?: () => void;
}

export function DashboardPremium({ userName, onNavigate, onShowProfile, onLogout, onIgniteLesson, onShowComparison }: DashboardPremiumProps) {
  const [textInput, setTextInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');

  const maxChars = 4000; // Premium user limit
  const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
  const isAtLimit = textInput.length >= maxChars;

  const handleFileSelect = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError('');

    let file: File | null = null;

    if ('dataTransfer' in e) {
      // Drag and drop event
      file = e.dataTransfer.files[0];
    } else if ('target' in e && e.target.files) {
      // File input event
      file = e.target.files[0];
    }

    if (file) {
      // Validate file size
      if (file.size > maxFileSize) {
        setUploadError(`File size exceeds 10 MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`);
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only PDF, DOCX, and TXT files are supported.');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setTextInput(e.target.value);
    }
  };

  const handleIgniteLesson = () => {
    if (textInput.length > 0 || selectedFile) {
      onIgniteLesson?.();
    }
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
        {/* Hero Split Input Zone */}
        <div className="mb-8">
          {/* Top Half - PDF Upload Area */}
          <motion.div
            className={`relative bg-[#1E1B4B] rounded-t-2xl p-8 lg:p-12 border-2 transition-all cursor-pointer ${uploadError
              ? 'border-[#EF4444] glow-red'
              : selectedFile
                ? 'border-[#10B981] glow-green'
                : isDragging
                  ? 'border-solid border-[#06B6D4] glow-cyan'
                  : 'border-dashed border-[#06B6D4]/60'
              }`}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileSelect}
            onClick={() => document.getElementById('file-input-premium')?.click()}
            whileHover={{ borderColor: uploadError ? '#EF4444' : selectedFile ? '#10B981' : '#06B6D4' }}
            animate={uploadError ? {
              x: [0, -10, 10, -10, 10, 0],
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.6)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.6)'
              ]
            } : selectedFile ? {
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.4)',
                '0 0 30px rgba(16, 185, 129, 0.6)',
                '0 0 20px rgba(16, 185, 129, 0.4)'
              ]
            } : undefined}
            transition={uploadError ? { duration: 0.5 } : selectedFile ? { duration: 2, repeat: Infinity } : undefined}
          >
            {/* Hidden File Input */}
            <input
              id="file-input-premium"
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  filter: [
                    `drop-shadow(0 0 10px ${uploadError ? 'rgba(239, 68, 68, 0.5)' : selectedFile ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)'})`,
                    `drop-shadow(0 0 20px ${uploadError ? 'rgba(239, 68, 68, 0.8)' : selectedFile ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.8)'})`,
                    `drop-shadow(0 0 10px ${uploadError ? 'rgba(239, 68, 68, 0.5)' : selectedFile ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)'})`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CloudUpload className={`w-16 h-16 lg:w-20 lg:h-20 mb-4 ${uploadError ? 'text-[#EF4444]' : selectedFile ? 'text-[#10B981]' : 'text-[#06B6D4]'
                  }`} />
              </motion.div>

              {selectedFile ? (
                <>
                  <p className="text-lg lg:text-xl text-[#10B981] font-semibold mb-2">✓ File Selected</p>
                  <p className="text-base text-gray-300 mb-1">{selectedFile.name}</p>
                  <p className="text-sm text-[#10B981]">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </>
              ) : uploadError ? (
                <>
                  <p className="text-lg lg:text-xl text-[#EF4444] font-semibold mb-2">✗ Upload Failed</p>
                  <p className="text-sm text-gray-300">Click to try again</p>
                </>
              ) : (
                <>
                  <p className="text-lg lg:text-xl text-gray-300">Drop PDF here or click to browse</p>
                  <p className="text-gray-500 text-xs mt-2">Max file size: 10 MB • Unlimited lessons</p>
                </>
              )}
            </div>
          </motion.div>

          {/* Divider - OR - with lightning */}
          <div className="relative flex items-center justify-center py-4 bg-[#312E81]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"></div>
            <div className="relative flex items-center gap-3 text-[#06B6D4]">
              <Zap className="w-5 h-5" fill="#06B6D4" />
              <span className="text-lg tracking-wider text-glow-cyan">- OR -</span>
              <Zap className="w-5 h-5" fill="#06B6D4" />
            </div>
          </div>

          {/* Bottom Half - Text Input Area */}
          <motion.div
            className={`relative ${isAtLimit ? 'glow-red' : isFocused ? 'glow-cyan' : ''
              }`}
            animate={isAtLimit ? {
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.6)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.6)'
              ]
            } : undefined}
            transition={isAtLimit ? { duration: 1, repeat: Infinity } : undefined}
          >
            <textarea
              value={textInput}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste your study text here..."
              className="w-full h-48 lg:h-64 bg-[#1E1B4B] rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none border-2 border-transparent focus:border-[#06B6D4]/50 transition-all"
              style={{
                filter: isFocused ? 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' : 'none'
              }}
            />

            {/* Character Counter */}
            <div className="mt-3 flex justify-end">
              <motion.span
                className={`text-sm ${isAtLimit
                  ? 'text-[#EF4444]'
                  : textInput.length > 0
                    ? 'text-[#FBBF24]'
                    : 'text-gray-500'
                  }`}
                animate={isAtLimit ? {
                  scale: [1, 1.1, 1]
                } : undefined}
                transition={isAtLimit ? { duration: 0.5, repeat: Infinity } : undefined}
              >
                {textInput.length} / {maxChars} chars
              </motion.span>
            </div>
          </motion.div>

          {/* Primary Action Button */}
          <motion.button
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] rounded-2xl text-white text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: textInput.length > 0 || isDragging ? 1.02 : 1 }}
            whileTap={{ scale: textInput.length > 0 || isDragging ? 0.98 : 1 }}
            disabled={textInput.length === 0 && !selectedFile}
            onClick={handleIgniteLesson}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <span>Ignite Lesson</span>
              <span>🚀</span>
            </span>
          </motion.button>

          {/* Upload Error Message */}
          {uploadError && (
            <p className="text-sm text-[#EF4444] mt-2 text-center">
              {uploadError}
            </p>
          )}
        </div>

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
              onClick={onShowComparison}
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