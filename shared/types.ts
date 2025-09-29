export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// DEMO TYPES - Can be removed
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
// END DEMO TYPES
export interface Expense {
  id:string;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO 8601 string
  receiptUrl?: string;
}