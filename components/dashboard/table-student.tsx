import { getStudentAttendances } from "@/app/actions/student/actions";
import { formatDate } from "@/app/utils/format-date";

export default async function TableStudent() {
  const data = await getStudentAttendances();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mis asistencias</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No tienes asistencias registradas aún.</p>
      ) : (
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase">
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-left">Curso</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Registrado por</th>
                <th className="px-4 py-2 text-center">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-2">{item.course}</td>
                  <td
                    className={`px-4 py-2 ${
                      item.status === "presente"
                        ? "text-green-600"
                        : item.status === "ausente"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-4 py-2">{item.registeredBy}</td>
                  <td className="px-4 py-2 text-center">
                    {formatDate(item.createdAt!.toDateString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
