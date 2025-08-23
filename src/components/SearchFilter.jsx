"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchFilter({ onSearch, onCategoryChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Indoor",
    "Outdoor",
    "Succulent",
    "Air Purifying",
    "Home Decor",
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full">
      {/* Search Input */}
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-full pl-12 pr-4 py-2 rounded-full border text-gray-500 border-green-300 bg-white/70 backdrop-blur-sm shadow-sm placeholder-gray-400 transition-all
                     focus:outline-none focus:border-green-600 focus:ring-0"
        />
      </div>

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          onCategoryChange(e.target.value);
        }}
        className="w-full md:w-1/3 px-4 py-2 rounded-full border border-green-300 bg-white/70 backdrop-blur-sm shadow-sm text-black transition-all
                   focus:outline-none focus:border-green-600 focus:ring-0"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
