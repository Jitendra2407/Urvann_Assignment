
// import seedPlants from "@/scripts/seedPlants";

// export async function GET() {
//   try {
//     const result = await seedPlants();
//     return new Response(JSON.stringify({ message: result }), { status: 200 });
//   } catch (err) {
//     console.error("Seeding failed:", err);
//     return new Response(JSON.stringify({ error: "Seeding failed" }), {
//       status: 500,
//     });
//   }
// }


import seedPlants from "@/scripts/seedPlants";

export async function GET() {
  try {
    const result = await seedPlants();
    return new Response(JSON.stringify({ message: result }), { status: 200 });
  } catch (err) {
    console.error("Seeding failed:", err);
    return new Response(JSON.stringify({ error: "Seeding failed" }), {
      status: 500,
    });
  }
}
