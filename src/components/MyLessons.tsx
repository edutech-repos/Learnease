import { motion, AnimatePresence } from 'motion/react';
import { Eye, Gamepad2, Download, ArrowLeftRight, X, FileText, Sparkles, Loader2 } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';
import { useState, useEffect } from 'react';
import { fetchStudyMaterials } from '../lib/supabase';
import { QuizModal } from './QuizModal';

interface MyLessonsProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  userId?: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  onViewLesson?: (lessonId: string) => void;
  onStartQuiz?: (lessonId: string) => void;
}

export function MyLessons({
  userName,
  userType,
  userId,
  onNavigate,
  onShowProfile,
  onLogout,
  onViewLesson,
  onStartQuiz
}: MyLessonsProps) {
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLessons() {
      if (userId) {
        setIsLoading(true);
        const { data, error } = await fetchStudyMaterials(userId);
        if (data) {
          // Map Supabase data to component state
          const mappedLessons = data.map((item: any) => {
            // Logic: If quiz_data exists and has questions, quiz is valid/completed.
            // If quiz_data is null or empty array, it is pending.
            const hasQuizData = item.quiz_data && Array.isArray(item.quiz_data) && item.quiz_data.length > 0;

            return {
              id: item.id,
              title: item.title || 'Untitled Lesson',
              subject: 'General', // We might want to save/fetch topic in future
              icon: '⚡️',
              // User logic: check quiz_data column. If [], then pending. Else completed.
              quizTaken: hasQuizData,
              score: item.quiz_score || 0,
              total: hasQuizData ? item.quiz_data.length : 5, // Default to 5 if pending? Or 0?
              color: '#06B6D4',
              generatedContent: item.structured_content || '',
              originalContent: item.original_text || '',
              quizData: item.quiz_data // Store quiz data for modal
            };
          });
          setLessons(mappedLessons);
        }
        setIsLoading(false);
      }
    }
    loadLessons();
  }, [userId]);


  // Ensure ID type is string to match Supabase UUIDs
  const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<string | null>(null);
  const [showAfterContent, setShowAfterContent] = useState(true);
  const [quizLessonId, setQuizLessonId] = useState<string | null>(null);

  const selectedLesson = lessons.find(l => l.id === selectedLessonForPreview);
  const quizLesson = lessons.find(l => l.id === quizLessonId);

  const handleDownloadAll = () => {
    if (lessons.length === 0) {
      alert("No lessons to download.");
      return;
    }

    const date = new Date().toLocaleDateString();

    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Learnease Notes Bundle - ${date}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; mx-auto; padding: 20px; color: #1f2937; }
          h1 { border-bottom: 2px solid #3b82f6; padding-bottom: 10px; color: #111827; }
          h2 { margin-top: 40px; color: #1e3a8a; border-left: 5px solid #06b6d4; padding-left: 10px; }
          .meta { color: #6b7280; font-size: 0.9em; margin-bottom: 20px; }
          .lesson-content { background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .toc { background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 40px; }
          .toc a { text-decoration: none; color: #2563eb; display: block; margin-bottom: 5px; }
          .toc a:hover { text-decoration: underline; }
          @media print { .page-break { page-break-after: always; } }
        </style>
      </head>
      <body>
        <h1>Learnease Study Notes</h1>
        <p>Generated on ${date}</p>
        
        <div class="toc">
          <h3>Table of Contents</h3>
          ${lessons.map((l, i) => `<a href="#lesson-${i}">${i + 1}. ${l.title}</a>`).join('')}
        </div>
    `;

    lessons.forEach((lesson, index) => {
      htmlContent += `
        <div id="lesson-${index}" class="page-break">
          <h2>${lesson.title}</h2>
          <div class="meta">
            <strong>Subject:</strong> ${lesson.subject} | 
            <strong>Score:</strong> ${lesson.score}/${lesson.total}
          </div>
          <div class="lesson-content">
            ${lesson.generatedContent || lesson.originalContent || '<p>No content.</p>'}
          </div>
          <hr style="margin: 40px 0; border: 0; border-top: 1px dashed #ccc;" />
        </div>
      `;
    });

    htmlContent += `</body></html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Learnease_Notes_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            onClick={handleDownloadAll}
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
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
            </div>
          ) : lessons.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p>No lessons found. Create your first lesson!</p>
            </div>
          ) : lessons.map((lesson, idx) => (
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
                    <span className="text-sm">Review</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setSelectedLessonForPreview(lesson.id)}
                    className="p-2.5 bg-[#1E1B4B] border-2 border-[#F472B6]/50 rounded-lg text-[#F472B6] flex items-center justify-center relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#F472B6',
                      boxShadow: '0 0 15px rgba(244, 114, 182, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    title="Compare Before/After"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
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
                    onClick={() => setQuizLessonId(lesson.id)}
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
                      {lesson.quizTaken ? 'Retake' : 'Quiz'}
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
                {(() => {
                  const completed = lessons.filter(l => l.quizTaken);
                  if (completed.length === 0) return '0%';
                  const avg = completed.reduce((acc, l) => acc + (l.score / l.total) * 100, 0) / completed.length;
                  return `${Math.round(avg)}%`;
                })()}
              </div>
              <div className="text-gray-400 text-sm">Average Score</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Before/After Comparison Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLessonForPreview(null)}
          >
            <motion.div
              className="bg-[#312E81] rounded-3xl max-w-4xl w-full border-2 border-[#06B6D4]/50 relative flex flex-col h-[85vh] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-[#312E81] border-b border-[#06B6D4]/30 p-4 lg:p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedLesson.icon}</span>
                    <div>
                      <h2 className="text-xl text-white font-bold">{selectedLesson.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{selectedLesson.subject}</span>
                        {selectedLesson.quizTaken && (
                          <span className="text-[#10B981] font-medium">• Score: {selectedLesson.score}/{selectedLesson.total}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedLessonForPreview(null)}
                    className="p-2 rounded-full bg-[#1E1B4B]/80 hover:bg-[#1E1B4B] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {/* Toggle */}
                <div className="flex justify-center mt-4">
                  <div className="bg-[#1E1B4B] p-1.5 rounded-2xl border border-[#06B6D4]/30 inline-flex items-center gap-1 relative">
                    <motion.div
                      className="absolute inset-y-1.5 rounded-xl"
                      initial={false}
                      animate={{
                        left: showAfterContent ? 'calc(50% + 2px)' : '6px',
                        right: showAfterContent ? '6px' : 'calc(50% + 2px)',
                        background: showAfterContent
                          ? 'linear-gradient(135deg, #F472B6, #EC4899)'
                          : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                        boxShadow: showAfterContent
                          ? '0 0 20px rgba(244, 114, 182, 0.4)'
                          : '0 0 20px rgba(6, 182, 212, 0.4)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.button
                      onClick={() => setShowAfterContent(false)}
                      className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${!showAfterContent ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Original Input</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setShowAfterContent(true)}
                      className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${showAfterContent ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">AI Generated</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar text-white">
                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 27, 75, 0.5);
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 182, 212, 0.5);
                    border-radius: 4px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(6, 182, 212, 0.8);
                  }
                `}</style>
                <motion.div
                  key={showAfterContent ? 'after' : 'before'}
                  initial={{ opacity: 0, x: showAfterContent ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: showAfterContent ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-invert max-w-none">
                    {showAfterContent ? (
                      <div
                        className="text-gray-300"
                        dangerouslySetInnerHTML={{ __html: selectedLesson.generatedContent || '<p>No content available</p>' }}
                      />
                    ) : (
                      <div className="bg-[#1E1B4B] rounded-xl p-6 border border-[#06B6D4]/20">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5 text-[#06B6D4]" />
                          <span className="text-sm text-[#06B6D4] font-medium">Original Input</span>
                        </div>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {selectedLesson.originalContent || 'No original content available'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="flex-shrink-0 bg-[#312E81] border-t border-[#06B6D4]/30 p-4 flex justify-end gap-3 z-10">
                <motion.button
                  onClick={() => setSelectedLessonForPreview(null)}
                  className="px-6 py-2 bg-[#1E1B4B] border border-[#06B6D4]/30 rounded-lg text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                <motion.button
                  onClick={() => {
                    onViewLesson?.(selectedLesson.id);
                    setSelectedLessonForPreview(null);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-lg text-white"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Lesson
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Quiz Modal */}
      {quizLesson && (
        <QuizModal
          isOpen={!!quizLesson}
          onClose={() => setQuizLessonId(null)}
          textContent={quizLesson.originalContent || ''}
          userId={userId || ''}
          initialData={quizLesson.quizData}
          materialId={quizLesson.id}
        />
      )}
    </NavigationLayout>
  );
}