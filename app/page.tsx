"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const { messages, sendMessage } = useChat();

  return (
    <main className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((message) => (
        <div key={message.id} className="mb-4 flex whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
            return "";
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
