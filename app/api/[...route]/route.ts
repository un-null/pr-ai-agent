import { createXai } from "@ai-sdk/xai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

app.post("/chat", async (c) => {
  const { messages }: { messages: UIMessage[] } = await c.req.json();

  const result = await streamText({
    model: xai("grok-3"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
});

export const POST = handle(app);
