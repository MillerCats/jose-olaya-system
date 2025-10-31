"use client";

import { registerAttendance } from "@/app/actions/teacher/actions";
import { useTransition } from "react";

type RowProps = {
  enrollId: number;
  index: number;
  dni: string;
  name: string;
};

export function RowStudent({ enrollId, index, dni, name }: RowProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => registerAttendance(formData));
  };

  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-gray-100`}
    >
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{dni}</td>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">
        <form
          action={handleSubmit}
          className="flex gap-2 items-center justify-evenly"
        >
          <input type="hidden" name="enrollmentId" value={enrollId} />
          <select
            defaultValue={""}
            name="status"
            required
            className="text-sm font-medium border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 cursor-pointer appearance-none"
          >
            <option
              value={""}
              className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
              hidden
              disabled
            >
              Selecciona
            </option>
            <option
              value="presente"
              className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
            >
              Presente
            </option>
            <option
              value="ausente"
              className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
            >
              Ausente
            </option>
            <option
              value="tardanza"
              className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
            >
              Tardanza
            </option>
            <option
              value="justificado"
              className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
            >
              Justificado
            </option>
          </select>
          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-800 text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </td>
    </tr>
  );
}
