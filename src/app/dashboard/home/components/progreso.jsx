import { ProgressCircle } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

export function ProgressCircleUsageExample() {
  const { progresoVentas } = useReports();

  return (
    <div className="w-full h-auto">
      <h3 className="text-lg font-medium text-gray-900">Progreso de Ventas</h3>
      <ProgressCircle
        className="mt-6 h-64"
        data={progresoVentas}
        index="name"
        categories={["Progreso"]}
        colors={["blue"]}
      />
    </div>
  );
}
