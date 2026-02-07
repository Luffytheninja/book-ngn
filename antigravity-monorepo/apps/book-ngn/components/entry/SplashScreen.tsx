'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500); // 3.5s splash duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
            {/* Cinematic Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

            {/* Spinning Coin Illustration */}
            <div className="relative w-32 h-32 perspective-1000">
                <motion.div
                    animate={{
                        rotateY: [0, 180, 360, 540, 720, 900, 1080],
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                    }}
                    className="w-full h-full relative preserve-3d"
                >
                    {/* Front of Coin */}
                    <div className="absolute inset-0 w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-4 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] backface-hidden">
                        <span className="text-5xl font-black text-white">₦</span>
                    </div>

                    {/* Back of Coin (simulated by same design) */}
                    <div className="absolute inset-0 w-full h-full rounded-full bg-emerald-600 flex items-center justify-center border-4 border-emerald-500 rotate-y-180 backface-hidden">
                        <span className="text-5xl font-black text-white/80">₦</span>
                    </div>
                </motion.div>
            </div>

            {/* Brand Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 text-center z-10"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 block mb-2 font-black">
                    Antigravity Protocol
                </span>
                <h2 className="text-3xl font-black tracking-tighter text-white">BOOK:NGN</h2>
            </motion.div>

            {/* Loading Progress Bar (Subtle) */}
            <div className="absolute bottom-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
            </div>
        </div>
    );
}
