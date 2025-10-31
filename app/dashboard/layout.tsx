import { ReactNode } from "react";
import Header from "@/components/dashboard/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto my-4">{children}</div>
    </>
  );
}
