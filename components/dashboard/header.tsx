import { getUser, logOut } from "@/app/actions/auth/actions";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 bg-gray-200 flex flex-row justify-between p-4 items-center">
      {user && (
        <h1 className="text-lg text-gray-700 font-semibold">
          Bienvenido: {user}
        </h1>
      )}
      <form action={logOut}>
        <button
          type="submit"
          className="text-sm font-medium rounded-xl px-4 py-2 border border-red-500 bg-red-100 cursor-pointer text-red-500"
        >
          Cerrar Sesión
        </button>
      </form>
    </header>
  );
}
