import { createXai } from "@ai-sdk/xai";
import { generateText } from "ai";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.post("/test", async (c) => {
  const { text } = await generateText({
    model: xai("grok-3"),
    prompt: "Hi",
  });

  console.log(text);

  return c.json({ text });
});

export const GET = handle(app);
export const POST = handle(app);
