import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function StockAlerts() {
  const alerts = [
    {
      id: '1',
      product: 'Laptop HP',
      currentStock: 3,
      minStock: 5,
      category: 'Electrónicos',
    },
    {
      id: '2',
      product: 'Monitor Dell',
      currentStock: 2,
      minStock: 10,
      category: 'Electrónicos',
    },
    {
      id: '3',
      product: 'Teclado Mecánico',
      currentStock: 4,
      minStock: 8,
      category: 'Periféricos',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Alertas de Stock</h2>
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {alerts.length} Productos
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border border-yellow-200 rounded-lg bg-yellow-50 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">{alert.product}</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Stock actual: {alert.currentStock}</p>
                    <p>Stock mínimo: {alert.minStock}</p>
                    <p className="text-xs text-yellow-600 mt-1">{alert.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}