"use server";

import { db } from "@/data";
import {
  attendances,
  classrooms,
  courses,
  enrollments,
  users,
} from "@/data/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getClassrooms() {
  const cookieStore = await cookies();
  const teacherId = cookieStore.get("user_id")?.value;

  if (!teacherId) {
    throw new Error("No se encontró el ID del docente en las cookies");
  }

  const data = db
    .select({
      grade: classrooms.grade,
      section: classrooms.section,
      year: classrooms.year,
      courseName: courses.name,
      courseId: courses.id,
      classroomId: classrooms.id,
    })
    .from(courses)
    .innerJoin(classrooms, eq(courses.classroomId, classrooms.id))
    .where(eq(courses.docenteId, parseInt(teacherId)));

  return data;
}

export async function getStudentsFromClass(courseId: number) {
  const data = await db
    .select({
      id: users.id,
      dni: users.dni,
      name: users.name,
    })
    .from(enrollments)
    .innerJoin(users, eq(enrollments.alumnoId, users.id))
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .innerJoin(classrooms, eq(courses.classroomId, classrooms.id))
    .where(eq(enrollments.courseId, courseId));

  return data;
}

export async function registerAttendance(formData: FormData) {
  const teacherId = (await cookies()).get("user_id")?.value;

  if (!teacherId) throw new Error("Docente no autenticado");

  const enrollmentId = Number(formData.get("enrollmentId"));
  const status = formData.get("status") as
    | "presente"
    | "ausente"
    | "tardanza"
    | "justificado";

  if (!enrollmentId || !status) {
    throw new Error("Datos incompletos para registrar asistencia");
  }

  await db.insert(attendances).values({
    enrollmentId: enrollmentId,
    status: status,
    registeredBy: Number(teacherId),
  });
}
