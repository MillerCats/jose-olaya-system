import { Sumbit } from "@/components/forms/submit";
import { login } from "../actions/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; redirect: string }>;
}) {
  const { message, redirect } = await searchParams;

  return (
    <>
      <form
        action={login}
        className="flex flex-col gap-4 bg-gray-100 p-4 rounded-2xl font-medium text-gray-800 max-w-sm mx-auto my-10"
      >
        <div className="relative flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Ingiciar Sesión
          </h2>
          <label htmlFor="user">Ingrese su usuario:</label>
          <input
            required
            id="user"
            name="user"
            type="text"
            autoComplete="off"
            placeholder="Usuario"
            className="bg-white/50 rounded-xl py-2 text-sm text-gray-700 focus:outline-none px-4 border border-gray-300 focus:ring-2 focus:ring-gray-300 transition duration-300"
          />
        </div>
        <div className="relative flex flex-col gap-2">
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="• • • • • •"
            className="bg-white/50 rounded-xl py-2 text-sm text-gray-700 focus:outline-none px-4 border border-gray-300 focus:ring-2 focus:ring-gray-300 transition duration-300"
          />
        </div>
        <input type="hidden" name="redirectTo" value={redirect} />
        <Sumbit text="Acceder" className="bg-gray-800" />
      </form>
      {message && (
        <div className="max-w-sm mx-auto rounded-xl bg-red-100 border border-red-500 text-red-500 font-medium text-sm p-4">
          <p>{message}. Ingrese correctamente su usuario o contraseña</p>
        </div>
      )}
    </>
  );
}
