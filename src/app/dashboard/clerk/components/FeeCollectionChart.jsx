'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FeeCollectionChart = () => {
  const db = getFirestore(app);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const feesSnap = await getDocs(collection(db, 'fees'));
      const monthlyTotal = {};

      feesSnap.docs.forEach((doc) => {
        const data = doc.data();
        const paidDate = data.paidAt;
        const amount = data.amountPaid || 0;

        if (paidDate && amount) {
          const date = new Date(paidDate.seconds * 1000);
          const month = date.toLocaleString('default', { month: 'short' });

          if (!monthlyTotal[month]) monthlyTotal[month] = 0;
          monthlyTotal[month] += amount;
        }
      });

      const finalData = Object.entries(monthlyTotal).map(([month, total]) => ({
        month,
        total,
      }));

      setChartData(finalData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Monthly Fee Collection</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeeCollectionChart;
