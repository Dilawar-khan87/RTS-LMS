"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: form.name,
        email: form.email,
        role: form.role
      });

      alert("Signup successful! Redirecting to login...");
      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="principal">Principal</option>
          <option value="clerk">Clerk</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
        <p className="text-sm text-center">
          Already have an account? <a href="/LogIn" className="text-blue-600">Login</a>
        </p>
      </form>
    </div>
  );
}

//====================================================================
// This component is for testing Firebase signup functionality.

// "use client";

// import { auth } from "../../lib/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default function SignUpTest() {
//   const testSignup = () => {
//     createUserWithEmailAndPassword(auth, "testuser@gmail.com", "test1234")
//       .then(() => alert("✅ Signup successful! Firebase connected properly"))
//       .catch((err) => alert("❌ Error: " + err.message));
//   };

//   return (
//     <div className="p-10">
//       <button
//         onClick={testSignup}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Test Firebase Signup
//       </button>
//     </div>
//   );
// }