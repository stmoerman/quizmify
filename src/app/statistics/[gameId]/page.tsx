import Link from "next/link";
import { redirect } from "next/navigation";
import { LucideLayoutDashboard } from "lucide-react";

import prismadb from "@/lib/prismadb";
import { getAuthSession } from "@/lib/nextauth";
import { buttonVariants } from "@/components/ui/button";
import ResultsCard from "@/components/statistics/results-card";
import AccuracyCard from "@/components/statistics/accuracy-card";
import TimeTakenCard from "@/components/statistics/time-taken-card";

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
  });
  if (!game) {
    return redirect("/quiz");
  }

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
          <ResultsCard accuracy={80} />
          <AccuracyCard accuracy={80} />
          <TimeTakenCard timeEnded={new Date()} timeStarted={new Date()} />
        </div>
        {/* <QuestionList /> */}
      </div>
    </>
  );
};

export default StatisticsPage;
