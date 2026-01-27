import { motion } from 'motion/react';
import { Flame, Sparkles } from 'lucide-react';

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center"
            >
                <div className="relative mb-8">
                    {/* Pulsing Glow Rings */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-full blur-2xl opacity-20"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-[#06B6D4] to-[#3B82F6] rounded-full blur-xl opacity-20"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />

                    {/* Main Icon Container */}
                    <motion.div
                        className="w-24 h-24 bg-[#1E1B4B] rounded-3xl border-2 border-[#F472B6] flex items-center justify-center relative z-10 mx-auto overflow-hidden shadow-[0_0_30px_rgba(244,114,182,0.3)]"
                        animate={{
                            borderColor: ['#F472B6', '#06B6D4', '#F472B6'],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Inner flame animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Flame className="w-12 h-12 text-[#F472B6]" fill="currentColor" />
                        </motion.div>

                        {/* Sparkles */}
                        <motion.div
                            className="absolute top-2 right-2"
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        >
                            <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-3 left-3"
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                        >
                            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Text Animation */}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Igniting Your Lesson
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >...</motion.span>
                </h3>

                <div className="h-6 overflow-hidden relative">
                    <motion.div
                        animate={{ y: [-24, 0, -24] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="flex flex-col items-center"
                    >
                        <p className="text-[#06B6D4] h-6 flex items-center gap-2 font-medium">
                            <Sparkles className="w-4 h-4" /> Analyzing content structure
                        </p>
                        <p className="text-[#F472B6] h-6 flex items-center gap-2 font-medium">
                            <Flame className="w-4 h-4" /> Generating key insights
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
