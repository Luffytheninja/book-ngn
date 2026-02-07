'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface WelcomePageProps {
    username: string;
    onComplete: () => void;
}

export default function WelcomePage({ username, onComplete }: WelcomePageProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // 3 seconds welcome message
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Dynamic Ambient Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[140px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8 z-10"
            >
                <div className="flex justify-center">
                    <motion.div
                        initial={{ rotate: -20, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]"
                    >
                        <CheckCircle2 size={40} className="text-white" />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black"
                    >
                        Identity Verified
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-black text-white tracking-tighter"
                    >
                        Welcome, <span className="text-emerald-500">{username}</span>.
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/20 text-sm font-bold uppercase tracking-widest"
                >
                    Initializing your financial studio...
                </motion.p>
            </motion.div>

            {/* Subtle Bottom Status */}
            <div className="absolute bottom-12 flex items-center gap-3 text-white/10 uppercase text-[8px] font-black tracking-[0.3em]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SECURE CHANNEL ACTIVE
            </div>
        </div>
    );
}
