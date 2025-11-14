"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center">
        <div className="size-4 animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium">{session.user.name}</p>
        <p className="text-muted-foreground">{session.user.email}</p>
      </div>
      <Button
        size="icon"
        variant={"secondary"}
        className="cursor-pointer"
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
      >
        <LogOut />
      </Button>
    </div>
  );
}
