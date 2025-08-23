import { connectToDatabase } from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: "MongoDB connection successful!" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to connect to MongoDB", details: err.message },
      { status: 500 }
    );
  }
}
