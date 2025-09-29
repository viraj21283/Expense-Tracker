import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2, Utensils, Car, Lightbulb, Home, Film, HeartPulse, ShoppingBag, Package, Paperclip } from 'lucide-react';
import { useExpenseStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const categoryIcons: { [key: string]: React.ReactNode } = {
  'Food': <Utensils className="h-5 w-5" />,
  'Transport': <Car className="h-5 w-5" />,
  'Utilities': <Lightbulb className="h-5 w-5" />,
  'Housing': <Home className="h-5 w-5" />,
  'Entertainment': <Film className="h-5 w-5" />,
  'Health': <HeartPulse className="h-5 w-5" />,
  'Shopping': <ShoppingBag className="h-5 w-5" />,
  'Other': <Package className="h-5 w-5" />,
};
export function ExpenseList() {
  const expenses = useExpenseStore((s) => s.expenses);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <h3 className="text-lg font-semibold">No expenses yet!</h3>
        <p>Click "Add Expense" to get started.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold font-display text-foreground">Recent Transactions</h2>
      <AnimatePresence>
        {expenses.map((expense) => (
          <motion.div
            key={expense.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-3 rounded-full">
                    {categoryIcons[expense.category] || <Package className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <p className="font-bold text-lg text-foreground">
                    ₹{expense.amount.toFixed(2)}
                  </p>
                  {expense.receiptUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-teal-500">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Receipt</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this expense.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteExpense(expense.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}