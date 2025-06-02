"use client";

import { useState } from "react";

const categories = [
  {
    title: "School Activities",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1525186402429-7e0a5c7b5f24?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515165562835-cd4f3306f282?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b5116915d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503424886304-8388f74bb1a3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Games",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508172773048-3a14f2c67b43?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1496317556649-f930d733eea2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Functions",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b5116915d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534351590661-cf4c5edaf1b7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503424886304-8388f74bb1a3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1496317556649-f930d733eea2?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Speeches",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1525186402429-7e0a5c7b5f24?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    title: "Seminars",
    images: [
      "https://images.unsplash.com/photo-1515165562835-cd4f3306f282?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508172773048-3a14f2c67b43?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1496317556649-f930d733eea2?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState({ open: false, src: "" });

  const openLightbox = (src) => setLightbox({ open: true, src });
  const closeLightbox = () => setLightbox({ open: false, src: "" });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold text-navyblue mb-16 text-center drop-shadow-md">
        School Gallery
      </h1>

      {categories.map(({ title, images }) => (
        <section key={title} className="mb-20">
          <h2 className="text-3xl font-extrabold text-navyblue mb-6 text-center md:text-left 
                          bg-clip-text text-transparent
                          bg-gradient-to-r from-sky-500 to-navyblue
                          border-b-4 border-gradient-to-r border-sky-400 border-opacity-70
                          pb-2
          ">
            {title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer
                           transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => openLightbox(src)}
              >
                <img
                  src={src}
                  alt={`${title} image ${idx + 1}`}
                  className="w-full h-56 object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navyblue/70 via-transparent to-transparent opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-xl flex items-end p-4">
                  <p className="text-white font-semibold drop-shadow-md">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox Overlay */}
      {lightbox.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 cursor-pointer"
          onClick={closeLightbox}
          aria-label="Close image preview"
        >
          <img
            src={lightbox.src}
            alt="Expanded gallery"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
