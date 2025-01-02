import React, { useState, useEffect } from "react";
import ProductModal from "@/app/dashboard/products/components/editProduct";
import { useSession } from "next-auth/react";
import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({
  products,
  onDeleteProduct,
  onUpdateProduct,
  categoria,
}) => {
  console.log(categoria);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [productList, setProductList] = useState(products);

  const { data: session, status } = useSession();
  useEffect(() => {
    setProductList(products);
  }, [products]);

  const editProduct = (open, product) => {
    setIsEditModalOpen(open);
    setFormDataEdit(product);
  };

  const getCategoryColor = (categoryName) => {
    const categoryColors = {
      "1": "bg-green-200 text-green-900",
      "2": "bg-yellow-200 text-yellow-900",
      "3": "bg-orange-100 text-orange-800",
      "4": "bg-orange-300 text-orange-900",
      "5": "bg-red-200 text-red-900",
      "6": "bg-rose-200 text-rose-900",
      "7": "bg-blue-200 text-blue-900",
      "8": "bg-purple-200 text-purple-900",
      "9": "bg-gray-200 text-gray-900",
    };

    return categoryColors[categoryName] || categoryColors["default"];
  };

  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Código</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Precio</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Estado</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-all`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getCategoryColor(
                    product.categoria.id % 10
                  )}`}
                >
                  {product.categoria.nombre}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Intl.NumberFormat("es-PE", {
                  style: "currency",
                  currency: "PEN",
                }).format(product.precio)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                    product.estado === "activo"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.estado === "activo" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-3">
                  <button
                    onClick={() => editProduct(true, product)}
                    className="text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md p-2 transition-all"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  {session.user.rol === "admin" && (
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="text-red-600 bg-red-100 hover:bg-red-200 rounded-md p-2 transition-all"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ProductModal
          products={products}
          setIsEditModalOpen={setIsEditModalOpen}
          formDataEdit={formDataEdit}
          onUpdateProduct={onUpdateProduct}
          categoria={categoria}
        />
      )}
    </div>
  );
};

export default ProductTable;
