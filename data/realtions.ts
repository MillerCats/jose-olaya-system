import { relations } from "drizzle-orm";
import * as s from "./schema";

export const usersRelations = relations(s.users, ({ one, many }) => ({
  role: one(s.roles, {
    fields: [s.users.rolId],
    references: [s.roles.id],
  }),
  enrollments: many(s.enrollments), // alumno → matriculas
  coursesTeaching: many(s.courses), // docente → cursos que dicta
  gradesRegistered: many(s.grades), // docente → notas que registró
  attendancesRegistered: many(s.attendances), // docente → asistencias registradas
  documentsUploaded: many(s.documents), // secretario → documentos subidos
}));

// ============================================
// ROLES RELATIONS
// ============================================
export const rolesRelations = relations(s.roles, ({ many }) => ({
  users: many(s.users),
}));

// ============================================
// CLASSROOMS RELATIONS
// ============================================
export const classroomsRelations = relations(s.classrooms, ({ many }) => ({
  courses: many(s.courses), // un aula puede tener varios cursos
}));

// ============================================
// COURSES RELATIONS
// ============================================
export const coursesRelations = relations(s.courses, ({ one, many }) => ({
  docente: one(s.users, {
    fields: [s.courses.docenteId],
    references: [s.users.id],
  }),
  classroom: one(s.classrooms, {
    fields: [s.courses.classroomId],
    references: [s.classrooms.id],
  }),
  enrollments: many(s.enrollments),
}));

// ============================================
// ENROLLMENTS RELATIONS
// ============================================
export const enrollmentsRelations = relations(
  s.enrollments,
  ({ one, many }) => ({
    alumno: one(s.users, {
      fields: [s.enrollments.alumnoId],
      references: [s.users.id],
    }),
    course: one(s.courses, {
      fields: [s.enrollments.courseId],
      references: [s.courses.id],
    }),
    grades: many(s.grades),
    attendances: many(s.attendances),
  })
);

// ============================================
// GRADES RELATIONS
// ============================================
export const gradesRelations = relations(s.grades, ({ one }) => ({
  enrollment: one(s.enrollments, {
    fields: [s.grades.enrollmentId],
    references: [s.enrollments.id],
  }),
  registeredByUser: one(s.users, {
    fields: [s.grades.registeredBy],
    references: [s.users.id],
  }),
}));

// ============================================
// ATTENDANCES RELATIONS
// ============================================
export const attendancesRelations = relations(s.attendances, ({ one }) => ({
  enrollment: one(s.enrollments, {
    fields: [s.attendances.enrollmentId],
    references: [s.enrollments.id],
  }),
  registeredByUser: one(s.users, {
    fields: [s.attendances.registeredBy],
    references: [s.users.id],
  }),
}));

// ============================================
// DOCUMENTS RELATIONS
// ============================================
export const documentsRelations = relations(s.documents, ({ one }) => ({
  uploadedByUser: one(s.users, {
    fields: [s.documents.uploadedBy],
    references: [s.users.id],
  }),
}));
