"use client";

export default function Footer() {
  return (
    <footer className="relative bg-white/80 backdrop-blur-md shadow-inner py-4 text-center text-gray-600 z-10">
      © {new Date().getFullYear()} Plantify. All rights reserved.
    </footer>
  );
}
