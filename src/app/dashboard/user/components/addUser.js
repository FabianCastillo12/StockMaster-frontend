import { useState } from "react";

const validateNombre = (nombre) => /^[a-zA-Z0-9\s]{1,50}$/.test(nombre);
const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,100}$/.test(
    password
  );

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confir_password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    password: "",
    confir_password: "",
  });

  const [successMessages, setSuccessMessages] = useState({
    password: "",
    confir_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "nombre":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value)
            ? ""
            : "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value)
            ? ""
            : "El email debe tener un formato válido.",
        }));
        break;
      case "password":
        if (validatePassword(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            password: "Contraseña segura",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password:
              "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial.",
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            password: "",
          }));
        }
        if (formData.confir_password) {
          if (value === formData.confir_password) {
            setErrors((prevErrors) => ({ ...prevErrors, confir_password: "" }));
            setSuccessMessages((prevMessages) => ({
              ...prevMessages,
              confir_password: "Las contraseñas coinciden",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confir_password: "Las contraseñas no coinciden",
            }));
            setSuccessMessages((prevMessages) => ({
              ...prevMessages,
              confir_password: "",
            }));
          }
        }
        break;
      case "confir_password":
        if (value === formData.password) {
          setErrors((prevErrors) => ({ ...prevErrors, confir_password: "" }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            confir_password: "Las contraseñas coinciden",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confir_password: "Las contraseñas no coinciden",
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            confir_password: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {
      nombre: "",
      email: "",
      password: "",
      confir_password: "",
    };

    if (!validateNombre(formData.nombre)) {
      newErrors.nombre =
        "Nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.";
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email debe tener un formato válido.";
      valid = false;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.";
      valid = false;
    }
    if (formData.password !== formData.confir_password) {
      newErrors.confir_password =
        "La contraseña y la confirmación de contraseña deben coincidir.";
      valid = false;
    }

    if (valid) {
      onAddUser(formData);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confir_password: "",
        role: "user",
      });
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  const closeModal = () => {
    setFormData({
      nombre: "",
      email: "",
      password: "",
      confir_password: "",
      role: "user",
    });
    setErrors({
      nombre: "",
      email: "",
      password: "",
      confir_password: "",
    });
    setSuccessMessages({ password: "", confir_password: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 text-black z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Agregar Nuevo Usuario
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Columna 1 */}
          <div className="space-y-4">
            {/* Nombre */}
            <div className="mb-3">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
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
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-2">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Rol */}
            <div className="mb-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
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
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            {/* Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
              {successMessages.password && (
                <p className="text-green-500 text-sm mt-2">
                  {successMessages.password}
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="confir_password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confir_password"
                id="confir_password"
                value={formData.confir_password}
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm"
                required
              />
              {errors.confir_password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confir_password}
                </p>
              )}
              {successMessages.confir_password && (
                <p className="text-green-500 text-sm mt-2">
                  {successMessages.confir_password}
                </p>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl shadow-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-2 px-4 rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-800"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
