import React from 'react';
import { Plus, PackagePlus, Search } from 'lucide-react';

export function Header({ 
  onAddProduct, 
  onAddStock, 
  onSearch,
  onCategoryFilter,
  onStockLevelFilter,
  categories,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Stock</h1>
            <p className="text-gray-600">Controla el stock de tus productos</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por nombre, código o categoría..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
            onChange={(e) => onCategoryFilter(e.target.value)}
          >
            <option value="">Categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onStockLevelFilter(e.target.value)}
          >
            <option value="">Nivel</option>
            <option value="low">Stock Bajo</option>
            <option value="medium">Stock Medio</option>
            <option value="high">Stock Alto</option>
          </select>
        </div>
      </div>
    </div>
  );
}