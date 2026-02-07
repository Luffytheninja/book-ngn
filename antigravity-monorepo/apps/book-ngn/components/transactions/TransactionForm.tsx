'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Tag, Calendar, FileText, CreditCard, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransactions } from '@/hooks/useTransactions';

interface TransactionFormProps {
    onSuccess?: () => void;
    initialData?: any;
}

export default function TransactionForm({ onSuccess, initialData }: TransactionFormProps) {
    const { createTransaction, updateTransaction } = useTransactions();
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        amount: initialData?.amount || '',
        type: initialData?.type || 'Expense',
        category_id: initialData?.category_id || '',
        account_id: initialData?.account_id || '',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        description: initialData?.description || '',
        is_deductible: initialData?.is_deductible || false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (initialData?.id) {
                await updateTransaction.mutateAsync({ id: initialData.id, ...formData });
            } else {
                await createTransaction.mutateAsync(formData);
            }
            setIsOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
                <Plus size={18} />
                Add Transaction
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-xl font-black text-white tracking-tight">Record Transaction</h2>
                                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Type Toggle */}
                                <div className="flex bg-white/5 p-1 rounded-2xl">
                                    {['Income', 'Expense'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type })}
                                            className={cn(
                                                "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                                formData.type === type
                                                    ? "bg-white text-black shadow-lg"
                                                    : "text-white/40 hover:text-white"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                {/* Amount */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Amount (NGN)</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-500 transition-colors">₦</div>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white font-bold focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Category</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-10 text-white font-bold appearance-none focus:border-emerald-500/50 outline-none transition-all"
                                                value={formData.category_id}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                {/* Placeholder options - should be fetched from DB */}
                                                <option value="1">Sales</option>
                                                <option value="2">Consulting</option>
                                                <option value="3">Rent</option>
                                                <option value="4">Utilities</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    {/* Account */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Account</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-10 text-white font-bold appearance-none focus:border-emerald-500/50 outline-none transition-all"
                                                value={formData.account_id}
                                                onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Main Bank</option>
                                                <option value="2">Cash</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Date & Description */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:border-emerald-500/50 outline-none transition-all"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Description</label>
                                        <input
                                            type="text"
                                            placeholder="Details"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:border-emerald-500/50 outline-none transition-all"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Deductible Toggle */}
                                {formData.type === 'Expense' && (
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => setFormData({ ...formData, is_deductible: !formData.is_deductible })}
                                            className={cn(
                                                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                                formData.is_deductible ? "bg-emerald-500 border-emerald-500 scale-110" : "border-white/20 bg-white/5"
                                            )}
                                        >
                                            {formData.is_deductible && <Plus size={14} className="text-white rotate-45" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                            Tax Deductible Expense
                                        </span>
                                    </label>
                                )}

                                <button
                                    type="submit"
                                    disabled={createTransaction.isPending || updateTransaction.isPending}
                                    className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-emerald-500 hover:text-white active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {initialData?.id ? 'Update Record' : 'Commit Transaction'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
