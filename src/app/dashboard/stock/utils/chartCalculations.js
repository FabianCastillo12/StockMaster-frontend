export function calculateStockLevels(items) {
  const levels = {
    low: 0, // Cantidad de productos con stock bajo
    medium: 0, // Cantidad de productos con stock medio
    high: 0, // Cantidad de productos con stock alto
    total: items.length, // Total de productos
  };
  console.log("items", items);
  items.forEach(item => {
    const percentage = (item.cantidadStock / 200) * 100;
    if (percentage <= 25) levels.low++;
    else if (percentage <= 75) levels.medium++;
    else levels.high++;
  });
  console.log("levels", levels);
  return levels;
}

export function calculateCategoryData(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.categoria.nombre]) {
      acc[item.categoria.nombre] = {
        count: 0, // Cantidad de productos en la categoría
        totalStock: 0, // Stock total en la categoría
        maxStock: 0, // Stock máximo en la categoría
      };
    }
    acc[item.categoria.nombre].count++;
    acc[item.categoria.nombre].totalStock += item.cantidadStock;
    acc[item.categoria.nombre].maxStock = 3000;
    return acc;
  }, {});
}