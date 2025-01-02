export function calculateStockLevel(item) {
  const percentage = (item.cantidadStock / 200) * 100;
  if (percentage <= 25) {
    return { level: 'low', color: 'red', percentage };
  } else if (percentage <= 75) {
    return { level: 'medium', color: 'yellow', percentage };
  }
  return { level: 'high', color: 'green', percentage };
}

export function getStockStats(items) {
  return {
    total: items.length,
    lowStock: items.filter(item => calculateStockLevel(item).level === 'low').length,
    active: items.filter(item => item.status === 'active').length,
    inactive: items.filter(item => item.status === 'inactive').length,
  };
}