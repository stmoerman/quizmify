import Link from "next/link";
import { redirect } from "next/navigation";
import { LucideLayoutDashboard } from "lucide-react";

import prismadb from "@/lib/prismadb";
import { getAuthSession } from "@/lib/nextauth";
import { buttonVariants } from "@/components/ui/button";
import ResultsCard from "@/components/statistics/results-card";
import AccuracyCard from "@/components/statistics/accuracy-card";
import TimeTakenCard from "@/components/statistics/time-taken-card";
import QuestionList from "@/components/statistics/question-list";

type Props = {
  params: {
    gameId: string;
  };
};

const StatisticsPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prismadb.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true,
    },
  });
  if (!game) {
    return redirect("/quiz");
  }

  // calculate the accuracy
  let accuracy: number = 0;
  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect || 0);
    }, 0);

    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={game.timeEnded}
            timeStarted={game.timeStarted}
          />
        </div>
        <QuestionList questions={game.questions} />
      </div>
    </>
  );
};

export default StatisticsPage;
