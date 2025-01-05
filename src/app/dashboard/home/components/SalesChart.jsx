import React, { useMemo, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useReports } from '@/hooks/useReports';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SalesChart() {
  const { ventas2años } = useReports();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (ventas2años.length > 0) {
      const labels = ventas2años.map((o) => o.date);
      const data = ventas2años.map((o) => o["2025"]);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Ventas',
            data: data,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      });
    }
  }, [ventas2años]);

  const options = {
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
        ticks: {
          callback: (value) => `S/.${value.toLocaleString()}`,
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Ventas Mensuales</h2>
      </div>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}