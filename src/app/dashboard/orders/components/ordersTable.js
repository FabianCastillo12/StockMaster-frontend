import React, { useState, useEffect } from "react";
import { useFormats } from "@/hooks/useFormats";
import { SquareCheckBig, Trash2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import ViewOrderPdf from "./viewOrderPdf";

const OrdersTable = ({
  orders,
  onDeleteOrder,
  onConfirmOrder,
  isRegistrados,
  onViewOrder,
}) => {
  const { formatearFechaISO, currencyFormatter } = useFormats();

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido)
    );
    setOrderList(sortedOrders);
  }, [orders]);

  const handleConfirmOrder = async (order) => {
    onConfirmOrder(order.id);

    const formDataToSend = new FormData();
    formDataToSend.append("id", order.id);


    order.detallePedidos.forEach((detalle, index) => {
      formDataToSend.append(`detallePedidos[${index}][producto][nombre]`, detalle.producto.nombre);
      formDataToSend.append(`detallePedidos[${index}][cantidad]`, detalle.cantidad);
      formDataToSend.append(`detallePedidos[${index}][producto][precio]`, detalle.producto.precio);
      formDataToSend.append(`detallePedidos[${index}][subTotal]`, detalle.subTotal);
    });

    await fetch("https://hook.us2.make.com/n8i4hwiql2qidd8d4ema7bjwdnpqnnxb", {
      method: "POST",
      body: formDataToSend,
    });
  };

  if (!Array.isArray(orders)) {
    return <div className="text-black">No hay pedidos disponibles</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-1/12">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-2/12">Fecha</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-2/12">Cliente</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-1/12">Total</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-1/12">Estado</th>
            {isRegistrados && (
              <>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-1/12">
                  Confirmar Entrega
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-1/12">
                  Cancelar Pedido
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orderList.map((order) => (
            <tr
              key={order.id}
              onClick={() => onViewOrder(true, order)}
              className="cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out"
            >
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.id}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatearFechaISO(order.fecha_pedido)}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{order.cliente.nombre}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{currencyFormatter.format(order.total)}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {order.estado}
                </span>
              </td>
              {isRegistrados && (
                <>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirmOrder(order);
                      }}
                      className="text-green-600 bg-green-100 hover:bg-green-200 rounded-md p-2 transition-all"
                      onMouseEnter={(e) =>
                        e.currentTarget.closest('tr').classList.remove("hover:bg-gray-100")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.closest('tr').classList.add("hover:bg-gray-100")
                      }
                    >
                      <SquareCheckBig className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteOrder(order.id);
                      }}
                      className="text-red-600 bg-red-100 hover:bg-red-200 rounded-md p-2 transition-all"
                      onMouseEnter={(e) =>
                        e.currentTarget.closest('tr').classList.remove("hover:bg-gray-100")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.closest('tr').classList.add("hover:bg-gray-100")
                      }
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;