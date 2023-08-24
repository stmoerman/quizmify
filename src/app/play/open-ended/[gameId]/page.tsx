import { getAuthSession } from "@/lib/nextauth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import OpenEnded from "@/components/open-ended";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedQuizPage = async ({ params: { gameId } }: Props) => {
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
          answer: true,
        },
      },
    },
  });
  if (!game || game.gameType !== "open_ended") {
    return redirect("/quiz");
  }
  return <OpenEnded game={game} />;
};

export default OpenEndedQuizPage;
