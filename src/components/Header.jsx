"use client";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="relative flex justify-between items-center px-6 py-4 shadow-md bg-white/80 backdrop-blur-md z-10">
      <h1 className="text-2xl font-bold text-green-700">🌱 Plantify</h1>
      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 shadow-md">
        Add Post
      </Button>
    </header>
  );
}
