import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';

export default function ExpensesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 Expense Tracker</h1>
      <AddExpenseForm />
      {/* <ExpenseList /> */}
    </div>
  );
}
