'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const RecentTransactions = () => {
  const db = getFirestore(app);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const q = query(collection(db, 'fees'), orderBy('paidAt', 'desc'), limit(5));
      const querySnap = await getDocs(q);
      const txList = [];

      for (const tx of querySnap.docs) {
        const data = tx.data();
        const studentSnap = await getDoc(doc(db, 'students', data.studentId));
        const student = studentSnap.exists() ? studentSnap.data() : {};

        txList.push({
          id: tx.id,
          name: student.fullName || 'Unknown',
          amount: data.amountPaid || 0,
          paidAt: data.paidAt,
        });
      }

      setTransactions(txList);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">💳 Recent Transactions</h2>
      <ul>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No recent payments.</p>
        ) : (
          transactions.map((tx) => (
            <li key={tx.id} className="mb-3 border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">{tx.name}</p>
                  <p className="text-sm text-gray-500">
                    {tx.paidAt ? new Date(tx.paidAt.seconds * 1000).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <span className="text-green-600 font-semibold">₹{tx.amount}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentTransactions;
