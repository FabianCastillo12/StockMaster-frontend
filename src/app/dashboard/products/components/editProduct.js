import React, { useState, useEffect } from "react";

const ProductModal = ({
  products,
  setIsEditModalOpen,
  formDataEdit,
  onUpdateProduct,
}) => {
  const [formData, setFormData] = useState({
    id: formDataEdit.id,
    nombre: formDataEdit.nombre,
    precio: formDataEdit.precio,
    estado: formDataEdit.estado,
  });

  const [errors, setErrors] = useState({
    nombre: "",
    precio: "",
  });

  const validators = {
    nombre: (value) => /^[a-zA-Z0-9\s\(\)]{1,50}$/.test(value),
    precio: (value) => /^\d+(\.\d{1,2})?$/.test(value),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validators[name](value) ? "" : `El ${name} es inválido.`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(validators).reduce((acc, key) => {
      acc[key] = validators[key](formData[key]) ? "" : `El ${key} es inválido.`;
      return acc;
    }, {});

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    const productExists = products.some(p => p.nombre === formData.nombre && p.id !== formData.id);
    if (productExists) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nombre: "Ya existe un producto con este nombre.",
      }));
      return;
    }
    onUpdateProduct(formData);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      id: formDataEdit.id,
      nombre: formDataEdit.nombre,
      precio: formDataEdit.precio,
      estado: formDataEdit.estado,
    });
  }, [formDataEdit]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full divide-y divide-gray-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Modificar Producto</h2>
        <form onSubmit={handleSubmit} className="pt-4">
          {["nombre", "precio"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-gray-700 text-sm font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "precio" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-700 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;