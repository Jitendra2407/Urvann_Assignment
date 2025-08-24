"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from "@/components/SearchFilter";
import PlantCard from "@/components/PlantCard";
import Background from "@/components/Background";
import Pagination from "./_component/Pagination";
import Loader from "./_component/Loader";
import { jwtDecode } from "jwt-decode";


export default function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // loader state
  const itemsPerPage = 24;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // { userId, email, isAdmin }
        setIsAdmin(decoded.isAdmin);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  // Fetch plants from API
  const fetchPlants = async () => {
    try {
      setLoading(true); // start loader
      const query = new URLSearchParams({
        q: search,
        category: category,
        page: currentPage,
        limit: itemsPerPage,
      });
      console.log("Fetching plants with query:", query.toString());

      const res = await fetch(`/api/plants?${query.toString()}`);
      const data = await res.json();

      setPlants(data.results);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch plants:", error);
    } finally {
      setLoading(false); // stop loader
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [search, category, currentPage]);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Background />
      <Header isAdmin={isAdmin} />

      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        <SearchFilter
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1); // reset page on new search
          }}
          onCategoryChange={(value) => {
            setCategory(value);
            setCurrentPage(1); // reset page on category change
          }}
        />
        {loading ? (
          <Loader /> // show loader while fetching
        ) : plants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-20">No plants found.</p>
        )}

        {totalPages > 1 && !loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
