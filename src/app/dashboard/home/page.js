"use client";
import { useStore } from "@/stores/autenticacion";
import { useReports } from "@/hooks/useReports";
import { useSession } from "next-auth/react";
import { MetricCards } from './components/MetricCards';
import { RecentOrders } from './components/RecentOrders';
import { StockAlerts } from './components/StockAlerts';
import { SalesChart } from './components/SalesChart';
import { TopProducts } from './components/TopProducts';
import { CustomerOverview } from './components/CustomerOverview';
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { ventasHoy, cantidadPorTipoProductoSemanal, ventas2años } = useReports();
  const { data: session } = useSession();
  
  const user = useStore((state) => state.user);
  const [ultimasVentas, setUltimasVentas] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (ventasHoy) {
      const sortedVentas = ventasHoy
        .sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido))
        .slice(0, 4);
      setUltimasVentas(sortedVentas);
    }
  }, [ventasHoy]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <MetricCards ventas2años={ventas2años} />
      
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
          <SalesChart ventas2años={ventas2años}/>
        </div>
        <div className="flex-1 min-w-[300px]">
          <CustomerOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

    </div>
  );
}
