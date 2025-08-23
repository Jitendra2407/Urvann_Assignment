// const fs = require("fs");
// const path = require("path");
// const Plant = require("../models/Plant");
// import { connectToDatabase } from "@/lib/mongodb";

// const seedPlants = async () => {
//   try {
//     await connectToDatabase();
//     console.log("MongoDB connected");

//     // ✅ Use process.cwd() instead of __dirname
//     const filePath = path.join(process.cwd(), "src", "data", "plants.json");
//     const plantsData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//     // Clear existing plants
//     await Plant.deleteMany({});
//     console.log("Existing plants cleared");

//     // Insert new plants
//     const inserted = await Plant.insertMany(plantsData);
//     console.log(`${inserted.length} plants added successfully!`);

//     // ✅ Return message instead of killing server
//     return `${inserted.length} plants added successfully!`;
//   } catch (err) {
//     console.error("Error seeding plants:", err);
//     throw err;
//   }
// };

// module.exports = seedPlants;


import fs from "fs";
import path from "path";
import Plant from "../models/Plant";
import { connectToDatabase } from "@/lib/mongodb";

const seedPlants = async () => {
  try {
    await connectToDatabase();
    console.log("MongoDB connected");

    // ✅ Use process.cwd() for absolute project root
    const filePath = path.join(process.cwd(), "src", "data", "plants.json");
    const plantsData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Clear existing plants
    await Plant.deleteMany({});
    console.log("Existing plants cleared");

    // Insert new plants
    const inserted = await Plant.insertMany(plantsData);
    console.log(`${inserted.length} plants added successfully!`);

    return `${inserted.length} plants added successfully!`;
  } catch (err) {
    console.error("Error seeding plants:", err);
    throw err;
  }
};

export default seedPlants;   // ✅ Use ESM export
