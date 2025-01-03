"use client";
import React, { useState } from "react";
import { FileDown, ClipboardPlus } from "lucide-react";
import { usePedidos } from "@/hooks/usePedidos";
import { useReports } from "@/hooks/useReports";
import OrderAddModal from "@/app/dashboard/orders/components/addOrder";
import OrderStats from "@/app/dashboard/orders/components/OrderStats";
import OrdersTable from "@/app/dashboard/orders/components/ordersTable";
import ViewOrderModal from "@/app/dashboard/orders/components/viewOrder";

export default function OrdersPage() {
  const { pedidos, handleAddOrder, handleDeleteOrder, handleConfirmOrder } =
    usePedidos();
  const { generarExcelPedidos } = useReports();

  const [activeTab, setActiveTab] = useState("pendientes");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formDataView, setFormDataView] = useState(null);

  const pedidosRegistrados = pedidos.filter(
    (pedido) => pedido.estado === "Registrado"
  );
  const pedidosEntregados = pedidos.filter(
    (pedido) => pedido.estado === "Entregado"
  );

  const viewOrder = (open, order) => {
    setIsViewModalOpen(open);
    setFormDataView(order);
  };

  const renderTabContent = (orders, isRegistrados) => (
    <OrdersTable
      orders={orders}
      onConfirmOrder={handleConfirmOrder}
      onDeleteOrder={handleDeleteOrder}
      isRegistrados={isRegistrados}
      onViewOrder={viewOrder}
    />
  );

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Gestión de Pedidos
          </h1>
        </div>
        <OrderStats orders={pedidos} />
        <div className="flex justify-between items-center mb-4">
          <div className="tabs mb-4">
            <button
              className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ease-in-out ${
                activeTab === "pendientes"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 hover:from-gray-400 hover:to-gray-500"
              } mr-2`}
              onClick={() => setActiveTab("pendientes")}
            >
              Pedidos Registrados
            </button>
            <button
              className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ease-in-out ${
                activeTab === "entregados"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 hover:from-gray-400 hover:to-gray-500"
              }`}
              onClick={() => setActiveTab("entregados")}
            >
              Pedidos Entregados
            </button>
          </div>
          <button
            onClick={generarExcelPedidos}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileDown className="h-5 w-5" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out transform ${
            activeTab === "pendientes"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
          style={{ display: activeTab === "pendientes" ? "block" : "none" }}
        >
          {renderTabContent(pedidosRegistrados, true)}
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out transform ${
            activeTab === "entregados"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
          style={{ display: activeTab === "entregados" ? "block" : "none" }}
        >
          {renderTabContent(pedidosEntregados, false)}
        </div>
        <OrderAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddOrder={handleAddOrder}
        />
      </div>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-10 right-10 bg-black rounded-full w-16 h-16 flex justify-center items-center z-50 shadow-lg"
      >
        <ClipboardPlus size={30} color="white" />
      </button>
      {isViewModalOpen && (
        <ViewOrderModal
          setIsViewModalOpen={setIsViewModalOpen}
          formDataView={formDataView}
        />
      )}
    </>
  );
}
