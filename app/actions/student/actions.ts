"use server";

import { db } from "@/data";
import { attendances, courses, enrollments, users } from "@/data/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getAllStudents() {
  const data = db.select().from(users).where(eq(users.rolId, 2));
  return data;
}

export async function getStudentAttendances() {
  const cookieStore = await cookies();
  const studentId = Number(cookieStore.get("user_id")?.value);
  console.log(studentId);
  const data = await db
    .select({
      id: attendances.id,
      course: courses.name,
      status: attendances.status,
      registeredBy: users.name,
      createdAt: attendances.createdAt,
    })
    .from(attendances)
    .innerJoin(enrollments, eq(attendances.enrollmentId, enrollments.id))
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .innerJoin(users, eq(attendances.registeredBy, users.id))
    .where(eq(enrollments.alumnoId, studentId))
    .orderBy(attendances.createdAt);

  return data;
}
