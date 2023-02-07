import Redis from "ioredis";

// Create a container for redis
export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
});
