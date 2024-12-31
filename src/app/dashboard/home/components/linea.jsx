import { LineChart } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number)}`;

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return [currentYear - 1, currentYear];
};

export function LineChartHero() {
  const { ventas2años } = useReports();
  const years = getYears();

  return (
    <LineChart
      data={ventas2años}
      index="date"
      categories={years}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
