"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitProps = {
  text: string;
  className?: string;
};

export function Sumbit({ text, className }: SubmitProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${className} text-sm font-medium text-white w-full py-2 rounded-xl ${
        pending ? "opacity-65 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {pending ? (
        <Loader
          className="animate-spin mx-auto text-gray-300"
          style={{ animationDuration: "2s" }}
        />
      ) : (
        text
      )}
    </button>
  );
}
