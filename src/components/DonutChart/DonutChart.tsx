import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Mission } from "../../shared/interfaces/Mission.interface";
import { MissionColors } from "../../shared/utils/colors";

ChartJS.register(ArcElement, Tooltip);

export interface DonutChartProps {
  missions: Mission[];
}

const DonutChart: React.FC<DonutChartProps> = (props: DonutChartProps) => {
  const getColors = (): string[] => {
    return props.missions.map((m) => m.color || "");
  };

  const getData = (): number[] => {
    return props.missions.map((m) => m.totalMass || 0);
  };

  const getLabels = (): string[] => {
    return props.missions.map((m) => m.name);
  };

  return (
    <Doughnut
      data={{
        labels: getLabels(),
        datasets: [
          {
            data: getData(),
            backgroundColor: getColors(),
            borderWidth: 1,
            borderRadius: 15,
            spacing: 5,
          },
        ],
      }}
      options={{
        cutout: "92%",
        plugins: {
          tooltip: {
            callbacks: {
              label: (item: { formattedValue: string }) =>
                `${item.formattedValue} KG`,
            },
          },
        },
      }}
    />
  );
};

export default DonutChart;
