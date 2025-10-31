import {
  sqliteTable,
  text,
  integer,
  real,
  unique,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dni: text("dni").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  pass: text("pass").notNull(),
  rolId: integer("rol_id")
    .notNull()
    .references(() => roles.id),
});

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"), // Ej: "Puede gestionar alumnos y registrar notas"
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const classrooms = sqliteTable(
  "classrooms",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    grade: text("grade").notNull(), // Ej: "1ro", "2do"
    section: text("section").notNull(), // Ej: "A", "B"
    year: integer("year").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (table) => [
    uniqueIndex("uniqueClassroom").on(table.grade, table.section, table.year),
  ]
);

export const courses = sqliteTable(
  "courses",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(), // Ej: "Matemática", "Lenguaje"
    docenteId: integer("docente_id").references(() => users.id),
    classroomId: integer("classroom_id")
      .notNull()
      .references(() => classrooms.id),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (table) => [
    uniqueIndex("uniqueCoursePerClassroom").on(table.name, table.classroomId),
  ]
);

// ============================================
// TABLA DE INSCRIPCIONES (Alumnos en Cursos)
// ============================================
export const enrollments = sqliteTable("enrollments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  alumnoId: integer("alumno_id")
    .notNull()
    .references(() => users.id),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id),
  enrolledAt: integer("enrolled_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ============================================
// TABLA DE NOTAS
// ============================================
export const grades = sqliteTable("grades", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  enrollmentId: integer("enrollment_id")
    .notNull()
    .references(() => enrollments.id),
  type: text("type").notNull(), // Ej: "parcial1", "parcial2", "final", "trabajo"
  grade: real("grade").notNull(), // Nota numérica
  maxGrade: real("max_grade").notNull().default(20), // Nota máxima (por si usas escalas diferentes)
  description: text("description"), // Opcional: "Examen de álgebra"
  registeredBy: integer("registered_by")
    .notNull()
    .references(() => users.id), // Docente que registró
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ============================================
// TABLA DE ASISTENCIAS
// ============================================
export const attendances = sqliteTable("attendances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  enrollmentId: integer("enrollment_id")
    .notNull()
    .references(() => enrollments.id),
  status: text("status", {
    enum: ["presente", "ausente", "tardanza", "justificado"],
  }).notNull(),
  registeredBy: integer("registered_by")
    .notNull()
    .references(() => users.id), // Docente que registró
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ============================================
// TABLA DE DOCUMENTOS (Formularios e Informes)
// ============================================
export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"), // Puede ser texto o JSON serializado
  uploadedBy: integer("uploaded_by")
    .notNull()
    .references(() => users.id), // Usuario de secretaría
  targetRole: text("target_role"), // A quién va dirigido: 'todos', 'docentes', 'alumnos', etc.
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});
