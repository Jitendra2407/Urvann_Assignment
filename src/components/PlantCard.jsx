"use client";

import Image from "next/image";

export default function PlantCard({ plant }) {
  return (
    <div className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col bg-white/80">
      {/* Image Container */}
      <div className="w-full aspect-[5/4] relative mb-4">
        <Image
          src={plant.image}
          alt={plant.name}
          fill
          className="rounded-xl object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <h3 className="text-lg font-semibold text-green-700">{plant.name}</h3>
      <p className="text-gray-500 text-sm">{plant.category}</p>
      <p className="text-green-600 font-bold mt-2">${plant.price}</p>
      <p
        className={`mt-1 text-sm ${
          plant.inStock ? "text-green-500" : "text-red-500"
        }`}
      >
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
