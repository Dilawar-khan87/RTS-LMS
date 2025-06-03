"use client";
import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function GalleryUploader() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please enter a title and select an image.");
      return;
    }

    setUploading(true);
    try {
      const imageRef = ref(storage, `gallery/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "gallery"), {
        title,
        url: downloadURL,
        uploadedAt: serverTimestamp(),
      });

      alert("Image uploaded successfully!");
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error.message);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
      <input
        type="text"
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="w-full mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
