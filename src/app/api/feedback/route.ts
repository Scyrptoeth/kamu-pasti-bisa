import { NextResponse } from "next/server";
import { saveFeedback, getAllFeedbacks } from "@/lib/server/feedback";
import { isRedisConfigured } from "@/lib/server/redis";

export async function POST(request: Request) {
  if (!isRedisConfigured()) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const { message } = await request.json();
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const entry = await saveFeedback(message);
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!isRedisConfigured()) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const feedbacks = await getAllFeedbacks();
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Feedback retrieval error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
