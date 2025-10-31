"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SelectClass({ data }: { data: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectOption = (courseId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("classroom", courseId.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <label
        htmlFor="course"
        className="text-gray-700 font-medium text-sm mb-1"
      >
        Selecciona un curso:
      </label>

      <select
        id="course"
        defaultValue={searchParams.get("classroom")?.toString() || ""}
        onChange={(e) => selectOption(e.target.value)}
        className="text-sm font-medium border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 cursor-pointer appearance-none"
      >
        <option value="" hidden disabled>
          Selecciona un curso
        </option>
        {data.map((c) => (
          <option
            key={c.courseId}
            value={c.courseId}
            className="hover:bg-gray-100 hover:checked:bg-gray-500 checked:bg-gray-700 checked:text-white px-4 py-2 cursor-pointer"
          >
            {`${c.grade}° ${c.section} - ${c.courseName} (${c.year})`}
          </option>
        ))}
      </select>
    </div>
  );
}
