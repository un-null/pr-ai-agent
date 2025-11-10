import { createXai } from "@ai-sdk/xai";
import {
  Experimental_Agent as Agent,
  type Experimental_InferAgentUIMessage as InferAgentUIMessage,
  tool,
} from "ai";
import { z } from "zod";

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

let sessionTasks: Array<{
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}> = [];

export const taskAgent = new Agent({
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
          title,
          description,
          createdAt: new Date(),
        };
        sessionTasks = [...sessionTasks, task];

        console.log("Task created:", task);
        return task;
      },
    }),
  },
});

export type MyAgentUIMessage = InferAgentUIMessage<typeof taskAgent>;
