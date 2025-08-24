import { connectToDatabase } from "@/lib/mongodb";
import Plant from "@/models/Plant";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const inStock = searchParams.get("inStock");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort");

    const filter = [];

    if (q) {
      filter.push({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { categories: { $regex: q, $options: "i" } },
        ],
      });
    }

    if (category) {
      filter.push({ categories: category });
    }

    if (inStock !== null && inStock !== undefined) {
      filter.push({ inStock: inStock === "true" });
    }

    const finalFilter = filter.length > 0 ? { $and: filter } : {};

    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    const total = await Plant.countDocuments(finalFilter);
    const results = await Plant.find(finalFilter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return Response.json({ total, page, limit, results });
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