import React, { useState, useEffect } from "react";

export default function UpdateUserModal({ user, isOpen, onClose, onUpdateUser }) {
  const [formData, setFormData] = useState({ ...user, password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  useEffect(() => {
    setFormData({ ...user, password: "" });
    setConfirmPassword("");
    setErrors({});
    setSuccessMessages({});
  }, [user]);

  const validateNombre = (nombre) => /^[a-zA-Z0-9\s]{1,50}$/.test(nombre);
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case "nombre":
        if (validateNombre(value)) {
          setErrors((prev) => ({ ...prev, nombre: "" }));
          setSuccessMessages((prev) => ({ ...prev, nombre: "Nombre válido" }));
        } else {
          setErrors((prev) => ({ ...prev, nombre: "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios." }));
          setSuccessMessages((prev) => ({ ...prev, nombre: "" }));
        }
        break;
      case "email":
        if (validateEmail(value)) {
          setErrors((prev) => ({ ...prev, email: "" }));
          setSuccessMessages((prev) => ({ ...prev, email: "Email válido" }));
        } else {
          setErrors((prev) => ({ ...prev, email: "El email debe tener un formato válido." }));
          setSuccessMessages((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "password":
        if (validatePassword(value)) {
          setErrors((prev) => ({ ...prev, password: "" }));
          setSuccessMessages((prev) => ({ ...prev, password: "Contraseña segura" }));
        } else {
          setErrors((prev) => ({ ...prev, password: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial." }));
          setSuccessMessages((prev) => ({ ...prev, password: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === formData.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      setSuccessMessages((prev) => ({ ...prev, confirmPassword: "Las contraseñas coinciden" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      setSuccessMessages((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateNombre(formData.nombre)) newErrors.nombre = "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.";
    if (!validateEmail(formData.email)) newErrors.email = "El email debe tener un formato válido.";
    if (formData.password && !validatePassword(formData.password)) newErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial.";
    if (formData.password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdateUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 text-black z-50 -mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Editar Usuario
        </h2>
  
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 */}
          <div className="space-y-4">
            {/* Nombre */}
            <div className="mb-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
                required
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-2">{errors.nombre}</p>}
            </div>
  
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
  
            {/* Rol */}
            <div className="mb-3">
              <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
                Rol
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
                required
              >
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
          </div>
  
          {/* Columna 2 */}
          <div className="space-y-4">
            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
              {successMessages.password && <p className="text-green-500 text-sm mt-2">{successMessages.password}</p>}
            </div>
  
            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
              {successMessages.confirmPassword && <p className="text-green-500 text-sm mt-2">{successMessages.confirmPassword}</p>}
            </div>
          </div>
  
          {/* Botones de acción */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl shadow-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-2 px-4 rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
  
  
}