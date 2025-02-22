"use client";
import React, { useState, useEffect } from "react";
import { useClientes } from "@/hooks/useClients";
import { useFormats } from "@/hooks/useFormats";
import { useSession } from "next-auth/react";


const OrderAddModal = ({ isOpen, onClose, onAddOrder }) => {
  const [products, setProducts] = useState([]);
  const { data: session } = useSession();
  const { clientes } = useClientes();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("nombre");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { currencyFormatter } = useFormats();
  const [isReviewing, setIsReviewing] = useState(false);
  console.log("productos add Order",products)
  const [formData, setFormData] = useState({
    id: "",
    fecha: "",
    cliente: "",
    email: "",
    telefono: "",
    direccion: "",
    productos: [],
    total: 0,
  });

  function TruncateWithTooltip({ text, maxLength = 20 }) {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    return (
      <div className="relative group">
        <div className="text-sm text-gray-700 truncate">
          {truncatedText}
        </div>
        {text.length > maxLength && (
          <div className="absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 w-max max-w-xs break-words left-1/2 transform -translate-x-1/2 whitespace-normal">
            {text}
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </div>
    );
  }


  useEffect(() => {
    if (isOpen) {
      const currentDate = new Date().toISOString().split("T")[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        fecha: currentDate,
      }));
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/producto/`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const data = await res.json();
      setProducts(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user?.token) {
      fetchProducts();
    }
  }, [session]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClientes([]);
    } else {
      const queryLower = searchQuery.toLowerCase();
      setFilteredClientes(
        clientes.filter((cliente) => {
          const nombre = cliente.nombre ? cliente.nombre.toLowerCase() : "";
          const dni = cliente.dni ? cliente.dni.toLowerCase() : "";
          const ruc = cliente.ruc ? cliente.ruc.toLowerCase() : "";

          switch (searchCriteria) {
            case "nombre":
              return nombre.includes(queryLower);
            case "dni":
              return dni.includes(queryLower);
            case "ruc":
              return ruc.includes(queryLower);
            default:
              return false;
          }
        })
      );
    }
  }, [searchQuery, searchCriteria, clientes]);


  useEffect(() => {
    if (productSearchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const queryLower = productSearchQuery.toLowerCase();
      setFilteredProducts(
        products.filter((product) => {
          const nombre = product.nombre ? product.nombre.toLowerCase() : "";
          const descripcion = product.descripcion
            ? product.descripcion.toLowerCase()
            : "";

          return (
            nombre.includes(queryLower) || descripcion.includes(queryLower)
          );
        })
      );
    }
  }, [productSearchQuery, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      alert("Por favor, seleccione un cliente.");
      return;
    }
    if (formData.productos.length === 0) {
      alert("Por favor, agregue al menos un producto.");
      return;
    }

    const detalles = formData.productos.map((product) => ({
      cantidad: product.cantidad,
      productoId: product.id,
    }));

    const orderData = {
      estado: "Registrado",
      clienteId: formData.id,
      detalles: detalles,
    };
    console.log("orderData", orderData);
    await onAddOrder(orderData);
    setFormData({ id: "", productos: [], total: 0 });
    setIsReviewing(false);
    fetchProducts();
    onClose();
  };

  const handleEditProductRow = (index, field, value) => {
    const updatedProducts = [...formData.productos];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, productos: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const handleDeleteProductRow = (index) => {
    const updatedProducts = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const handleAddProductRow = (product) => {
    const isProductAlreadyAdded = formData.productos.some(
      (p) => p.id === product.id
    );

    if (isProductAlreadyAdded) {
      alert("El producto ya está en la lista.");
      return;
    }

    const newProduct = {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.categoria.descripcion,
      stock: product.cantidadStock,
      cantidad: 1,
      precio: product.precio,
      impuestos: product.precio * 0.18,
      impuestosNoIncluidos: product.precio * 0.18,
    };
    const updatedProducts = [...formData.productos, newProduct];
    setFormData({
      ...formData,
      productos: updatedProducts,
    });
    calculateTotal(updatedProducts);
    setProductSearchQuery("");
  };

  const handleClientSelect = (cliente) => {
    setFormData({
      ...formData,
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setSearchQuery("");
  };

  const handleClose = () => {
    setFormData({
      id: "",
      fecha: "",
      cliente: "",
      email: "",
      telefono: "",
      direccion: "",
      productos: [],
      total: 0,
    });
    onClose();
  };

  const calculateTotal = (productos) => {
    const total = productos.reduce((acc, product) => {
      return acc + product.precio * product.cantidad;
    }, 0);

    const igv = total * 0.18;
    const baseImponible = total - igv;

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: total,
      igv: igv,
      baseImponible: baseImponible,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl my-8 text-gray-900 overflow-y-auto max-h-[calc(80vh-4rem)] scrollbar" style={{ scrollbarWidth: "none" }}>
        {!isReviewing ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Agregar Pedido</h2>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-900"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="font-medium mb-2">Buscar Cliente:</h3>
              <div className="flex mb-2 gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-2/3"
                  placeholder="Buscar"
                />
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-1/3"
                >
                  <option value="nombre">Nombre</option>
                  <option value="dni">DNI</option>
                  <option value="ruc">RUC</option>
                </select>
              </div>
              {searchQuery.trim() && filteredClientes.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto bg-gray-100 rounded" style={{ scrollbarWidth: "none" }}>
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">DNI</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">RUC</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {filteredClientes.map((cliente) => (
                        <tr
                          key={cliente.id}
                          onClick={() => handleClientSelect(cliente)}
                          className="cursor-pointer hover:bg-gray-200 transition-colors duration-150 ease-in-out"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.dni}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{cliente.ruc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Datos del Cliente:</h3>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full mb-2"
                placeholder="Nombre del cliente"
                disabled
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full mb-2"
                placeholder="Email del cliente"
                disabled
              />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full mb-2"
                placeholder="Teléfono del cliente"
                disabled
              />
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full"
                placeholder="Dirección del cliente"
                disabled
              />
            </div>
            <div className="mb-4 border-t border-gray-300 pt-4">
              <h3 className="font-medium mb-2">Buscar Producto:</h3>
              <input
                type="text"
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full"
                placeholder="Buscar productos"
              />
              {productSearchQuery.trim() && filteredProducts.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto bg-gray-100 rounded" style={{ scrollbarWidth: "none" }}>
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descripción</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-200 transition-colors duration-150 ease-in-out"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{product.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{product.descripcion}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{currencyFormatter.format(product.precio)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleAddProductRow(product)}
                              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-1 rounded-full transition-colors duration-150 ease-in-out text-sm shadow-md"
                            >
                              Agregar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Productos Añadidos:</h3>

              <div className="overflow-x-auto bg-white rounded-lg shadow-md" style={{ scrollbarWidth: "none" }}>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descripción</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cantidad</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Impuestos</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subtotal</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {formData.productos.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TruncateWithTooltip text={product.nombre} maxLength={20} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TruncateWithTooltip text={product.descripcion} maxLength={30} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={product.cantidad}
                            onChange={(e) =>
                              handleEditProductRow(
                                index,
                                "cantidad",
                                Math.min(parseInt(e.target.value) || 1, product.stock)
                              )
                            }
                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-20 text-gray-900"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{product.stock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.precio)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.impuestos * product.cantidad)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.precio * product.cantidad)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteProductRow(index)}
                            className="text-red-600 hover:text-red-800 bg-white hover:bg-gray-100 px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <div className="mb-1">
                    <span className="font-medium text-gray-700 mr-2">Base imponible:</span>
                    <span className="font-bold">{currencyFormatter.format(formData.total - formData.total * 0.18)}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700 mr-2">IGV:</span>
                    <span className="font-bold">{currencyFormatter.format(formData.total * 0.18)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 mr-2">Total:</span>
                    <span className="text-xl font-bold">{currencyFormatter.format(formData.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleClose}
                className="bg-gray-600 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsReviewing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md hover:bg-blue-700"
              >
                Continuar
              </button>

            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Confirmar Pedido</h2>
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="font-medium mb-2">Cliente:</h3>
              <p>{formData.nombre}</p>
              <p>{formData.email}</p>
              <p>{formData.telefono}</p>
              <p>{formData.direccion}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Productos Añadidos:</h3>
              <div className="overflow-x-auto bg-white rounded-lg shadow-md" style={{ scrollbarWidth: "none" }}>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descripción</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cantidad</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Impuestos</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {formData.productos.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.nombre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{product.descripcion}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{product.cantidad}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.precio)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.impuestos * product.cantidad)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{currencyFormatter.format(product.precio * product.cantidad)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <div className="mb-1">
                    <span className="font-medium text-gray-700 mr-2">Base imponible:</span>
                    <span className="font-bold">{currencyFormatter.format(formData.total - formData.total * 0.18)}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700 mr-2">IGV:</span>
                    <span className="font-bold">{currencyFormatter.format(formData.total * 0.18)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 mr-2">Total:</span>
                    <span className="text-xl font-bold">{currencyFormatter.format(formData.total)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              
              <button
                onClick={() => setIsReviewing(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md hover:bg-gray-700"
              >
                Volver
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md hover:bg-green-700"
              >
                Confirmar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderAddModal;