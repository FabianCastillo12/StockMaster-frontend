import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export function StockCharts({ stockLevels, categoryData }) {
  const stockLevelsData = {
    labels: ['Stock Bajo', 'Stock Medio', 'Stock Alto'],
    datasets: [
      {
        data: [stockLevels.low, stockLevels.medium, stockLevels.high],
        backgroundColor: ['#ff6384', '#ffcd56', '#4bc0c0'],
        hoverBackgroundColor: ['#ff6384', '#ffcd56', '#4bc0c0'],
      },
    ],
  };

  const categoryDataLabels = Object.keys(categoryData);
  const categoryDataValues = categoryDataLabels.map(category => categoryData[category].totalStock);

  const categoryDataSet = {
    labels: categoryDataLabels,
    datasets: [
      {
        label: 'Stock por Categoría',
        data: categoryDataValues,
        backgroundColor: '#4bc0c0',
        hoverBackgroundColor: '#4bc0c0',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Gráfico de Niveles de Stock */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Niveles de Stock</h3>
          <div className="relative h-80 w-80">
            <Pie data={stockLevelsData} options={options} />
          </div>
        </div>
      </div>

      {/* Gráfico de Categorías */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Stock por Categoría</h3>
        <div className="relative h-80">
          <Bar data={categoryDataSet} options={options} />
        </div>
      </div>
    </div>
  );
}