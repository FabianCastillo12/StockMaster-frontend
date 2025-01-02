import React from 'react';

export function StockProgressBar({ currentStock, maxStock }) {
  const percentage = Math.min((currentStock / maxStock) * 100, 100);
  
  const getColorClass = () => {
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 whitespace-nowrap">
        {currentStock}/{maxStock}
      </span>
    </div>
  );
}