"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header(props) {
  const { isHome } = props;
  const router = useRouter();
  return (
    <header className="relative flex justify-between items-center px-6 py-4 shadow-md bg-white/80 backdrop-blur-md z-10">
      <h1
        className="text-2xl font-bold text-green-700 cursor-pointer"
        onClick={() => router.push("/")}
      >
        🌱 Plantify
      </h1>
      {!isHome && (
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 shadow-md">
          Add Post
        </Button>
      )}
    </header>
  );
}
