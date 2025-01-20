import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function CustomerOverview() {
  const [datosResumenCliente, setDatosResumenCliente] = useState([]);

  useEffect(() => {
    resumenCliente();
  }, []);

  const resumenCliente = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/resumen`,
        {
          headers: {},
        }
      );

      if (!res.ok) {
        console.error("Error fetching resumen cliente:", res.statusText);
        return;
      }

      const data = await res.json();
      console.log("data", data);
      setDatosResumenCliente(data);
    } catch (error) {
      console.error("Error fetching resumen cliente:", error);
    }
  };


  const chartData = {
    labels: ["Anteriores", "Este mes"],
    datasets: [
      {
        data: [
          datosResumenCliente.clientesActivos - datosResumenCliente.nuevosEsteMes,
          datosResumenCliente.nuevosEsteMes,
        ],
        backgroundColor: ["rgb(255, 165, 0)", "rgb(34, 197, 94)"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Resumen de Clientes
        </h2>
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-r border-gray-200 pr-4">
          <p className="text-sm text-gray-600">Total Clientes</p>
          <p className="text-2xl font-bold text-gray-900">
            {datosResumenCliente.totalClientes}
          </p>
        </div>
        <div className="border-r border-gray-200 pr-4">
          <p className="text-sm text-gray-600">Nuevos (Este Mes)</p>
          <p className="text-2xl font-bold text-green-600">
            +{datosResumenCliente.nuevosEsteMes}
          </p>
        </div>
      </div>

      <div className="h-[200px] mb-4">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
