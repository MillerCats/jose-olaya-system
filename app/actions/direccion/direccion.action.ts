"use server"


import { db } from "@/data"
import { users } from "@/data/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createUser(formData: {
  dni: string
  name: string
  email: string
  pass: string
  rolId: string
}) {
  try {
    // Convertir rolId a número
    const rolIdNumber = parseInt(formData.rolId)

    const result = await db.insert(users).values({
      dni: formData.dni,
      name: formData.name,
      email: formData.email,
      pass: formData.pass, // En un caso real, deberías hashear la contraseña
      rolId: rolIdNumber
    }).returning()

    revalidatePath("/dashboard/direccion")
    return {
      success: true,
      message: "Usuario creado exitosamente",
      user: result[0]
    }
  } catch (error: any) {
    console.error("Error creando usuario:", error)

    // Manejar errores específicos de Drizzle/DB
    if (error.message?.includes("UNIQUE constraint failed")) {
      if (error.message.includes("dni")) {
        return {
          success: false,
          message: "El DNI ya está registrado"
        }
      }
      if (error.message.includes("email")) {
        return {
          success: false,
          message: "El email ya está registrado"
        }
      }
    }

    return {
      success: false,
      message: "Error al crear el usuario"
    }
  }
}