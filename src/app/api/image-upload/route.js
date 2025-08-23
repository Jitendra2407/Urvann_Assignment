import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to a buffer for Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "plants",
        resource_type: "image",
      },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );

    // Using a promise wrapper for upload_stream
    const upload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "plants" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

    const uploadResult = await upload();

    return NextResponse.json(
      { imageUrl: uploadResult.secure_url },
      { status: 200 }
    );
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
