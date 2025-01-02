"use client";
import { useState, useEffect } from "react";
import ProductTable from "@/app/dashboard/products/components/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/app/dashboard/products/components/addProduct";
import { useProducts } from "@/hooks/useProducts";
import Paginacion from "./components/Paginacion";
import { productStores } from "@/stores/productoStores";
import { useReports } from "@/hooks/useReports";
import { Header } from "./components/Header";
import { StatsCards } from "./components/StatsCards";
import { ProductTable2 } from "./components/ProductTable";

export default function ProductsPage() {
  const {
    products,
    isAddModalOpen,
    editingProduct,
    setIsAddModalOpen,
    setEditingProduct,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    categoria,
  } = useProducts();
  const { productPage } = productStores();
  const { generarExcelStock } = useReports();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.estado == "activo").length,
    inactiveProducts: products.filter((p) => p.estado == "inactivo").length,
    categories: new Set(products.map((p) => p.categoria.id)).size,
  };
  console.log("stats", stats);

  console.log(products);
  return (
    <>
      <div className="">
        <Header onAddProduct={generarExcelStock} onSearch={handleSearch} />
        <StatsCards {...stats} />
        <div>
          <ProductTable
            products={filteredProducts}
            categoria={categoria}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
          <div className="flex justify-center items-center">
            {/*<Paginacion products={products} />*/}
          </div>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <ProductAddModal
          productos={products}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          product={editingProduct}
          categorias={categoria}
        />
      </div>
    </>
  );
}
