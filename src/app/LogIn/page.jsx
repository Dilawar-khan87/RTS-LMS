// "use client";

// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signInWithEmailAndPassword(auth, form.email, form.password);
//       const userDoc = await getDoc(doc(db, "users", res.user.uid));
//       const userData = userDoc.data();

//       switch (userData.role) {
//         case "principal":
//           router.push("/dashboard/principal");
//           break;
//         case "clerk":
//           router.push("/dashboard/clerk");
//           break;
//         case "teacher":
//           router.push("/dashboard/teacher");
//           break;
//         case "student":
//           router.push("/dashboard/student");
//           break;
//         default:
//           router.push("/");
//       }
//     } catch (err) {
//       alert("Login error: " + err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input name="email" type="email" required placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
//         <input name="password" type="password" required placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />
        
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
//         <p className="text-sm mt-2">Don’t have an account? <Link href="/SignUp" className="text-blue-600">Signup</Link></p>
//       </form>
//     </div>
//   );
// }
//=================================================================================
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        alert("User data not found.");
        return;
      }

      const userData = userDoc.data();
      switch (userData.role) {
        case "principal":
          router.push("/dashboard/principal");
          break;
        case "clerk":
          router.push("/dashboard/clerk");
          break;
        case "teacher":
          router.push("/dashboard/teacher");
          break;
        case "student":
          router.push("/dashboard/student");
          break;
        default:
          alert("Unknown role.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account? <a href="/SignUp" className="text-blue-600">Signup</a>
        </p>
      </form>
    </div>
  );
}
