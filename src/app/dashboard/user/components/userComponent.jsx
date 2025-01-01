import React from "react";

export default function UserComponent({ users, onEditUser, onDeleteUser }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Rol
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-center text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              {/* Nombre */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.nombre}
              </td>

              {/* Email */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {user.email}
              </td>

              {/* Rol */}
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === "admin"
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-teal-100 text-teal-800"
                  }`}
                >
                  {user.role === "admin" ? "Administrador" : "Usuario"}
                </span>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-blue-600 hover:text-blue-800 bg-white hover:bg-gray-200 px-4 py-2 rounded-md transition-all duration-200 ease-in-out text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 bg-white hover:bg-gray-200 px-4 py-2 rounded-md transition-all duration-200 ease-in-out text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
