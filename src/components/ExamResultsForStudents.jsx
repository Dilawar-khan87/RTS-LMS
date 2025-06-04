'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { BarChart3 } from 'lucide-react';

const ExamResultsForStudents = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return; // No user logged in, don't fetch
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const examsRef = collection(db, 'results', currentUser.uid, 'exams');
        const snapshot = await getDocs(examsRef);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setResults(list);
      } catch (err) {
        console.error('Failed to fetch exam results:', err);
      }
      setLoading(false);
    };

    fetchResults();
  }, [auth, db]);

  if (loading) return <p className="text-center mt-8">Loading results...</p>;
  if (results.length === 0) return <p className="text-center mt-8 text-gray-500">No exam results available yet.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex justify-center items-center gap-2">
          <BarChart3 className="text-blue-500" size={28} />
          Exam Results
        </h2>
        <p className="text-gray-600 text-sm mt-1">View your latest performance and scores</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {results.map(({ id, subject, examType, score, total, date }) => {
          const percentage = (score / total) * 100;
          const passed = percentage >= 40;
          return (
            <div key={id} className={`rounded-xl p-5 shadow-lg border ${passed ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
              <h3 className="text-xl font-semibold text-gray-800">{subject}</h3>
              <p className="text-sm text-gray-500 mb-1">📚 {examType}</p>
              <p className="text-lg font-bold">
                Score: {score} / {total} ({Math.round(percentage)}%)
              </p>
              <p className={`text-sm mt-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
                {passed ? '✔ Passed' : '❌ Failed'}
              </p>
              {date && (
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date(date.seconds * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// export default ExamResults;

export default ExamResultsForStudents;
