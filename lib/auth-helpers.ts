import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSessionOrThrow() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function getUserId() {
  const session = await getSessionOrThrow();
  return session.user.id;
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
