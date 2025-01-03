import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Validación para el stock
const validateStock = (stock) => /^\d+$/.test(stock);

const UpdateStockModal = ({ isOpen, onClose, product, onUpdateStock }) => {
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setStock(product.cantidadStock || "");
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!validateStock(stock)) {
      setError("La cantidad de stock debe ser un número entero positivo.");
      return;
    }
    setError(""); // Limpia el error si la validación pasa

    try {
      await onUpdateStock(product.id, Number(stock)); // Asegúrate de convertir stock a número
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al actualizar el stock",
        showConfirmButton: true,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full divide-y divide-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Actualizar Stock</h2>
        <div className="pt-4">
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 text-sm font-medium mb-2">
              Cantidad de Stock
            </label>
            <input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStockModal;