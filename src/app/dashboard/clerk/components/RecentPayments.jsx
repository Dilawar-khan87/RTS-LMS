'use client';

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { app } from '@/lib/firebase';

const RecentPayments = () => {
  const db = getFirestore(app);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'fees'), orderBy('paidAt', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      const paymentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(paymentList);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [db]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this payment?')) return;

    try {
      await deleteDoc(doc(db, 'fees', id));
      setPayments(prev => prev.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Failed to delete payment:', error);
      alert('Failed to delete payment.');
    }
  };

  const handleEditClick = (payment) => {
    setEditingId(payment.id);
    setEditAmount(payment.amountPaid);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
  };

  const handleSaveEdit = async (id) => {
    if (editAmount === '' || isNaN(editAmount) || Number(editAmount) < 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const paymentRef = doc(db, 'fees', id);
      await updateDoc(paymentRef, {
        amountPaid: Number(editAmount),
      });
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, amountPaid: Number(editAmount) } : payment
        )
      );
      setEditingId(null);
      setEditAmount('');
    } catch (error) {
      console.error('Failed to update payment:', error);
      alert('Failed to update payment.');
    }
  };

  if (loading) return <p>Loading recent payments...</p>;

  if (payments.length === 0)
    return (
      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
        <p className="text-gray-500">No payments recorded yet.</p>
      </div>
    );

  return (
   <div className="bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-xl font-semibold mb-6">Recent Payments</h2>
      <ul className="divide-y divide-gray-200">
        {payments.map(({ id, studentId, amountPaid, paidAt }) => (
          <li key={id} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">
                Student ID: <span className="text-blue-600">{studentId}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Paid On:{' '}
                {paidAt?.toDate
                  ? paidAt.toDate().toLocaleString()
                  : new Date(paidAt.seconds * 1000).toLocaleString()}
              </p>
            </div>

            {editingId === id ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  className="border rounded px-2 py-1 w-24"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <button
                  onClick={() => handleSaveEdit(id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-green-600 font-semibold text-lg">₹ {amountPaid}</span>
                <button
                  onClick={() => handleEditClick({ id, amountPaid })}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPayments;
