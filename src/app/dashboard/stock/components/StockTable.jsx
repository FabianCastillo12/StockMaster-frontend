import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { StockProgressBar } from "./StockProgressBar";

export function StockTable({ items, onEdit }) {
  console.log("items de StockTable", items);
  const getCategoryColor = (categoryName) => {
    const categoryColors = {
      1: "bg-green-200 text-green-900",
      2: "bg-yellow-200 text-yellow-900",
      3: "bg-orange-100 text-orange-800",
      4: "bg-orange-300 text-orange-900",
      5: "bg-red-200 text-red-900",
      6: "bg-rose-200 text-rose-900",
      7: "bg-blue-200 text-blue-900",
      8: "bg-purple-200 text-purple-900",
      9: "bg-gray-200 text-gray-900",
    };
    return categoryColors[categoryName] || categoryColors["default"];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getCategoryColor(
                      item.categoria.id % 10
                    )}`}
                  >
                    {item.categoria.nombre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StockProgressBar
                    currentStock={item.cantidadStock}
                    maxStock={500}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-center ">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md p-2 transition-all"
                    >
                      <Pencil className="h-5 w-5" />
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
