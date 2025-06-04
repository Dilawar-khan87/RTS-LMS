'use client';
import { useState } from 'react';
import { getFirestore, doc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';

const Testing = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [subject, setSubject] = useState('');
  const [examType, setExamType] = useState('');
  const [score, setScore] = useState('');
  const [total, setTotal] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setMessage('Please login first!');
      return;
    }

    if (!subject || !examType || !score || !total) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const examsRef = collection(db, 'results', user.uid, 'exams');
      await addDoc(examsRef, {
        subject,
        examType,
        score: Number(score),
        total: Number(total),
        date: Timestamp.now(),
      });
      setMessage('Result added successfully!');
      // Clear form
      setSubject('');
      setExamType('');
      setScore('');
      setTotal('');
    } catch (error) {
      console.error('Error adding result:', error);
      setMessage('Failed to add result');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Exam Result (Test)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Exam Type (e.g. Midterm, Final)"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Total Marks"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Result
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default Testing;
