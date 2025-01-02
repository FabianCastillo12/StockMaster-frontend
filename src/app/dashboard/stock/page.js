"use client";
import StockList from "@/app/dashboard/stock/components/stockList";
import UpdateStockModal from "@/app/dashboard/stock/components/updateStock";
import { useStock } from "@/hooks/useStock";
import { useReports } from "@/hooks/useReports";
import Paginacion from "../products/components/Paginacion";
import { productStores } from "@/stores/productoStores";
import { Header } from "./components/Header";
import { useState, useMemo, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { StatsCards } from "./components/StatsCards";
import { StockCharts } from "./components/StockCharts";
import { calculateStockLevel } from './utils/stockCalculations.js';
import { calculateStockLevels, calculateCategoryData } from './utils/chartCalculations.js';

export default function StockPage() {
  const {
    stock,
    isUpdateModalOpen,
    currentProduct,
    openUpdateModal,
    closeUpdateModal,
    handleUpdateStock,
  } = useStock();
  console.log("stock", stock);
  const { categoria } = useProducts();
  const { generarExcelStock } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockLevelFilter, setStockLevelFilter] = useState('');
  const [stockLevels, setStockLevels] = useState({});
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    setStockLevels(calculateStockLevels(stock));
    setCategoryData(calculateCategoryData(stock));
    console.log("stockLevels", stockLevels);
    console.log("categoryData", categoryData);
  }, [stock]);

  const categories = useMemo(() => {
    return Array.from(new Set(categoria.map(item => item.nombre)));
  }, [categoria]);

  const filteredItems = useMemo(() => {
    return stock.filter(item => {
      const matchesSearch = searchQuery === '' || 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory = categoryFilter === '' || 
        (item.categoria && item.categoria.nombre === categoryFilter);

      const stockLevel = item.stockLevel;
      const matchesStockLevel = stockLevelFilter === '' || 
        stockLevel === stockLevelFilter;

      return matchesSearch && matchesCategory && matchesStockLevel;
    });
  }, [stock, searchQuery, categoryFilter, stockLevelFilter]);

  const stats = {
    totalProducts: stock.length,
    lowStockProducts: stock.filter(item => calculateStockLevel(item).level === 'low').length,
    mediumStockProducts: stock.filter(item => calculateStockLevel(item).level === 'medium').length,
    highStockProducts: stock.filter(item => calculateStockLevel(item).level === 'high').length,
  };

  console.log("stats", stats);

  return (
    <div className="">
      <Header
          onAddProduct={() => console.log('Add product')}
          onAddStock={() => setIsAddStockModalOpen(true)}
          onSearch={setSearchQuery}
          onCategoryFilter={setCategoryFilter}
          onStockLevelFilter={setStockLevelFilter}
          categories={categories}
        />
      <StatsCards {...stats} />
      <StockCharts items={stock} stockLevels={stockLevels} categoryData={categoryData} />
      <StockList stock={filteredItems} onEdit={openUpdateModal} />
      {isUpdateModalOpen && currentProduct && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={currentProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={generarExcelStock}
          className="bg-[#006400] text-white text-xs px-2 py-2 rounded-md whitespace-nowrap mt-2"
        >
          Exportar en Excel
        </button>
      </div>
    </div>
  );
}
