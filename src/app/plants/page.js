"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from "@/components/SearchFilter";
import PlantCard from "@/components/PlantCard";
import Background from "@/components/Background";
import Pagination from "./_component/Pagination";

export default function PlantsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of cards per page

  const plants = [
    {
      id: 1,
      name: "Snake Plant",
      category: "Indoor",
      price: 25,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 2,
      name: "Aloe Vera",
      category: "Succulent",
      price: 15,
      inStock: false,
      image: "/plant.png",
    },
    {
      id: 3,
      name: "Peace Lily",
      category: "Air Purifying",
      price: 30,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 4,
      name: "Fern",
      category: "Outdoor",
      price: 20,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 5,
      name: "Fiddle Leaf",
      category: "Indoor",
      price: 45,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 6,
      name: "Monstera",
      category: "Indoor",
      price: 50,
      inStock: false,
      image: "/plant.png",
    },
    {
      id: 7,
      name: "Cactus",
      category: "Succulent",
      price: 18,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 8,
      name: "Bonsai",
      category: "Home Decor",
      price: 70,
      inStock: true,
      image: "/plant.png",
    },
    {
      id: 9,
      name: "Bonsai",
      category: "Home Decor",
      price: 70,
      inStock: true,
      image: "/plant.png",
    },
  ];

  // Filter plants based on search and category
  const filteredPlants = plants.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? plant.category === category : true)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlants = filteredPlants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Background />
      <Header />
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        <SearchFilter onSearch={setSearch} onCategoryChange={setCategory} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
