'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
];

export default function AnalyticsCharts() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-[#111111] border border-white/5 rounded-3xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-1">Cash Flow Dynamics</h3>
                        <p className="text-2xl font-black text-white tracking-tighter">Flux Analysis</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expenses</span>
                        </div>
                    </div>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    fontSize: '10px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#10B981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorIncome)"
                            />
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                stroke="#ffffff20"
                                strokeWidth={2}
                                fill="transparent"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
