"use client";
import { useState } from "react";
// import Sidebar from './components/SideBar';
import OverviewCards from "./components/OverviewCards";

export default function ClerkHome() {
  return (
    <div className="min-h-screen bg-gray-100 flex mt-6">
      <main className="flex-1 p-6">
        <OverviewCards />
      </main>
    </div>
  );
}
