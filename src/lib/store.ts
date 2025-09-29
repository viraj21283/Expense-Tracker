import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Expense } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
type ExpenseState = {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  isAddExpenseOpen: boolean;
};
type ExpenseActions = {
  fetchExpenses: () => Promise<void>;
  addExpense: (newExpense: Omit<Expense, 'id'>) => Promise<Expense | undefined>;
  deleteExpense: (id: string) => Promise<void>;
  openAddExpense: () => void;
  closeAddExpense: () => void;
};
export const useExpenseStore = create<ExpenseState & ExpenseActions>()(
  immer((set) => ({
    expenses: [],
    isLoading: true,
    error: null,
    isAddExpenseOpen: false,
    fetchExpenses: async () => {
      set({ isLoading: true, error: null });
      try {
        const expenses = await api<Expense[]>('/api/expenses');
        set({ expenses, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch expenses';
        set({ error: errorMessage, isLoading: false });
        toast.error(errorMessage);
      }
    },
    addExpense: async (newExpenseData) => {
      try {
        const addedExpense = await api<Expense>('/api/expenses', {
          method: 'POST',
          body: JSON.stringify(newExpenseData),
        });
        set((state) => {
          state.expenses.unshift(addedExpense);
        });
        toast.success('Expense added successfully!');
        return addedExpense;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add expense';
        toast.error(errorMessage);
        return undefined;
      }
    },
    deleteExpense: async (id) => {
      const originalExpenses = useExpenseStore.getState().expenses;
      set((state) => {
        state.expenses = state.expenses.filter((expense) => expense.id !== id);
      });
      try {
        await api(`/api/expenses/${id}`, { method: 'DELETE' });
        toast.success('Expense deleted.');
      } catch (error) {
        set({ expenses: originalExpenses });
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete expense';
        toast.error(errorMessage);
      }
    },
    openAddExpense: () => set({ isAddExpenseOpen: true }),
    closeAddExpense: () => set({ isAddExpenseOpen: false }),
  }))
);