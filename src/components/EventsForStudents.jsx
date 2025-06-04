'use client';
import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { CalendarDays } from "lucide-react"; // Event icon

const EventsForStudents = () => {
  const db = getFirestore(app);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "events"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const eventList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-blue-500 font-semibold mt-10 animate-pulse">
        Loading events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No events available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          📅 Upcoming Events
        </h2>
        <p className="text-gray-600 mt-2 text-lg">Don’t miss out on important school events!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map(({ id, title, description, eventDate }) => (
          <div
            key={id}
            className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl p-6"
          >
            <div className="flex items-center mb-3 gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <CalendarDays size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4">{description}</p>
            {eventDate && (
              <p className="text-sm text-right text-gray-500 italic">
                Event on {new Date(eventDate.seconds * 1000).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsForStudents;
