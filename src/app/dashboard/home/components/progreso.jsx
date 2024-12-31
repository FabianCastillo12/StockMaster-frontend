import { Card, ProgressCircle } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const valueFormatter = (number) =>
  "S/. " + new Intl.NumberFormat("us").format(number).toString();

const calculateGrowth = (current, previous) =>
  ((current / previous) * 100).toFixed(0);

const calculateTotals = (data, year) =>
  data.reduce((acc, item) => acc + item[year], 0);

const calculatePedidos = (pedidos) =>
  pedidos.reduce(
    (acc, pedido) => {
      if (pedido.estado === "Registrado") acc.registrados += 1;
      else if (pedido.estado === "Entregado") acc.entregados += 1;
      return acc;
    },
    { registrados: 0, entregados: 0 }
  );

const ProgressSection = ({ title, value, current, previous, growth }) => (
  <div className="w-full">
    <p className="font-mono my-2 text-sm text-slate-500 text-white">{title}</p>
    <Card className="mx-auto max-w-sm">
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle value={growth} size="md">
          <span className="text-s font-medium text-slate-700 text-black">
            {growth}%
          </span>
        </ProgressCircle>
        <div>
          <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            {valueFormatter(current.toFixed(0))} / {valueFormatter(previous.toFixed(0))} ({growth}%)
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {title.includes("mes") ? "Progreso mensual" : "Progreso anual"}
          </p>
        </div>
      </div>
    </Card>
  </div>
);

const PedidosSection = ({ total, registrados, entregados, porcentajeRegistrados, porcentajeEntregados }) => (
  <div className="w-full">
    <p className="font-mono my-2 text-sm text-slate-500 text-white">Pedidos en los últimos 30 días</p>
    <Card className="mx-auto max-w-sm">
      <div className="flex justify-center space-x-5 items-center">
        <ProgressCircle value={100} size="md" color="indigo">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-500">
            {total}
          </span>
        </ProgressCircle>
        <ProgressCircle value={porcentajeRegistrados} size="md" color="violet">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500">
            {registrados}
          </span>
        </ProgressCircle>
        <ProgressCircle value={porcentajeEntregados} size="md" color="fuchsia">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-medium text-fuchsia-500">
            {entregados}
          </span>
        </ProgressCircle>
      </div>
    </Card>
  </div>
);

export function ProgressCircleUsageExample() {
  const { ventas2años, pedidos30Dias } = useReports();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });

  const currentMonthData = ventas2años.find((data) => data.date === currentMonth);
  const previousYearData = currentMonthData ? currentMonthData[currentYear - 1] : 0;
  const currentYearData = currentMonthData ? currentMonthData[currentYear] : 0;
  const growth = calculateGrowth(currentYearData, previousYearData);

  const previousYearTotal = calculateTotals(ventas2años, currentYear - 1);
  const currentYearTotal = calculateTotals(ventas2años, currentYear);
  const growthTotal = calculateGrowth(currentYearTotal, previousYearTotal);

  const { registrados, entregados } = calculatePedidos(pedidos30Dias);
  const totalPedidos = registrados + entregados;
  const porcentajeRegistrados = (registrados / totalPedidos) * 100;
  const porcentajeEntregados = (entregados / totalPedidos) * 100;

  return (
    <div className="flex justify-start flex-wrap items-start gap-4">
      <ProgressSection
        title={`Progreso del mes ${currentMonth} respecto al año anterior`}
        value={growth}
        current={currentYearData}
        previous={previousYearData}
        growth={growth}
      />
      <ProgressSection
        title={`Progreso del año ${currentYear} respecto al año anterior`}
        value={growthTotal}
        current={currentYearTotal}
        previous={previousYearTotal}
        growth={growthTotal}
      />
      <PedidosSection
        total={totalPedidos}
        registrados={registrados}
        entregados={entregados}
        porcentajeRegistrados={porcentajeRegistrados}
        porcentajeEntregados={porcentajeEntregados}
      />
    </div>
  );
}
