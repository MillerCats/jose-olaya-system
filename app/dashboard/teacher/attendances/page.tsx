import { getClassrooms } from "@/app/actions/teacher/actions";
import { SelectClass } from "@/components/dashboard/select";
import TableStudentForTeacher from "@/components/dashboard/table-student-for-teacher";

export default async function AttendancesPage({
  searchParams,
}: {
  searchParams: Promise<{ classroom?: string }>;
}) {
  const data = await getClassrooms();
  const { classroom } = await searchParams;

  return (
    <div className="p-4">
      <SelectClass data={data} />
      {classroom ? (
        <TableStudentForTeacher couseId={classroom} />
      ) : (
        <p className="text-gray-700 font-medium text-sm text-center mt-4">
          Selecciona un curso para ver los alumnos inscritos.
        </p>
      )}
    </div>
  );
}
