import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Ensure the Prisma Client is only instantiated once in a serverless environment
const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    try {
      const replay = await prisma.game.findUnique({
        where: { id: Number(id) },
        include: {
          movements: {
            orderBy: { id: "desc" },
          },
        },
      });
      return replay
        ? new Response(JSON.stringify(replay), { status: 200 })
        : new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    } catch (error) {
      console.error("Error fetching replay:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  } else {
    try {
      const replays = await prisma.game.findMany({
        include: {
          movements: {
            orderBy: { id: "desc" },
          },
        },
        orderBy: { id: "desc" },
      });
      return new Response(JSON.stringify(replays), { status: 200 });
    } catch (error) {
      console.error("Error fetching replays:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const replay = await prisma.game.create({ data });
    return new Response(JSON.stringify(replay), { status: 201 });
  } catch (error) {
    console.error("Error creating replay:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await request.json();
  try {
    const replay = await prisma.game.update({
      where: { id: Number(data.id) },
      data,
    });
    return replay
      ? new Response(JSON.stringify(replay), { status: 200 })
      : new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  } catch (error) {
    console.error("Error updating replay:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const replay = await prisma.game.delete({ where: { id: Number(id) } });
    return replay
      ? new Response(JSON.stringify(replay), { status: 200 })
      : new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  } catch (error) {
    console.error("Error deleting replay:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
