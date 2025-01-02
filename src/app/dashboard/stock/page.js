"use client";
import StockList from "@/app/dashboard/stock/components/stockList";
import UpdateStockModal from "@/app/dashboard/stock/components/updateStock";
import { useStock } from "@/hooks/useStock";
import { useReports } from "@/hooks/useReports";
import { Header } from "./components/Header";
import { useState, useMemo, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { StatsCards } from "./components/StatsCards";
import { StockCharts } from "./components/StockCharts";
import { StockTable } from "./components/StockTable";
import { calculateStockLevel } from './utils/stockCalculations.js';
import { calculateStockLevels, calculateCategoryData } from './utils/chartCalculations.js';

export default function StockPage() {
  const {
    stock, // Lista de productos en stock
    isUpdateModalOpen, // Estado del modal de actualización
    currentProduct, // Producto actual seleccionado para actualizar
    openUpdateModal, // Función para abrir el modal de actualización
    closeUpdateModal, // Función para cerrar el modal de actualización
    handleUpdateStock, // Función para manejar la actualización del stock
  } = useStock();
  const { categoria } = useProducts(); // Lista de categorías de productos
  const { generarExcelStock } = useReports(); // Función para generar un reporte en Excel
  const [searchQuery, setSearchQuery] = useState(''); // Consulta de búsqueda
  const [categoryFilter, setCategoryFilter] = useState(''); // Filtro de categoría
  const [stockLevelFilter, setStockLevelFilter] = useState(''); // Filtro de nivel de stock
  const [stockLevels, setStockLevels] = useState({}); // Niveles de stock calculados
  const [categoryData, setCategoryData] = useState({}); // Datos de categorías calculados

  const filteredItems = useMemo(() => {
    return stock.filter(item => {
      const matchesSearch = searchQuery === '' || 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory = categoryFilter === '' || 
        (item.categoria && item.categoria.nombre === categoryFilter);

      const stockLevel = calculateStockLevel(item).level;
      const matchesStockLevel = stockLevelFilter === '' || 
        stockLevel === stockLevelFilter;

      return matchesSearch && matchesCategory && matchesStockLevel;
    });
  }, [stock, searchQuery, categoryFilter, stockLevelFilter]);

  useEffect(() => {
    setStockLevels(calculateStockLevels(filteredItems));
    setCategoryData(calculateCategoryData(filteredItems));
  }, [filteredItems]);

  const categories = useMemo(() => {
    return Array.from(new Set(categoria.map(item => item.nombre)));
  }, [categoria]);

  const stats = {
    totalProducts: filteredItems.length, // Total de productos
    lowStockProducts: filteredItems.filter(item => calculateStockLevel(item).level === 'low').length, // Productos con stock bajo
    mediumStockProducts: filteredItems.filter(item => calculateStockLevel(item).level === 'medium').length, // Productos con stock medio
    highStockProducts: filteredItems.filter(item => calculateStockLevel(item).level === 'high').length, // Productos con stock alto
  };

  return (
    <>
      <Header
          onAddProduct={() => console.log('Add product')}
          onAddStock={() => setIsAddStockModalOpen(true)}
          onSearch={setSearchQuery}
          onCategoryFilter={setCategoryFilter}
          onStockLevelFilter={setStockLevelFilter}
          categories={categories}
          onExport={generarExcelStock}
        />
      <StatsCards {...stats} />
      <StockCharts items={filteredItems} stockLevels={stockLevels} categoryData={categoryData} />
      <StockTable items={filteredItems} onEdit={openUpdateModal}/>
      {isUpdateModalOpen && currentProduct && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={currentProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </>
  );
}
