import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/lib/store';
import { PlusCircle } from 'lucide-react';
export function DashboardHeader() {
  const openAddExpense = useExpenseStore((s) => s.openAddExpense);
  return (
    <header className="flex justify-between items-center mb-8 md:mb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Personal Expense Tracker
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Your minimalist expense tracker.
        </p>
      </div>
      <Button
        onClick={openAddExpense}
        className="bg-teal-500 hover:bg-teal-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Expense
      </Button>
    </header>
  );
}