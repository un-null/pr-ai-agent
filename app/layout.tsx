import type { Metadata } from "next";
import "./globals.css";
import { UserMenu } from "@/components/user-menu";

export const metadata: Metadata = {
  title: "PR AI Agent",
  description: "AI-powered task management agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#18181B] text-neutral-200">
        <div className="flex min-h-screen flex-col">
          <header className="border-neutral-800 border-b bg-[#18181B]">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
              <h1 className="font-bold text-xl">PR AI Agent</h1>
              <UserMenu />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
