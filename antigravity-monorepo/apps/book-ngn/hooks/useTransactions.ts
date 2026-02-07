import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTransactions() {
    const queryClient = useQueryClient();

    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await fetch('/api/transactions');
            if (!res.ok) throw new Error('Failed to fetch transactions');
            return res.json();
        },
    });

    const createTransaction = useMutation({
        mutationFn: async (newTransaction: any) => {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTransaction),
            });
            if (!res.ok) throw new Error('Failed to create transaction');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    const updateTransaction = useMutation({
        mutationFn: async ({ id, ...updates }: any) => {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (!res.ok) throw new Error('Failed to update transaction');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    const deleteTransaction = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete transaction');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    return {
        transactions,
        isLoading,
        error,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
}
