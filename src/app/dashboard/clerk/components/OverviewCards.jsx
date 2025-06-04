'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const OverviewCards = () => {
  const db = getFirestore(app);
  const [stats, setStats] = useState({
    totalCollected: 0,
    pending: 0,
    totalStudents: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feesSnap = await getDocs(collection(db, 'fees'));
        const studentSnap = await getDocs(collection(db, 'students'));

        let collected = 0;
        let pending = 0;

        feesSnap.forEach(doc => {
          const data = doc.data();
          if (data.status === 'paid') {
            collected += data.amountPaid || 0;
          } else {
            pending += data.amountPaid || 0;
          }
        });

        setStats({
          totalCollected: collected,
          pending: pending,
          totalStudents: studentSnap.size,
          totalTransactions: feesSnap.size,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
  <div className="grid gap-6 grid-cols-2 ">
    <Card title="Total Fees Collected" value={`₹${stats.totalCollected}`} color="green" />
    <Card title="Pending Fees" value={`₹${stats.pending}`} color="red" />
    <Card title="Total Students" value={stats.totalStudents} color="blue" />
    <Card title="Total Transactions" value={stats.totalTransactions} color="purple" />
  </div>
);
}
const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border-4 transition duration-300 ease-in-out"
       style={{ borderTopColor: getColor(color) }}>
    <div className="flex flex-col gap-2">
      <h3 className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Helper function to map color names to Tailwind color values
const getColor = (color) => {
  const colors = {
    green: '#10B981',
    red: '#EF4444',
    blue: '#3B82F6',
    purple: '#8B5CF6',
  };
  return colors[color] || '#CBD5E0'; // fallback gray
};

export default OverviewCards;
