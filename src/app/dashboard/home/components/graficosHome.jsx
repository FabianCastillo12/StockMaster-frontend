"use client";
import { LineChart } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const valueFormatter = (number) =>
  `${Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number)}`;

const LineChartUsageExample = () => {
  const { chartdata } = useReports();

  return (
    <div className="w-1/3 mx-auto">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Newsletter revenue over time (USD)
      </h3>
      <LineChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["SolarPanels", "Inverters"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </div>
  );
};

export default LineChartUsageExample;
