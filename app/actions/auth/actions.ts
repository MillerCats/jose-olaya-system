"use server";

import { db } from "@/data";
import { roles, users } from "@/data/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const cookieStore = await cookies();
  const redirectTo = formData.get("redirectTo") as string;
  const data = {
    user: formData.get("user") as string,
    password: formData.get("password") as string,
  };

  const user = db
    .select()
    .from(users)
    .where(and(eq(users.name, data.user), eq(users.pass, data.password)))
    .get();

  if (!user) {
    redirect(`/login?message=Credenciales inválidas&redirect=${redirectTo}`);
  }

  const role = db
    .select({ name: roles.name })
    .from(roles)
    .where(eq(roles.id, user.rolId))
    .get();

  if (role && user) {
    if (redirectTo.includes(role.name)) {
      cookieStore.set("user_role", role.name, { path: "/" });
      cookieStore.set("user_id", user.id.toString(), { path: "/" });
      cookieStore.set("username", user.name, { path: "/" });
      redirect(redirectTo);
    }
  }

  redirect("/access-denied");
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("user_role");
  cookieStore.delete("user_id");
  cookieStore.delete("username");
  redirect("/");
}

export async function getUser() {
  const cookieStore = await cookies();
  return cookieStore.get("username")?.value;
}
