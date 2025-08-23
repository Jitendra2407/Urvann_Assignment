import { connectToDatabase } from "@/lib/mongodb";
import Plant from "@/models/Plant";

export async function GET(req) {
  try {
    await connectToDatabase(); // ensures Mongoose connection

    const { searchParams } = new URL(req.url);

    let q = searchParams.get("q");
    let category = searchParams.get("category");
    let inStock = searchParams.get("inStock");
    let page = parseInt(searchParams.get("page") || "1", 10);
    let limit = parseInt(searchParams.get("limit") || "10", 10);
    let sort = searchParams.get("sort");

    // Build filter object
    const filter = {};

    if (q) {
      filter.$text = { $search: q }; // uses text index on name + categories
    }

    if (category) {
      filter.categories = category; // exact match in categories array
    }

    if (inStock !== null && inStock !== undefined) {
      filter.inStock = inStock === "true";
    }

    // ↕Sorting
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    // Query DB
    const total = await Plant.countDocuments(filter);
    const results = await Plant.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return Response.json({
      total,
      page,
      limit,
      results,
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch plants" }), {
      status: 500,
    });
  }
}


//1. Get first page, 10 plants:

// http://localhost:3000/api/plants?page=1&limit=10


//2. Search by name or categories (q)

// http://localhost:3000/api/plants?q=succulent


//3. Filter by category

// http://localhost:3000/api/plants?category=Indoor


//4. Filter by inStock

// http://localhost:3000/api/plants?inStock=true


//5. Sort results by price descending

// http://localhost:3000/api/plants?sort=price:desc


//6. Combine filters + pagination + sorting

// http://localhost:3000/api/plants?q=plant&category=Indoor&inStock=true&page=1&limit=5&sort=price:asc