import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomWordCloud from "@/components/dashboard/custom-word-cloud";
import prismadb from "@/lib/prismadb";

type Props = {};

const HotTopics = async (props: Props) => {
  const topics = await prismadb.topicCount.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <CardDescription>
            Click on a topic to start a quiz on it!
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopics;
