import { getAuthSession } from "@/lib/nextauth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import MCQ from "@/components/mcq";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQQuizPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prismadb.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });
  if (!game || game.gameType !== "mcq") {
    return redirect("/quiz");
  }
  return <MCQ game={game} />;
};

export default MCQQuizPage;
