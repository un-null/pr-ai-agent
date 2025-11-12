import { createXai } from "@ai-sdk/xai";
import {
  Experimental_Agent as Agent,
  type Experimental_InferAgentUIMessage as InferAgentUIMessage,
  tool,
} from "ai";
import { z } from "zod";
import { db } from "@/db";
import { tasks } from "@/db/schema";

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

export function createTaskAgent(userId: string) {
  return new Agent({
    model: xai("grok-3"),
    system: `You are a helpful assistant that can create tasks for users. When a user asks you to create a task, use the createTask tool to add it to their task list. Be proactive and create tasks when the user mentions things they need to do.`,
    tools: {
      createTask: tool({
        description: "Create a new task with a title and description",
        inputSchema: z.object({
          title: z.string().describe("The title of the task"),
          description: z
            .string()
            .describe("The detailed description of the task"),
        }),
        execute: async ({ title, description }) => {
          const task = {
            id: crypto.randomUUID(),
            userId,
            chatId: null,
            title,
            description,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
          };

          await db.insert(tasks).values(task);

          console.log("Task created and saved to database:", task);
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
          };
        },
      }),
    },
  });
}

const dummyAgent = createTaskAgent("dummy");
export type MyAgentUIMessage = InferAgentUIMessage<typeof dummyAgent>;
