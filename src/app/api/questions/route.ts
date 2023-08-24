import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";

import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

// POST /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    // TODO: Find a way to use next-auth to protect API routes and pass credentials
    // const session = await getAuthSession();

    // if (!session?.user) {
    //   return NextResponse.json(
    //     {
    //       error: "You must be logged in to create a quiz",
    //     },
    //     { status: 401 }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    let questions: any[] = [];

    while (questions.length < amount) {
      let generatedQuestions: any[] = []; // Initialize with an empty array

      if (type === "open_ended") {
        generatedQuestions = await strict_output(
          "You are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words, store all the pairs of answers and questions in a JSON array",
          new Array(amount - questions.length).fill(
            `You are to generate a random hard open-ended question about ${topic}`
          ),
          {
            question: "question",
            answer: "answer with max length of 15 words",
          }
        );
      } else if (type === "mcq") {
        generatedQuestions = await strict_output(
          "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not exceed 15 words",
          new Array(amount - questions.length).fill(
            `You are to generate a random mcq about ${topic}`
          ),
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "1st option with max length of 15 words",
            option2: "2nd option with max length of 15 words",
            option3: "3rd option with max length of 15 words",
          }
        );
      }

      questions = questions.concat(generatedQuestions);
    }

    questions = questions.slice(0, amount); // Ensure the final list matches the specified amount

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
  }
};
