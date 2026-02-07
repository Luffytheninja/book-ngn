import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useBudgets() {
    const queryClient = useQueryClient();

    const { data: budgets, isLoading, error } = useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            const res = await fetch('/api/budgets');
            if (!res.ok) throw new Error('Failed to fetch budgets');
            return res.json();
        },
    });

    const createBudget = useMutation({
        mutationFn: async (newBudget: any) => {
            const res = await fetch('/api/budgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBudget),
            });
            if (!res.ok) throw new Error('Failed to create budget');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
        },
    });

    return {
        budgets,
        isLoading,
        error,
        createBudget,
    };
}
