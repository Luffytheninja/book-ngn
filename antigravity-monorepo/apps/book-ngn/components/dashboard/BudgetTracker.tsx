'use client';

import { motion } from 'framer-motion';
import { Target, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';

export default function BudgetTracker() {
    const { budgets, isLoading: loadingBudgets } = useBudgets();
    const { transactions } = useTransactions();

    if (loadingBudgets) return <div className="h-48 bg-white/5 animate-pulse rounded-3xl" />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets?.map((budget: any) => {
                // Calculate current spending for this budget's category
                const currentSpending = transactions
                    ?.filter((tx: any) => tx.category_id === budget.category_id && tx.type === 'Expense')
                    .reduce((sum: number, tx: any) => sum + Number(tx.amount), 0) || 0;

                const percentage = Math.min((currentSpending / budget.amount_limit) * 100, 100);
                const isOver = currentSpending > budget.amount_limit;

                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={budget.id}
                        className="p-6 bg-[#111111] border border-white/5 rounded-3xl hover:border-white/10 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                    <Target size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-white leading-none mb-1">{budget.category?.name}</div>
                                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{budget.period} Limit</div>
                                </div>
                            </div>
                            {isOver && (
                                <div className="text-red-500 animate-pulse">
                                    <AlertTriangle size={16} />
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-2xl font-black text-white tracking-tighter">
                                        ₦{currentSpending.toLocaleString()}
                                    </div>
                                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                                        of ₦{Number(budget.amount_limit).toLocaleString()}
                                    </div>
                                </div>
                                <div className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                                    isOver ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                )}>
                                    {Math.round(percentage)}%
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={cn(
                                        "h-full transition-colors",
                                        percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-yellow-500" : "bg-emerald-500"
                                    )}
                                />
                            </div>

                            <div className="pt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                                {isOver ? (
                                    <span className="text-red-500">Exceeded by ₦{(currentSpending - budget.amount_limit).toLocaleString()}</span>
                                ) : (
                                    <span>₦{(budget.amount_limit - currentSpending).toLocaleString()} Remaining</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}

            {(!budgets || budgets.length === 0) && (
                <div className="col-span-full p-20 border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center opacity-20">
                    <Target size={40} className="mb-4" />
                    <div className="text-xs font-black uppercase tracking-widest">No active budgets established.</div>
                </div>
            )}
        </div>
    );
}
