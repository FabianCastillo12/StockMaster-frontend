"use client";
import UserComponent from "@/app/dashboard/user/components/userComponent";
import { UserPlus } from "lucide-react";
import UpdateUserModal from "@/app/dashboard/user/components/updateUser";
import AddUserModal from "@/app/dashboard/user/components/addUser";
import { useUsers } from "@/hooks/useUsers";
import { UserStats } from "@/app/dashboard/user/components/UsersStats";
import { UserCharts } from "@/app/dashboard/user/components/UserCharts";

export default function UserPage() {
  const {
    users,
    isEditModalOpen,
    selectedUser,
    isAddModalOpen,
    isMounted,
    setIsEditModalOpen,
    setSelectedUser,
    setIsAddModalOpen,
    handleUpdateUser,
    handleDeleteUser,
    handleAddUser,
  } = useUsers();

  if (!isMounted) {
    return null;
  }
  console.log("users from a",users);
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.estado = "activo").length,
    inactiveUsers: users.filter((u) => u.estado == "inactivo").length,
    adminUsers: users.filter((u) => u.role === "admin").length,
  };

  const roleDistribution = [
    { name: "Administradores", value: stats.adminUsers },
    { name: "Usuarios", value: stats.totalUsers - stats.adminUsers },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="">
        <h1 className="text-4xl font-bold text-gray-800">Usuarios</h1>
      </header>

      {/* Stats and Chart Row */}
      <section className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left Column: Stats */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-md min-h-[250px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas</h2>
          <UserStats {...stats} />
        </div>

        {/* Right Column: Chart */}
        <UserCharts roleDistribution={roleDistribution} />
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Usuarios</h2>
        {users.length > 0 ? (
          <UserComponent
            users={users}
            onEditUser={(user) => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}
            onDeleteUser={handleDeleteUser}
          />
        ) : (
          <p className="text-gray-500 text-center">No hay usuarios registrados.</p>
        )}
      </section>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
      {isEditModalOpen && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-10 right-10 bg-gray-700 hover:bg-gray-800 text-white shadow-lg rounded-full w-16 h-16 flex justify-center items-center"
      >
        <UserPlus size={30} />
      </button>
    </div>
  );
}
