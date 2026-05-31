"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type HistoryEntry = {
  paketId: number;
  date: string;
  pgScore: number;
  essayTotal: number;
};

interface ScoreChartProps {
  data: HistoryEntry[];
}

export default function ScoreChart({ data }: ScoreChartProps) {
  const chartData = data.map((entry, index) => ({
    attempt: `Ujian ${index + 1}`,
    "Pilihan Ganda": entry.pgScore,
    "Esai": entry.essayTotal,
    fullDate: new Date(entry.date).toLocaleString("id-ID"),
  }));

  if (data.length < 2) {
    return (
      <div className="bg-white border border-gray-100 p-12 text-center rounded-sm shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono mb-2">Statistik Belajar</p>
        <p className="text-sm font-medium text-ink">Butuh setidaknya 2 percobaan untuk menampilkan tren progres.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b border-gray-50 pb-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] font-mono">Analytics</span>
          <h3 className="text-lg font-black text-ink uppercase tracking-tight">Tren Performa Belajar</h3>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="attempt" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: "#5e616e", fontFamily: "var(--font-mono)" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: "#5e616e", fontFamily: "var(--font-mono)" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#151619", 
                border: "none", 
                borderRadius: "2px",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "var(--font-sans)"
              }}
              itemStyle={{ color: "#fff", fontWeight: 700 }}
              labelStyle={{ color: "#888", marginBottom: "4px", fontSize: "10px" }}
              labelFormatter={(label, payload) => payload[0]?.payload?.fullDate || label}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-mono)", paddingBottom: "20px" }}
            />
            <Line 
              type="monotone" 
              dataKey="Pilihan Ganda" 
              stroke="#151619" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="Esai" 
              stroke="#888888" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="pt-4 flex justify-between items-center text-[9px] font-bold text-muted uppercase tracking-widest font-mono">
        <span>Sistem Pelacakan Mandiri</span>
        <span>Verified by System</span>
      </div>
    </div>
  );
}
