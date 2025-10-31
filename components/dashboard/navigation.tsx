"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavProps = {
  root: string;
};

export function Navigation({ root }: NavProps) {
  const pathname = usePathname();
  const items = [
    { label: "Asistencia", link: `/dashboard/${root}/attendances` },
    { label: "Notas", link: `/dashboard/${root}/grades` },
  ];
  return (
    <nav className="flex flex-row gap-4 border-b border-gray-300 mx-4">
      {items.map(({ label, link }) => {
        const isActive = pathname.includes(`${link}`);
        return (
          <Link
            key={label}
            href={link}
            className={`py-4 ${
              isActive
                ? "font-semibold text-gray-700"
                : "font-medium text-gray-500"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
