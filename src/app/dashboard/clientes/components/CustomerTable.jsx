import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function CustomerTable({ customers, onEditCustomer, onDeleteCustomer }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Dirección
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {customer.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {customer.telefono || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {customer.direccion || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => onEditCustomer(customer)}
                    className="text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md p-2 transition-all"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteCustomer(customer.id)}
                    className="text-red-600 bg-red-100 hover:bg-red-200 rounded-md p-2 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
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