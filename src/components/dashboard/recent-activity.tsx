import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const RecentActivity = (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activtities</CardTitle>
        <CardDescription>You have played a total of 7 games</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        History here
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
