import { registerUser } from "../actions";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action={registerUser}
        className="flex flex-col gap-4 p-6 border rounded-lg w-80"
      >
        <h2 className="text-xl font-semibold text-center">Crear usuario</h2>

        <input
          name="name"
          placeholder="Nombre"
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}