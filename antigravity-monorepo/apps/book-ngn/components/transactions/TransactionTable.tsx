'use client';

import { motion } from 'framer-motion';
import { MoreHorizontal, ArrowUpRight, ArrowDownLeft, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransactions } from '@/hooks/useTransactions';

export default function TransactionTable() {
    const { transactions, isLoading, deleteTransaction } = useTransactions();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/20">Record</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/20">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions?.map((tx: any) => (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={tx.id}
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center",
                                            tx.type === 'Income' ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-white/40"
                                        )}>
                                            {tx.type === 'Income' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white leading-none mb-1">{tx.description || 'No description'}</div>
                                            <div className="text-[10px] text-white/20 font-medium uppercase tracking-wider">
                                                {new Date(tx.date).toLocaleDateString()} • {tx.account?.name || 'Main Account'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        {tx.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className={cn(
                                        "text-sm font-black tracking-tight",
                                        tx.type === 'Income' ? "text-emerald-500" : "text-white"
                                    )}>
                                        {tx.type === 'Income' ? '+' : '-'} ₦{Number(tx.amount).toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {/* Edit Logic */ }}
                                            className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all transform active:scale-90"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction.mutate(tx.id)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-500 transition-all transform active:scale-90"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!transactions?.length && (
                <div className="p-12 text-center">
                    <div className="text-white/10 font-black uppercase tracking-[0.3em] text-[10px]">No records found for current period</div>
                </div>
            )}
        </div>
    );
}
