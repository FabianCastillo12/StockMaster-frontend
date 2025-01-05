import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";


export function MetricCards({ ventas2años }) {
  const [ventasDelMes, setVentasDelMes] = useState(0);

  const [cambioPorcentaje, setCambioPorcentaje] = useState("N/A");
  const [datosResumenCliente, setDatosResumenCliente] = useState([]);
  const [datosResumenPedido, setDatosResumenPedido] = useState([]);
  const [datosStockBajo, setDatosStockBajo] = useState([]);
  const stockBajo = async () => { 
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/producto/low-stock/100`, {
        headers: {
        },

      });
      if (!res.ok) {
        console.error("Error fetching stock bajo:", res.statusText);
        return;
      }
      const data = await res.json();
      console.log("stock bajo", data);
      setDatosStockBajo(data);
    } catch (error) {
      console.error("Error fetching stock bajo:", error);
    }
  }

  const resumenProducto = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pedidos/nuevos/comparacion`, {
        headers: {
        },
      });
      if (!res.ok) {
        console.error("Error fetching resumen pedido:", res.statusText);
        return;
      }
      const data = await res.json();

      console.log("data", data);

      setDatosResumenPedido(data);
    } catch (error) {
      console.error("Error fetching resumen pedido:", error);
    }
  }

  const resumenCliente = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/resumen`, {
        headers: {
        },
      });

      if (!res.ok) {
        console.error("Error fetching resumen cliente:", res.statusText);
        return;
      }

      const data = await res.json();
      console.log("data", data);  
      setDatosResumenCliente(data);
    } catch (error) {
      console.error("Error fetching resumen cliente:", error);
    }
  }

  useEffect(() => {
    resumenCliente();
    resumenProducto();
    stockBajo();
    if (ventas2años.length > 0) {
      const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
      const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('en-US', { month: 'short' });

      const currentMonthData = ventas2años.find(data => data.date === currentMonth) || {};
      const previousMonthData = ventas2años.find(data => data.date === previousMonth) || {};

      const currentMonthSales = currentMonthData["2025"] || 0;
      const previousMonthSales = previousMonthData["2025"] || 0;

      setVentasDelMes(currentMonthSales);

      const change = previousMonthSales > 0 ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100 : "N/A";
      setCambioPorcentaje(change !== "N/A" ? change.toFixed(2) : "N/A");
    }
  }, [ventas2años]);

  const metrics = [
    {
      title: "Ventas del Mes",
      value: `S/${ventasDelMes.toLocaleString()}`,
      change: cambioPorcentaje !== "N/A" ? `${cambioPorcentaje}%` : "N/A",
      trend: cambioPorcentaje > 0 || cambioPorcentaje === "N/A" ? "up" : "down",
      icon: DollarSign,
      color: cambioPorcentaje > 0 || cambioPorcentaje === "N/A" ? "text-green-600" : "text-red-600",
      bgColor: cambioPorcentaje > 0 || cambioPorcentaje === "N/A" ? "bg-green-100" : "bg-red-100",
    },
    {
      title: "Pedidos Nuevos",
      value: datosResumenPedido.pedidosMesActual,
      change: `+${datosResumenPedido.porcentajeCambio}%`,
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Clientes Activos",
      value: datosResumenCliente.clientesActivos || 0,
      change: `+${datosResumenCliente.porcentajeVsMesAnterior}%`,
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Stock Bajo",
      value: datosStockBajo.lowStockCount,
      trend: "down",
      icon: Package,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
              {metric.title !== "Stock Bajo" && (
                <span className="text-sm text-gray-600 ml-2">
                  vs mes anterior
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
