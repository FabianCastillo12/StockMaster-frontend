"use client";
import { useState } from "react";
import { SquarePlus } from "lucide-react";
import { useClientes } from "@/hooks/useClients";
import { useReports } from "@/hooks/useReports";
import UpdateClienteModal from "@/app/dashboard/clientes/components/updateCliente";
import AddClienteModal from "@/app/dashboard/clientes/components/addCliente";
import CustomerHeader from "@/app/dashboard/clientes/components/CustomerHeader";
import CustomerStats from "@/app/dashboard/clientes/components/CustomerStats";
import CustomerCharts from "@/app/dashboard/clientes/components/CustomerCharts";
import CustomerTable from "@/app/dashboard/clientes/components/CustomerTable";

export default function ClientePage() {
  const {
    clientes,
    isEditModalOpen,
    selectedCliente,
    isAddModalOpen,
    openEditModal,
    closeEditModal,
    openAddModal,
    closeAddModal,
    handleUpdateCliente,
    handleDeleteCliente,
    handleAddCliente,
  } = useClientes();
  const { generarExcelClientes } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCustomers = clientes.filter(customer => 
    Object.values(customer).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <CustomerHeader 
          onSearch={setSearchQuery}
          onExport={generarExcelClientes}
        />
      <CustomerStats customers={clientes} />
      <CustomerTable 
          customers={filteredCustomers}
          onEditCustomer={openEditModal}
          onDeleteCustomer={handleDeleteCliente}
        />
      <AddClienteModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddCliente={handleAddCliente}
      />
      {isEditModalOpen && selectedCliente && (
        <UpdateClienteModal
          cliente={selectedCliente}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onUpdateCliente={handleUpdateCliente}
        />
      )}
      <button
        onClick={openAddModal}
        className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-16 h-16 flex justify-center items-center"
      >
        <SquarePlus size={30} color="white" />
      </button>
    </>
  );
}
