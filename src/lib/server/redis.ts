import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
}

export function isRedisConfigured() {
  return Boolean(getRedisConfig());
}

export function getRedis() {
  const config = getRedisConfig();
  if (!config) {
    return null;
  }

  redisClient ??= new Redis(config);
  return redisClient;
}
