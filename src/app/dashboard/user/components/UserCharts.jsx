import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Chart } from "../components/ui/chart";

export function UserCharts({ roleDistribution }) {
  return (
    <>
      <Card className="flex-1 bg-white rounded-lg p-6 shadow-md min-h-[250px]">
        <CardHeader>
          <CardTitle>Distribución por Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            type="pie"
            data={roleDistribution}
            index="name"
            categories={["value"]}
            colors={["chart-1", "chart-2"]}
            valueFormatter={(value) => `${value}`}
          />
        </CardContent>
      </Card>
    </>
  );
}