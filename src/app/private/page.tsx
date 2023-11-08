"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl">Private Zone</h1>
      <button
        className="bg-white text-black px-4 py-2 mt-4 rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </section>
  );
}

export default DashboardPage;
