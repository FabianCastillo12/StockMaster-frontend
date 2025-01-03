"use client";
import React, { useState } from "react";

const AddClienteModal = ({ isOpen, onClose, onAddCliente }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dni: "",
    ruc: "",
  });
  const [errors, setErrors] = useState({ dni: '', ruc: '', nombre: '', email: '', telefono: '' });
  
  // Validaciones (se mantienen igual)
  const validateDNI = (dni) => /^\d{8}$/.test(dni);
  const validateRUC = (ruc) => /^(10|20)\d{9}$/.test(ruc);
  const validateNombre = (nombre) => /^[a-zA-Z\s]{1,50}$/.test(nombre);
  const validateEmail = (email) => /^[a-zA-Z0-9._-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,}$/.test(email);
  const validateTelefono = (telefono) => /^\d{9,15}$/.test(telefono);
  const validateDireccion = (direccion) => /^[a-zA-Z0-9\s.,#-]{1,200}$/.test(direccion);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lógica de validación (se mantiene igual)
    switch (name) {
      case 'dni':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dni: validateDNI(value) ? '' : 'El DNI debe tener 8 dígitos numéricos.',
        }));
        break;
      case 'ruc':
        setErrors((prevErrors) => ({
          ...prevErrors,
          ruc: validateRUC(value) ? '' : 'Formato de RUC incorrecto. Se espera 11 dígitos numéricos, empezando con 10 o 20.',
        }));
        break;
      case 'nombre':
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value) ? '' : 'El nombre solo puede contener letras y espacios.',
        }));
        break;
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value) ? '' : 'Formato de email inválido.',
        }));
        break;
      case 'telefono':
        setErrors((prevErrors) => ({
          ...prevErrors,
          telefono: validateTelefono(value) ? '' : 'El teléfono debe tener entre 9 y 15 dígitos.',
        }));
        break;
      case 'direccion':
        setErrors((prevErrors) => ({
          ...prevErrors,
          direccion: validateDireccion(value) ? '' : 'Formato de dirección inválido.',
        }));
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) return;
    console.log("Nuevo cliente:", formData);
    onAddCliente(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      dni: "",
      ruc: "",
    });
    setErrors({ dni: '', ruc: '', nombre: '', email: '', telefono: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-gray-900">
        <h2 className="text-2xl font-semibold mb-6">Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`mt-1 block w-full border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`mt-1 block w-full border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`mt-1 block w-full border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`mt-1 block w-full border ${errors.ruc ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.ruc && <p className="text-red-500 text-xs mt-1">{errors.ruc}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-150 ease-in-out"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClienteModal;