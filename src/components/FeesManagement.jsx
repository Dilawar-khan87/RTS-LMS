'use client';

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // apne project path ke hisaab se adjust karo

const FeesManagement = () => {
  const db = getFirestore(app);
  
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch fees on load
  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'fees'), orderBy('paymentDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const feesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFees(feesList);
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
      setLoading(false);
    };

    fetchFees();
  }, [db]);

  // Handle form submission
  const handleAddFee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!studentName || !studentId || !amount) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, 'fees'), {
        studentId,
        studentName,
        amount: Number(amount),
        status,
        paymentDate: serverTimestamp(),
      });

      setSuccessMsg("Fee record added successfully");
      // Clear form
      setStudentName('');
      setStudentId('');
      setAmount('');
      setStatus('Pending');

      // Refresh fees list
      const q = query(collection(db, 'fees'), orderBy('paymentDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const feesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFees(feesList);

    } catch (err) {
      setError("Failed to add fee record");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Fees Management</h2>

      <form onSubmit={handleAddFee} className="mb-8 space-y-4 border p-4 rounded bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">Add New Fee Payment</h3>

        {error && <p className="text-red-600">{error}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Student Name *</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter student name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Student ID *</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter student ID"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter amount"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Payment
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Fee Records</h3>

        {loading ? (
          <p>Loading fees...</p>
        ) : fees.length === 0 ? (
          <p>No fee records available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(({ id, studentName, studentId, amount, status, paymentDate }) => (
                <tr key={id} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{studentName}</td>
                  <td className="border border-gray-300 px-4 py-2">{studentId}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{amount}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-semibold ${
                    status === 'Paid' ? 'text-green-600' : 'text-red-600'
                  }`}>{status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {paymentDate ? new Date(paymentDate.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FeesManagement;
