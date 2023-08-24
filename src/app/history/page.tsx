import { redirect } from "next/navigation";
import Link from "next/link";

import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import HistoryComponent from "@/components/history-component";

type Props = {};

const HistoryPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">History</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className={buttonVariants()}>
            <LucideLayoutDashboard className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <Card className="mt-4">
        <CardContent className="mt-5 max-h-screen overflow-scroll">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
