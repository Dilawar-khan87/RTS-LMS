'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ExpenseList = () => {
  const db = getFirestore(app);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const snap = await getDocs(collection(db, 'expenses'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this expense?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'expenses', id));
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense) => {
    // You can open a modal or redirect to an edit page with the expense data
    alert(`Edit feature coming soon for: ${expense.title}`);
  };

  if (loading) return <p className="text-center">Loading expenses...</p>;
  if (expenses.length === 0) return <p className="text-center">No expenses found.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Expense Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{expense.title}</td>
                <td className="px-4 py-2 border">₹{expense.amount}</td>
                <td className="px-4 py-2 border">{expense.category}</td>
                <td className="px-4 py-2 border">
                  {expense.date?.seconds
                    ? new Date(expense.createdAt.seconds * 1000).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2 border flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
