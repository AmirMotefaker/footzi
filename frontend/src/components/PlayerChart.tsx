// frontend/src/components/PlayerChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ✅ Type جدیدی برای داده‌های واقعی نمودار تعریف می‌کنیم
type PlayerChartProps = {
  playerStats: {
    goals: number;
    assists: number;
    appearances: number;
  };
};

export default function PlayerChart({ playerStats }: PlayerChartProps) {
  // ✅ داده‌ها را از Props دریافت می‌کنیم
  const data = [
    { name: 'گل‌ها', value: playerStats.goals },
    { name: 'پاس گل', value: playerStats.assists },
    { name: 'حضور', value: playerStats.appearances },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#facc15" />
      </BarChart>
    </ResponsiveContainer>
  );
}