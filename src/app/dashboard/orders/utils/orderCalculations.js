export function calculateOrderStats(orders) {
  return {
    total: orders.length,
    pending: orders.filter(o => o.estado === 'Registrado').length,
    completed: orders.filter(o => o.estado === 'Entregado').length,
    totalRevenue: orders
      .filter(o => o.estado === 'Entregado')
      .reduce((sum, order) => sum + order.total, 0),
  };
}

export function getStatusColor(status){
  const colors = {
    pending: 'yellow',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red',
  };
  return colors[status];
}

export function getPaymentStatusColor(status) {
  const colors = {
    pending: 'yellow',
    paid: 'green',
    failed: 'red',
    refunded: 'gray',
  };
  return colors[status];
}