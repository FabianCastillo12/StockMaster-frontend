import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TopProducts() {
  const products = [
    {
      id: '1',
      name: 'Laptop HP',
      sales: 45,
      revenue: 44999.55,
      trend: '+12%',
    },
    {
      id: '2',
      name: 'Monitor Dell',
      sales: 38,
      revenue: 11399.62,
      trend: '+8%',
    },
    {
      id: '3',
      name: 'Teclado Mecánico',
      sales: 31,
      revenue: 2789.69,
      trend: '+5%',
    },
  ];

  const chartData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: 'Ventas',
        data: products.map(p => p.sales),
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
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} ventas</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${product.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">{product.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}