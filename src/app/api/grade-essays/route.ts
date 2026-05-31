import { NextResponse } from "next/server";
import { gradeEssay } from "@/lib/api-deepseek";

export async function POST(request: Request) {
  try {
    const { essays } = await request.json();

    if (!essays || !Array.isArray(essays)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Proses penilaian secara paralel untuk efisiensi waktu
    const gradingPromises = essays.map(async (essay: any) => {
      const result = await gradeEssay(
        essay.question,
        essay.idealAnswer,
        essay.studentAnswer
      );
      return {
        id: essay.id,
        score: result.score,
        explanation: result.explanation
      };
    });

    const results = await Promise.all(gradingPromises);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
