'use client';

import { useBookkeeping } from '@/components/providers/BookkeepingContext';
import { calculateTaxResults } from '@/utils/tax';
import SummaryCard from '@/components/dashboard/SummaryCard';
import InputFlow from '@/components/dashboard/InputFlow';
import TaxBreakdown from '@/components/dashboard/TaxBreakdown';
import GrowthProjection from '@/components/dashboard/GrowthProjection';
import { motion, AnimatePresence } from 'framer-motion';

import { useState } from 'react';
import { LayoutDashboard, Receipt, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReporting } from '@/hooks/useReporting';


import SplashScreen from '@/components/entry/SplashScreen';
import AuthPage from '@/components/entry/AuthPage';
import WelcomePage from '@/components/entry/WelcomePage';
import TransactionForm from '@/components/transactions/TransactionForm';
import TransactionTable from '@/components/transactions/TransactionTable';
import BudgetTracker from '@/components/dashboard/BudgetTracker';
import CategoryManagement from '@/components/dashboard/CategoryManagement';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';



export default function Home() {
  const { incomeEntries, expenseEntries, userData, userCategory } = useBookkeeping();

  const [stage, setStage] = useState<'splash' | 'auth' | 'welcome' | 'app'>('splash');
  const [activeTab, setActiveTab] = useState<'dash' | 'book' | 'insights'>('dash');
  const [username, setUsername] = useState<string>('');
  const { exportToCSV } = useReporting();


  // Calculate real-time tax
  const results = calculateTaxResults(
    userData.monthlyIncome,
    userData.lifePremium,
    userData.healthPremium,
    userData.nhiaVoluntary,
    userData.rentPaid,
    userData.utilityPercentage,
    userData.monthlyUtilities,
    userData.employeeCount,
    incomeEntries,
    expenseEntries,
    userData.voluntaryPension,
    userData.mortgageInterest,
    userCategory,
  );

  return (
    <AnimatePresence mode="wait">
      {stage === 'splash' && (
        <SplashScreen key="splash" onComplete={() => setStage('auth')} />
      )}

      {stage === 'auth' && (
        <AuthPage key="auth" onComplete={(name) => {
          setUsername(name);
          setStage('welcome');
        }} />
      )}

      {stage === 'welcome' && (
        <WelcomePage
          key="welcome"
          username={username}
          onComplete={() => setStage('app')}
        />
      )}

      {stage === 'app' && (

        <motion.main
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen pb-24 bg-background text-foreground"
        >

          <div className="max-w-md mx-auto px-4">
            {/* Header */}
            <header className="flex justify-between items-center py-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-black">
                  BookNGN Protocol
                </span>
                <h1 className="text-2xl font-black tracking-tighter">Fiscal Command</h1>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center rotate-3 overflow-hidden">
                <span className="font-bold text-xs">AY</span>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-6"
              >
                {activeTab === 'dash' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    {/* Visual Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-black tracking-tight text-white">Financial Command Center</h2>
                          <div className="flex gap-4">
                            <button
                              onClick={exportToCSV}
                              className="px-4 py-2 bg-white/5 border border-white/10 text-white/40 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest"
                            >
                              Download Ledger
                            </button>
                            <TransactionForm />
                          </div>
                        </div>

                        <SummaryCard
                          annualIncome={results.annualGross}
                          annualTax={results.annualTax}
                          effectiveRate={results.effectiveRate}
                          userCategory={userCategory}
                        />

                        <AnalyticsCharts />

                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Active Budgets</h3>
                          </div>
                          <BudgetTracker />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <TaxBreakdown results={results} />
                        <CategoryManagement />
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Recent Transactions</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400">View All Records</button>
                      </div>
                      <TransactionTable />
                    </div>
                  </motion.div>
                )}



                {activeTab === 'book' && (
                  <div className="space-y-6">
                    <InputFlow />

                    {/* Recent Activity List */}
                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-widest opacity-60 ml-2">
                        Recent Ledger
                      </h3>
                      {[...incomeEntries, ...expenseEntries]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 8)
                        .map((e) => (
                          <div
                            key={e.id}
                            className="bg-black/30 border border-white/5 p-4 rounded-2xl flex justify-between items-center"
                          >
                            <div className="flex gap-3 items-center">
                              <div
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  'exchangeRate' in e ? 'bg-emerald-500' : 'bg-red-500',
                                )}
                              />
                              <div>
                                <div className="font-bold text-sm leading-none mb-1">
                                  {e.description}
                                </div>
                                <div className="text-[10px] opacity-40">
                                  {new Date(e.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div
                              className={cn(
                                'font-mono font-bold text-sm',
                                'exchangeRate' in e ? 'text-emerald-500' : 'text-red-400',
                              )}
                            >
                              {'exchangeRate' in e ? '+' : '-'}₦{Number(e.amount).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      {incomeEntries.length === 0 && expenseEntries.length === 0 && (
                        <div className="text-center py-12 opacity-30 text-xs italic">
                          The ledger is empty. Start tracking above.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div className="space-y-6">
                    <GrowthProjection results={results} />

                    <div className="glass-card p-6 rounded-warm border-white/5 space-y-4">
                      <h3 className="text-sm font-bold tracking-tight">Strategy Center</h3>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Your current effective tax rate is {results.effectiveRate.toFixed(1)}%. To drop
                        this below 10%, consider increasing your NHF voluntary contributions or
                        optimizing documented business utilities.
                      </p>
                      <button
                        onClick={exportToCSV}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        Generate Full Tax Audit
                      </button>

                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-panel rounded-full overflow-hidden p-1.5 flex gap-1 z-50 p-1 bg-black/40 border border-white/10 backdrop-blur-xl">
            {[
              { id: 'dash', icon: LayoutDashboard, label: 'Dash' },
              { id: 'book', icon: Receipt, label: 'Ledger' },
              { id: 'insights', icon: TrendingUp, label: 'Growth' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'dash' | 'book' | 'insights')}
                className={cn(
                  'flex-1 py-3 rounded-full flex flex-col items-center gap-1 transition-all duration-300',
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-white/40 hover:text-white',
                )}
              >

                <tab.icon size={18} />
                <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

