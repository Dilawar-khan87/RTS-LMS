'use client';
import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const expensesData = [];
      querySnapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });

      // ✅ Safe sorting (check if date and seconds exist)
      expensesData.sort((a, b) => {
        const dateA = a.date?.seconds || 0;
        const dateB = b.date?.seconds || 0;
        return dateB - dateA;
      });

      setExpenses(expensesData);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDate('');
    setEditingExpense(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert('Please fill all fields');
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      date: Timestamp.fromDate(new Date(date)),
    };

    try {
      if (editingExpense) {
        const expenseRef = doc(db, 'expenses', editingExpense.id);
        await updateDoc(expenseRef, expenseData);
        alert('Expense updated successfully!');
      } else {
        await addDoc(collection(db, 'expenses'), expenseData);
        alert('Expense added successfully!');
      }
      resetForm();
      fetchExpenses();
    } catch (err) {
      console.error('Error adding/updating expense:', err);
      alert('Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try {
      await deleteDoc(doc(db, 'expenses', id));
      alert('Expense deleted successfully!');
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Could not delete expense!');
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount.toString());

    // ✅ Handle missing date field
    if (expense.date?.seconds) {
      setDate(new Date(expense.date.seconds * 1000).toISOString().slice(0, 10));
    } else {
      setDate('');
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-gray-600 mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expense title"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1" htmlFor="amount">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className={`px-6 py-2 rounded-md text-white font-semibold transition ${
              editingExpense ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">Expense List</h3>

      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Amount (₹)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{expense.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ₹{expense.amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expense.date?.seconds
                    ? new Date(expense.date.seconds * 1000).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(expense)}
                    className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseTracking;
