import { getAllRoles } from "@/app/actions/roles/rol.action";
import { getAllUsersWithRoles } from "@/app/actions/user/user.action";
import { DeleteButton } from "@/components/dashboard/DeleteButton";

import { Modal } from "@/components/dashboard/Modal";

export default async function DireccionPage() {
  const [roles, users] = await Promise.all([
    getAllRoles(),
    getAllUsersWithRoles()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Gestión de Usuarios
          </h1>
          <p className="text-slate-600">
            Administra y crea nuevos usuarios del sistema educativo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Docentes</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {users.filter(user => user.roleName === 'teacher').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Estudiantes</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {users.filter(user => user.roleName === 'student').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Dirección</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {users.filter(user => user.roleName === 'direccion').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Crear Nuevo Usuario
              </h2>
              <p className="text-slate-600">
                Agrega nuevos docentes, estudiantes o personal administrativo al sistema
              </p>
            </div>
            <Modal roles={roles} />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Todos los Usuarios</h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {users.length} usuarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/60">
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">DNI</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Nombre</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Rol</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-slate-600">#{user.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-slate-800">{user.dni}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-slate-800">{user.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600">{user.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.roleName === 'teacher' ? 'bg-emerald-500' :
                            user.roleName === 'student' ? 'bg-violet-500' :
                              user.roleName === 'direccion' ? 'bg-amber-500' :
                                'bg-slate-400'
                          }`} />
                        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${user.roleName === 'teacher' ? 'bg-emerald-100 text-emerald-700' :
                            user.roleName === 'student' ? 'bg-violet-100 text-violet-700' :
                              user.roleName === 'direccion' ? 'bg-amber-100 text-amber-700' :
                                'bg-slate-100 text-slate-700'
                          }`}>
                          {user.roleName || 'Sin rol'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <DeleteButton/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p className="text-slate-500 text-sm">No hay usuarios registrados</p>
                <p className="text-slate-400 text-xs mt-1">Crea el primer usuario usando el botón arriba</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}