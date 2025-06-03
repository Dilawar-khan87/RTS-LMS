// lib/firestore.js

import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export const addAnnouncement = async (announcement) => {
  const ref = collection(db, "announcements");
  return await addDoc(ref, {
    ...announcement,
    createdAt: serverTimestamp(),
  });
};

export const updateAnnouncement = async (id, data) => {
  const ref = doc(db, "announcements", id);
  return await updateDoc(ref, data);
};

export const deleteAnnouncement = async (id) => {
  const ref = doc(db, "announcements", id);
  return await deleteDoc(ref);
};

export const getAllAnnouncements = async () => {
  const ref = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
