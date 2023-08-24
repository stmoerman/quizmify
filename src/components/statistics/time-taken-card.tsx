import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  timeEnded: Date | null;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  let timeDifference = 0;

  if (timeEnded) {
    // Calculate the time difference only if timeEnded is not null
    timeDifference = differenceInSeconds(timeEnded, timeStarted);
  }

  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {timeEnded ? formatTimeDelta(timeDifference) : "Time not ended"}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
