import { connectToDatabase } from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for plant validation
const plantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be >= 0"),
  categories: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
  imageUrl: z.string().url("Must be a valid URL"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    const validatedData = plantSchema.parse(body);

    await connectToDatabase();

    const plant = await Plant.create(validatedData);

    return NextResponse.json(plant, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
