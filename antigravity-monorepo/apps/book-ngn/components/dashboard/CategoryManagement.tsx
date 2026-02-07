'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, X, Palette, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CategoryManagement() {
    const [isOpen, setIsOpen] = useState(false);

    // Mock data for local development (should be fetched via React Query)
    const [categories, setCategories] = useState([
        { id: '1', name: 'Sales', type: 'Income', color: '#10B981', icon: 'Tag' },
        { id: '2', name: 'Consulting', type: 'Income', color: '#3B82F6', icon: 'Tag' },
        { id: '3', name: 'Rent', type: 'Expense', color: '#EF4444', icon: 'Tag' },
        { id: '4', name: 'Utilities', type: 'Expense', color: '#F59E0B', icon: 'Tag' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Custom Categorization</h3>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="p-4 bg-[#111111] border border-white/5 rounded-2xl hover:border-white/10 transition-colors group relative"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: cat.color }}
                            />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{cat.name}</span>
                        </div>
                        <div className="mt-2 text-[8px] font-black tracking-widest text-white/10 uppercase">
                            {cat.type} Protocol
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">Define Category</h2>
                                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white pb-2">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Category Name</label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Logistics"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:border-emerald-500/50 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Type</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white font-bold appearance-none outline-none">
                                            <option>Income</option>
                                            <option>Expense</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Color Identifier</label>
                                        <div className="flex gap-2">
                                            {['#EF4444', '#10B981', '#3B82F6', '#F59E0B'].map(c => (
                                                <div key={c} className="w-8 h-8 rounded-lg cursor-pointer border-2 border-transparent hover:border-white transition-all" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-white transition-all">
                                    Synchronize Category
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
