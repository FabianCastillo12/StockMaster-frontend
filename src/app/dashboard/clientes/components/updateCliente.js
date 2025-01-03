import React, { useState, useEffect } from "react";

export default function UpdateClienteModal({
  cliente,
  isOpen,
  onClose,
  onUpdateCliente,
}) {
  const [formData, setFormData] = useState({ ...cliente });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setFormData({ ...cliente });
    }
  }, [cliente]);

  // Validaciones
  const validateDNI = (dni) => /^\d{8}$/.test(dni);
  const validateRUC = (ruc) => /^(10|20)\d{9}$/.test(ruc);
  const validateNombre = (nombre) => /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]{1,50}$/.test(nombre);
  const validateEmail = (email) => 
    /^[a-zA-Z0-9._-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,}$/.test(email);
  const validateTelefono = (telefono) => /^\d{9,15}$/.test(telefono);
  const validateDireccion = (direccion) =>
    /^[a-zA-Z0-9\s.,#-]{1,200}$/.test(direccion);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación para cada campo
    if (name === "dni" && !validateDNI(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dni: "El DNI debe tener 8 dígitos numéricos.",
      }));
    } else if (name === "ruc" && !validateRUC(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ruc: "Formato de RUC incorrecto. Debe tener 11 dígitos, comenzando con 10 o 20.",
      }));
    } else if (name === "nombre" && !validateNombre(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nombre: "El nombre debe contener solo letras y espacios.",
      }));
    } else if (name === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Formato de correo electrónico inválido.",
      }));
    } else if (name === "telefono" && !validateTelefono(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        telefono: "El teléfono debe tener entre 9 y 15 dígitos.",
      }));
    } else if (name === "direccion" && !validateDireccion(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        direccion: "La dirección contiene caracteres inválidos.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Limpiar el error si la validación es correcta
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    if (
      !validateDNI(formData.dni) ||
      !validateRUC(formData.ruc) ||
      !validateNombre(formData.nombre) ||
      !validateEmail(formData.email) ||
      !validateTelefono(formData.telefono) ||
      !validateDireccion(formData.direccion)
    ) {
      // Si hay algún error, no enviar el formulario
      return;
    }

    onUpdateCliente(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-1">RUC</label>
            <input
              type="text"
              id="ruc"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.ruc ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.ruc && <p className="text-red-500 text-xs mt-1">{errors.ruc}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-150 ease-in-out"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}