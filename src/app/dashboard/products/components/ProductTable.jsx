import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export function ProductTable2({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado de la tabla */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold tracking-wider uppercase border-b">
                Código
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold tracking-wider uppercase border-b">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold tracking-wider uppercase border-b">
                Categoría
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold tracking-wider uppercase border-b">
                Precio
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold tracking-wider uppercase border-b">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold tracking-wider uppercase border-b">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:shadow-md transition duration-200 hover:bg-gray-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {product.categoria.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">
                  {new Intl.NumberFormat("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  }).format(product.precio)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                      product.estado === "activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 hover:scale-105 transition-transform"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 hover:scale-105 transition-transform"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
