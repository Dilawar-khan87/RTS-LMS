"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { db, auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState(""); // for reauth
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setEmail(user.email || ""); // Auth email
        setPhotoURL(data.photoURL || "");
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!password) {
      alert("Please enter your current password to update email.");
      return;
    }

    try {
      setLoading(true);

      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update email in Firebase Auth if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update Firestore user document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        email,
        photoURL,
      });

      alert("Profile updated successfully!");
      setPassword("");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Current Password (for email update)</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label>Photo URL</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
