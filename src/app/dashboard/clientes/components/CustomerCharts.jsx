import React from 'react';

export default function CustomerCharts({ customers = [] }) {
  const roleDistribution = {
    admin: customers.filter(c => c.role === 'admin').length,
    user: customers.filter(c => c.role === 'user').length,
  };

  const statusDistribution = {
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Distribución de Roles */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Distribución de Roles</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Administradores</span>
              <span className="text-sm font-medium text-gray-700">{roleDistribution.admin}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-500 h-2.5 rounded-full"
                style={{ width: `${(roleDistribution.admin / customers.length) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Usuarios</span>
              <span className="text-sm font-medium text-gray-700">{roleDistribution.user}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-500 h-2.5 rounded-full"
                style={{ width: `${(roleDistribution.user / customers.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estado de Clientes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Estado de Clientes</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Activos</span>
              <span className="text-sm font-medium text-gray-700">{statusDistribution.active}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(statusDistribution.active / customers.length) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Inactivos</span>
              <span className="text-sm font-medium text-gray-700">{statusDistribution.inactive}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${(statusDistribution.inactive / customers.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}