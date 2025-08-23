"use client";

import { useState } from "react";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const categories = [
  "Indoor",
  "Outdoor",
  "Succulent",
  "Air Purifying",
  "Home Decor",
];

export default function PlantNurseryDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState(null);


  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      name,
      price,
      categories: selectedCategories,
      inStock,
      imageFile, // now sending the file
    };
    console.log("Plant added:", newPlant);

    // Reset form
    setName("");
    setPrice("");
    setSelectedCategories([]);
    setInStock(true);
    setImageFile(null);
  };


  return (
    <div className="relative flex flex-col min-h-screen">
      <Background />
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 z-10">
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center tracking-tight">
          🌿 Plant Nursery Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 flex flex-col gap-6"
        >
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full px-4 py-3 rounded-xl border border-green-300 focus:border-green-500 focus:ring-green-500 focus:outline-none transition placeholder-transparent"
            />

            <label className="absolute left-4 top-3 text-gray-400 text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-green-600 peer-focus:text-sm transition-all">
              Plant Name
            </label>
          </div>

          {/* Price */}
          <div className="relative">
            <input
              type="number"
              placeholder=" "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="peer w-full px-4 py-3 rounded-xl border border-green-300 focus:border-green-500 focus:ring-green-500 focus:outline-none transition placeholder-transparent"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-green-600 peer-focus:text-sm transition-all">
              Price
            </label>
          </div>

          {/* Categories */}
          <div>
            <p className="text-gray-600 font-medium mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full border font-medium transition-all ${
                    selectedCategories.includes(cat)
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white border-green-300 hover:bg-green-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <label className="flex items-center gap-3 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-5 h-5 accent-green-600"
            />
            <span className="text-gray-700 font-medium">In Stock</span>
          </label>

          {/* Image URL */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-3 rounded-xl border border-green-300 focus:border-green-500 focus:ring-green-500 focus:outline-none transition"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-3 w-32 h-24 object-cover rounded-xl shadow-md"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Add Plant
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
