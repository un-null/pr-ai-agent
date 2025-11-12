import { validateUIMessages } from "ai";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { createTaskAgent } from "@/lib/agent";
import { auth } from "@/lib/auth";

const app = new Hono().basePath("/api");

app.post("/chat", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { messages } = await c.req.json();

  const taskAgent = createTaskAgent(session.user.id);

  return taskAgent.respond({
    messages: await validateUIMessages({ messages }),
  });
});

export const POST = handle(app);
