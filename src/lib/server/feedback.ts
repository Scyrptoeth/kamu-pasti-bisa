import { getRedis } from "./redis";

export type FeedbackEntry = {
  id: string;
  message: string;
  timestamp: string;
};

const FEEDBACK_LIST_KEY = "kamu-pasti-bisa:feedbacks";

export async function saveFeedback(message: string) {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  const entry: FeedbackEntry = {
    id: Math.random().toString(36).substring(2, 15),
    message,
    timestamp: new Date().toISOString(),
  };

  await redis.lpush(FEEDBACK_LIST_KEY, JSON.stringify(entry));
  return entry;
}

export async function getAllFeedbacks(): Promise<FeedbackEntry[]> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  const rawEntries = await redis.lrange(FEEDBACK_LIST_KEY, 0, -1);
  return rawEntries.map((e: any) => (typeof e === "string" ? JSON.parse(e) : e));
}
