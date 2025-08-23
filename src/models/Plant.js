import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Add text index on name + categories for search
PlantSchema.index({ name: "text", categories: "text" });

// Prevent model overwrite issue in Next.js / hot reload
const Plant = mongoose.models.Plant || mongoose.model("Plant", PlantSchema);

export default Plant;
