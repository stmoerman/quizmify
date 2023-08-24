import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId } = body;
    await prismadb.game.update({
      where: { id: gameId },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: "Game ended",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
