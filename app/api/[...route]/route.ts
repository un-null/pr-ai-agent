import { validateUIMessages } from "ai";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { taskAgent } from "@/lib/agent";

const app = new Hono().basePath("/api");

app.post("/chat", async (c) => {
  const { messages } = await c.req.json();

  return taskAgent.respond({
    messages: await validateUIMessages({ messages }),
  });
});

export const POST = handle(app);
