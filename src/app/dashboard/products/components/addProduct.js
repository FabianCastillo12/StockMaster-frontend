"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";

const ProductAddModal = ({ productos, isOpen, onClose, onAddProduct, product, categorias }) => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    cantidadStock: "",
    categoria: "",
  });
  const [errors, setErrors] = useState({});
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || "",
        precio: product.precio || "",
        cantidadStock: product.cantidadStock || "",
        categoria: product.categoria || "",
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        cantidadStock: "",
        categoria: ""
      });
    }
  }, [product]);

  const validateNombre = (nombre) => /^[a-zA-Z0-9\s\(\)mlpack]{1,50}$/.test(nombre);
  const validatePrecio = (precio) => /^\d+(\.\d{1,2})?$/.test(precio);
  const validateCantidadStock = (cantidadStock) => /^\d+$/.test(cantidadStock);
  const validateCategoria = (categoria) => categoria !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    switch (name) {
      case "nombre":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value) ? "" : "Formato de nombre inválido.",
        }));
        break;
      case "precio":
        setErrors((prevErrors) => ({
          ...prevErrors,
          precio: validatePrecio(value) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
        }));
        break;
      case "cantidadStock":
        setErrors((prevErrors) => ({
          ...prevErrors,
          cantidadStock: validateCantidadStock(value) ? "" : "La cantidad en stock debe ser un número entero.",
        }));
        break;
      case "categoria":
        setErrors((prevErrors) => ({
          ...prevErrors,
          categoria: validateCategoria(value) ? "" : "Debe seleccionar una categoría.",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nombre: validateNombre(formData.nombre) ? "" : "El nombre solo puede contener letras y espacios.",
      precio: validatePrecio(formData.precio) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
      cantidadStock: validateCantidadStock(formData.cantidadStock) ? "" : "La cantidad en stock debe ser un número entero.",
      categoria: validateCategoria(formData.categoria) ? "" : "Debe seleccionar una categoría.",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    const productExists = productos.some(p => p.nombre === formData.nombre);
    if (productExists && !product) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nombre: "El producto ya existe en el inventario.",
      }));
      return;
    }

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      cantidadStock: parseInt(formData.cantidadStock, 10),
      estado: "activo",
    };

    onAddProduct(productData);
    setFormData({
      nombre: "",
      precio: "",
      cantidadStock: "",
      categoria: ""
    });
    handleClose();
  };
  
  const handleClose = () => {
    setFormData({
      nombre: "",
      precio: "",
      cantidadStock: "",
      categoria: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;
  console.log("cateorias", categorias);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full divide-y divide-gray-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {product ? "Modificar Producto" : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="pt-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 text-sm font-medium mb-2">Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              id="precio"
              value={formData.precio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="cantidadStock" className="block text-gray-700 text-sm font-medium mb-2">Cantidad en Stock</label>
            <input
              type="number"
              name="cantidadStock"
              id="cantidadStock"
              value={formData.cantidadStock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.cantidadStock && <p className="text-red-500 text-sm">{errors.cantidadStock}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="categoria" className="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
            <select
              name="categoria"
              id="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria}</p>}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-700 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              {product ? "Modificar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default ProductAddModal;