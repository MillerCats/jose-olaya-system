"use server";

import { db } from "@/data";
import {  users } from "@/data/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function goDashboard(formData: FormData) {
  const data = {
    user: formData.get("user"),
    pass: formData.get("password"),
  };
  console.log(data);
  redirect("/dashboard");
}



export async function registerUser(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";

  if (!name || !password) {
    throw new Error("Debe ingresar usuario y contraseña");
  }

  // ✅ Insertar usuario en la base de datos
  db.insert(users)
    .values({
      name: name,
      email,
      dni: "789456",
      pass: password,
      rolId: 1,
    })
    .run();

  console.log("Usuario registrado:", name);

  redirect("/dashboard");
}

export async function agregarAlumno(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim() ?? "";
  const grado = formData.get("grado")?.toString().trim() ?? "";

  if (!nombre || !grado) return;
/* 
  db.insert(users).values({ nombre, grado }).run(); */
  revalidatePath("/dashboard/alumnos");
}
