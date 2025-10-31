// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("user_role")?.value;
  const username = req.cookies.get("username")?.value;
  const path = req.nextUrl.pathname;

  // 🔹 Si no hay sesión iniciada (sin cookies)
  if (!role || !username) {
    // Evita bucle infinito si ya está en /login
    if (!path.startsWith("/login") && !path.startsWith("/access-denied")) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Rutas protegidas por rol
  if (path.includes("/teacher") && role !== "teacher" && role !== "director") {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  if (path.includes("/direccion") && role !== "direccion") {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  // Estudiantes pueden acceder solo a /estudiante
  if (path.includes("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo a estas rutas:
export const config = {
  matcher: ["/dashboard/:path*"],
};
