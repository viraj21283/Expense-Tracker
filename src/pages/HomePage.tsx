import React, { useEffect, useMemo } from 'react';
import { useExpenseStore } from '@/lib/store';
import { DashboardHeader } from '@/components/DashboardHeader';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseList } from '@/components/ExpenseList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { format, startOfMonth, endOfMonth } from 'date-fns';
function SummaryCard() {
  const expenses = useExpenseStore((s) => s.expenses);
  const isLoading = useExpenseStore((s) => s.isLoading);
  const totalExpenses = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return expenses
      .filter(e => {
        const expenseDate = new Date(e.date);
        return expenseDate >= start && expenseDate <= end;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);
  if (isLoading) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="col-span-1 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <CardTitle>This Month's Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-foreground">₹{totalExpenses.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">
          For {format(new Date(), 'MMMM yyyy')}
        </p>
      </CardContent>
    </Card>
  );
}
export function HomePage() {
  const fetchExpenses = useExpenseStore((s) => s.fetchExpenses);
  const isLoading = useExpenseStore((s) => s.isLoading);
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  return (
    <>
      <ThemeToggle className="fixed top-4 right-4" />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
          <DashboardHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <SummaryCard />
            {isLoading ? (
              <Card className="col-span-1">
                <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                <CardContent><Skeleton className="h-[250px] w-full" /></CardContent>
              </Card>
            ) : (
              <ExpenseChart />
            )}
          </div>
          {isLoading ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-display text-foreground">Recent Transactions</h2>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <ExpenseList />
          )}
        </main>
        <footer className="text-center py-8 text-muted-foreground text-sm max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p>Built with Love ❤️ by Viraj Shah</p>
          <p className="text-xs text-muted-foreground/80">
            Disclaimer: This expense tracker is for informational and self-tracking purposes only. It is not a substitute for professional financial, tax, or legal advice. We do not guarantee the accuracy of calculations or data. You are solely responsible for your financial decisions.
          </p>
        </footer>
      </div>
      <AddExpenseDialog />
      <Toaster richColors position="top-right" />
    </>
  );
}