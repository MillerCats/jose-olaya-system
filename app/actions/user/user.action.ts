"use server"

import { db } from "@/data"
import { roles, users } from "@/data/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getAllUsersWithRoles() {
  try {
    const result = await db
      .select({
        id: users.id,
        dni: users.dni,
        name: users.name,
        email: users.email,
        rolId: users.rolId,
        roleName: roles.name,
        roleDescription: roles.description
      })
      .from(users)
      .leftJoin(roles, eq(users.rolId, roles.id))
      .orderBy(users.id)

    return result
  } catch (error) {
    console.error("Error fetching users with roles:", error)
    return []
  }
}

export async function getUserById(id: number) {
  try {
    const result = await db
      .select({
        id: users.id,
        dni: users.dni,
        name: users.name,
        email: users.email,
        pass: users.pass,
        rolId: users.rolId,
        roleName: roles.name,
        roleDescription: roles.description
      })
      .from(users)
      .leftJoin(roles, eq(users.rolId, roles.id))
      .where(eq(users.id, id))

    return result[0] || null
  } catch (error) {
    console.error("Error fetching user by id:", error)
    return null
  }
}

export async function updateUser(id: number, formData: {
  dni: string
  name: string
  email: string
  pass?: string
  rolId: string
}) {
  try {
    const rolIdNumber = parseInt(formData.rolId)

    // Preparar los datos a actualizar
    const updateData: any = {
      dni: formData.dni,
      name: formData.name,
      email: formData.email,
      rolId: rolIdNumber
    }

    // Solo actualizar la contraseña si se proporcionó una nueva
    if (formData.pass && formData.pass.trim() !== '') {
      updateData.pass = formData.pass
    }

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning()

    revalidatePath("/dashboard/direccion")

    return {
      success: true,
      message: "Usuario actualizado exitosamente",
      user: result[0]
    }
  } catch (error: any) {
    console.error("Error actualizando usuario:", error)

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
      message: "Error al actualizar el usuario"
    }
  }
}