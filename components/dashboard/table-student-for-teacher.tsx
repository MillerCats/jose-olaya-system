import { getStudentsFromClass } from "@/app/actions/teacher/actions";
import { RowStudent } from "./row-student";

export default async function TableStudentForTeacher({
  couseId,
}: {
  couseId: string;
}) {
  const students = await getStudentsFromClass(Number(couseId));

  console.log(students);
  if (students.length === 0) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No hay alumnos registrados en este curso.
      </p>
    );
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-800 uppercase">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-center">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <RowStudent
              key={s.id}
              enrollId={s.id}
              index={index}
              dni={s.dni}
              name={s.name}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
