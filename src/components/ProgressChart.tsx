import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ScheduleStatus {
  onSchedule: number;
  behind: number;
  advanced: number;
}

interface ProgressChartProps {
  data: ScheduleStatus;
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  const chartData = [
    {
      name: "Schedule Status",
      "On Schedule": data.onSchedule,
      "Behind Schedule": data.behind,
      "Advanced": data.advanced,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="On Schedule" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
        <Bar dataKey="Behind Schedule" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
        <Bar dataKey="Advanced" fill="hsl(var(--info))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
