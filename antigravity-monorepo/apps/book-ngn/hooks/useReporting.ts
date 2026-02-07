'use client';

import { useTransactions } from '@/hooks/useTransactions';

export function useReporting() {
    const { transactions } = useTransactions();

    const exportToCSV = () => {
        if (!transactions || transactions.length === 0) return;

        const headers = ['Date', 'Description', 'Type', 'Category', 'Amount', 'Account', 'Tax Deductible'];
        const rows = transactions.map((tx: any) => [
            new Date(tx.date).toLocaleDateString(),
            tx.description || '',
            tx.type,
            tx.category?.name || 'Uncategorized',
            tx.amount,
            tx.account?.name || 'Main',
            tx.is_deductible ? 'Yes' : 'No'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row: any) => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `book-ngn-export-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateMonthlySummary = () => {
        // Logic to aggregate data by month for reports
        if (!transactions) return [];

        const monthlyData: Record<string, any> = {};

        transactions.forEach((tx: any) => {
            const month = new Date(tx.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0, taxDeductible: 0 };
            }

            if (tx.type === 'Income') {
                monthlyData[month].income += Number(tx.amount);
            } else {
                monthlyData[month].expenses += Number(tx.amount);
                if (tx.is_deductible) {
                    monthlyData[month].taxDeductible += Number(tx.amount);
                }
            }
        });

        return Object.values(monthlyData);
    };

    return {
        exportToCSV,
        generateMonthlySummary
    };
}
