import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-4">
      <header className="mx-auto my-8 flex flex-col gap-2 w-fit">
        <h1 className="text-3xl font-semibold">Sistema Interno José Olaya</h1>
        <p className="text-lg font-medium">
          Seleccione su área de trabajo para ingresar
        </p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-center">
        <Link
          href={"/login?redirect=/dashboard/student"}
          className="bg-gray-50 rounded-xl p-8 text-gray-700 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:scale-104 transition duration-300"
        >
          Acceder como alumno
        </Link>
        <Link
          href={"/login?redirect=/dashboard/teacher"}
          className="bg-gray-50 rounded-xl p-8 text-gray-700 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:scale-104 transition duration-300"
        >
          Acceder como Docente
        </Link>
        <Link
          href={"/login?redirect=/dashboard/direccion"}
          className="bg-gray-50 rounded-xl p-8 text-gray-700 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:scale-104 transition duration-300"
        >
          Acceder como Director
        </Link>
        <Link
          href={"/"}
          className="bg-gray-50 rounded-xl p-8 text-gray-700 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:scale-104 transition duration-300"
        >
          Acceder como Secretario
        </Link>
      </section>
    </div>
  );
}
