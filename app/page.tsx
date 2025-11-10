"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { MyAgentUIMessage } from "@/lib/agent";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const { messages, sendMessage } = useChat<MyAgentUIMessage>();

  return (
    <main className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((message) => (
        <div
          key={message.id}
          className="mb-4 flex flex-col whitespace-pre-wrap"
        >
          <p>{message.role === "user" ? "User: " : "AI: "}</p>
          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }

            if (part.type.startsWith("tool-")) {
              const task =
                part.type === "tool-createTask" && part.output?.title;

              return (
                <div key={`${message.id}-${i}`}>
                  <div>{`[ ]: ${task}`}</div>
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <Input
          className="fixed bottom-0 mb-8 w-full max-w-md border-neutral-600"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </main>
  );
}
