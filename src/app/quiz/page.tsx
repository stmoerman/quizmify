import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

import QuizCreation from "@/components/forms/quiz-creation";

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: "Quiz | Quizmify",
};

const QuizPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }
  return <QuizCreation topicParam={searchParams.topic ?? ""} />;
};

export default QuizPage;
