import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { usePedidos } from '@/hooks/usePedidos';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TopProducts() {
  const { pedidos } = usePedidos();

  const productsData = useMemo(() => {
    const productMap = new Map();

    pedidos.forEach((pedido) => {
      pedido.detallePedidos.forEach((detalle) => {
        const { producto, cantidad, subTotal } = detalle;
        if (productMap.has(producto.id)) {
          const existingProduct = productMap.get(producto.id);
          existingProduct.sales += cantidad;
          existingProduct.revenue += subTotal;
        } else {
          productMap.set(producto.id, {
            id: producto.id,
            name: producto.nombre,
            sales: cantidad,
            revenue: subTotal,
          });
        }
      });
    });

    const productsArray = Array.from(productMap.values());
    productsArray.sort((a, b) => b.sales - a.sales);

    return productsArray.slice(0, 3);
  }, [pedidos]);

  const chartData = {
    labels: productsData.map(p => p.name),
    datasets: [
      {
        label: 'Ventas',
        data: productsData.map(p => p.sales),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="p-6">
        <div className="h-[200px] mb-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="space-y-4">
          {productsData.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-600">{product.sales} ventas</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-900">
                  S/{product.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}