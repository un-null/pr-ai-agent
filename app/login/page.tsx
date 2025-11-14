"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-fit px-4">
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="cursor-pointer"
          variant={"secondary"}
          size="lg"
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
