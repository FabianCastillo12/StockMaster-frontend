import React from "react";
import { useFormats } from "@/hooks/useFormats";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ViewOrderPdf from "./viewOrderPdf";

const TruncateWithTooltip = ({ text, maxLength = 20, tooltipPosition = "top" }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  
  const tooltipClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2"
  };
  
  return (
    <div className="relative group">
      <div className="text-sm text-gray-900 truncate">
        {truncatedText}
      </div>
      {text.length > maxLength && (
        <div className={`absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 w-max max-w-xs break-words left-0 ${tooltipClasses[tooltipPosition]}`}>
          {text}
        </div>
      )}
    </div>
  );
};

const ViewOrderModal = ({ setIsViewModalOpen, formDataView }) => {
  const { formatearFechaISO, currencyFormatter } = useFormats();

  const formData = {
    id: formDataView.id,
    fecha: formatearFechaISO(formDataView.fecha_pedido),
    cliente: formDataView.cliente.nombre,
    email: formDataView.cliente.email,
    telefono: formDataView.cliente.telefono,
    direccion: formDataView.cliente.direccion,
    detallePedidos: formDataView.detallePedidos,
    total: formDataView.total,
    estado: formDataView.estado,
  };

  const nombrePedido = `Fact${formData.id}_${formData.cliente}_${formData.fecha}.pdf`;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-200 bg-opacity-50 z-50 overflow-hidden">
      <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="bg-white p-8 rounded-lg w-full max-w-5xl mx-auto my-8 text-gray-900 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
            <div className="flex items-center space-x-4">
              <i className="fas fa-bars text-gray-500"></i>
              <h2 className="font-medium text-gray-500">
                ID del Pedido: <span className="font-bold text-gray-900">{formData.id}</span>
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-calendar text-gray-500"></i>
              <h2 className="font-medium text-gray-500">
                Fecha del Pedido: <span className="font-bold text-gray-900">{formData.fecha}</span>
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-check-circle text-gray-500"></i>
              <h2 className="font-medium text-gray-500">
                Estado del Pedido: <span className="font-bold text-gray-900">{formData.estado}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-medium text-gray-500">Cliente:</div>
              <span className="font-bold text-gray-900">{formData.cliente}</span>
            </div>
            <div>
              <div className="font-medium text-gray-500">Email:</div>
              <span className="font-bold text-gray-900">{formData.email}</span>
            </div>
            <div>
              <div className="font-medium text-gray-500">Teléfono:</div>
              <span className="font-bold text-gray-900">{formData.telefono}</span>
            </div>
            <div>
              <div className="font-medium text-gray-500">Dirección:</div>
              <span className="font-bold text-gray-900">{formData.direccion}</span>
            </div>
          </div>

          <div className="border-b border-gray-300 mb-4">
            <h3 className="text-lg font-medium text-gray-900">Líneas del pedido</h3>
          </div>

          <div className="p-4 border-t border-gray-300">
            <h3 className="text-lg font-medium mb-4 text-gray-900">Productos</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12">ID</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12">Nombre</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-3/12">Descripción</th>
                    <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12">Cantidad</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12">Precio Unitario</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12">Impuestos</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.detallePedidos.map((detalle, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-150 ease-in-out">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-black">{index + 1}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        <TruncateWithTooltip text={detalle.producto.nombre} maxLength={20} />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        <TruncateWithTooltip text={detalle.producto.categoria.descripcion} maxLength={30} />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{detalle.cantidad}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{currencyFormatter.format(detalle.producto.precio)}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{currencyFormatter.format(detalle.producto.precio * 0.18 * detalle.cantidad)}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{currencyFormatter.format(detalle.subTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <div className="text-right">
              <div className="mb-1">
                <span className="font-medium text-gray-500 mr-2">Base imponible:</span>
                <span className="font-bold text-gray-900">{currencyFormatter.format(formData.total - formData.total * 0.18)}</span>
              </div>
              <div className="mb-1">
                <span className="font-medium text-gray-500 mr-2">IGV:</span>
                <span className="font-bold text-gray-900">{currencyFormatter.format(formData.total * 0.18)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500 mr-2">Total:</span>
                <span className="text-xl font-bold text-gray-900">{currencyFormatter.format(formData.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-transparent p-4 flex justify-center gap-5 w-full">
        <PDFDownloadLink
          document={<ViewOrderPdf formData={formData} />}
          fileName={nombrePedido}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md"
        >
          {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
        </PDFDownloadLink>
        <button
          onClick={() => setIsViewModalOpen(false)}
          className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ViewOrderModal;