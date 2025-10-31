import { ReactNode } from "react";
import { Navigation } from "@/components/dashboard/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation root="teacher" />
      {children}
    </>
  );
}
