'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const PendingFeeList = () => {
  const db = getFirestore(app);
  const [pendingFees, setPendingFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingFees = async () => {
      setLoading(true);
      try {
        const feesSnap = await getDocs(collection(db, 'fees'));
        const filteredFees = [];

        for (const feeDoc of feesSnap.docs) {
          const fee = feeDoc.data();
          if (fee.status === 'unpaid' || fee.status === 'partial') {
            const studentRef = doc(db, 'students', fee.studentId);
            const studentSnap = await getDoc(studentRef);
            const studentData = studentSnap.exists() ? studentSnap.data() : {};

            filteredFees.push({
              id: feeDoc.id,
              studentId: fee.studentId,
              name: studentData.fullName || 'Unknown',
              pendingAmount: fee.amountDue || 0,
              dueDate: fee.dueDate,
            });
          }
        }

        setPendingFees(filteredFees);
      } catch (err) {
        console.error('Error fetching pending fees:', err);
      }
      setLoading(false);
    };

    fetchPendingFees();
  }, []);

  if (loading) return <p>Loading pending fees...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Pending Fee List</h2>
      {pendingFees.length === 0 ? (
        <p className="text-gray-500">All fees are paid 🎉</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 font-semibold">Student ID</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Pending Amount</th>
                <th className="p-3 font-semibold">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {pendingFees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{fee.studentId}</td>
                  <td className="p-3">{fee.name}</td>
                  <td className="p-3 text-red-600 font-medium">₹{fee.pendingAmount}</td>
                  <td className="p-3">{fee.dueDate ? new Date(fee.dueDate.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingFeeList;
// This component fetches and displays a list of pending fees from Firestore.