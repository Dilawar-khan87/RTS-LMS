"use client";

import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/LogIn");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-600 font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
