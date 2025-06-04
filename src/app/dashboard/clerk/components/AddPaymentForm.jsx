'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const AddPaymentForm = () => {
  const db = getFirestore(app);
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [formData, setFormData] = useState({
    studentId: '',
    amountPaid: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoadingStudents(true);
      setMessage('');
      try {
        const snap = await getDocs(collection(db, 'students'));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched students:', data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setMessage('❌ Error fetching students data.');
      }
      setLoadingStudents(false);
    };

    fetchStudents();
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!formData.studentId) {
      setMessage('❌ Please select a student.');
      return;
    }
    if (!formData.amountPaid || isNaN(formData.amountPaid) || Number(formData.amountPaid) <= 0) {
      setMessage('❌ Please enter a valid amount.');
      return;
    }
    setLoadingSubmit(true);
    try {
      await addDoc(collection(db, 'fees'), {
        studentId: formData.studentId,
        amountPaid: Number(formData.amountPaid),
        paidAt: new Date(),
      });
      setMessage('✅ Payment added successfully!');
      setFormData({ studentId: '', amountPaid: '' });
    } catch (error) {
      console.error('Error adding payment:', error);
      setMessage('❌ Failed to add payment.');
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition mb-4 align-baseline"
      >
        {showForm ? 'Hide Payment Form' : '➕ Add New Payment'}
      </button>

      {showForm && (
        <>
          {loadingStudents ? (
            <p>Loading students...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Student</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">-- Select --</option>
                  {students.length === 0 && (
                    <option disabled>No students found</option>
                  )}
                  {students.map((stu) => (
                    <option key={stu.id} value={stu.id}>
                      {stu.fullName || stu.email || stu.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Amount Paid</label>
                <input
                  type="number"
                  min="1"
                  value={formData.amountPaid}
                  onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
              >
                {loadingSubmit ? 'Submitting...' : 'Submit Payment'}
              </button>

              {message && (
                <p
                  className={`mt-2 text-sm ${
                    message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default AddPaymentForm;
