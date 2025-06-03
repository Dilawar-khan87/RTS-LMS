"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GalleryList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this image?")) {
      await deleteDoc(doc(db, "gallery", id));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img) => (
        <div key={img.id} className="bg-white shadow p-2 rounded">
          <img src={img.url} alt={img.title} className="w-full h-48 object-cover rounded" />
          <div className="mt-2">
            <h4 className="font-semibold">{img.title}</h4>
            <button
              onClick={() => handleDelete(img.id)}
              className="mt-1 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
