'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Chrome, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface AuthPageProps {
    onComplete: (username: string) => void;
}

export default function AuthPage({ onComplete }: AuthPageProps) {
    const [username, setUsername] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onComplete(username.trim());
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };


    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Textures */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden text-[15vw] font-black leading-none whitespace-nowrap -rotate-12 translate-y-20">
                PROTOCOL PROTOCOL PROTOCOL PROTOCOL
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-sm space-y-12 relative z-10"
            >
                {/* Branding */}
                <div className="space-y-2">
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">
                        Financial Studio v2.0
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
                        Welcome to <br />
                        <span className="text-emerald-500">Fiscal Command.</span>
                    </h1>
                    <p className="text-white/40 text-sm max-w-[280px]">
                        The next generation of bookkeeping, designed for the future of Nigerian finance.
                    </p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={cn(
                        "relative group transition-all duration-300",
                        isFocused ? "scale-[1.02]" : "scale-100"
                    )}>
                        <div className={cn(
                            "absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl transition-opacity duration-500",
                            isFocused ? "opacity-100" : "opacity-0"
                        )} />

                        <div className={cn(
                            "relative bg-white/5 border rounded-2xl p-4 flex items-center gap-4 transition-colors",
                            isFocused ? "border-emerald-500/50 bg-black/40" : "border-white/10"
                        )}>
                            <User size={20} className={cn("transition-colors", isFocused ? "text-emerald-500" : "text-white/20")} />
                            <input
                                type="text"
                                placeholder="Secure Username"
                                className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/20 font-bold"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!username.trim()}
                        className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group"
                    >
                        Enter Workspace
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Social Auth */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">or deploy via</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all"
                    >

                        <Chrome size={18} />
                        <span className="text-sm">Sign in with Google</span>
                    </button>
                </div>

                {/* Footer info */}
                <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">
                    Secure. Encrypted. Sovereign.
                </p>
            </motion.div>
        </div>
    );
}
