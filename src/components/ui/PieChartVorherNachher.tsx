"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
  eigennutzen: number;
  ueberschuss: number;
  label?: string;
  accentColor?: string;
  eigennutzenKwh?: string;
  ueberschussKwh?: string;
};

const LIGHT_COLOR = "#D0D0CC";

export function PieChartDisplay({
  eigennutzen,
  ueberschuss,
  label,
  accentColor,
  eigennutzenKwh,
  ueberschussKwh,
}: Props) {
  const darkColor = accentColor || "#111111";
  const data = [
    { value: eigennutzen },
    { value: ueberschuss },
  ];
  const colors = [darkColor, LIGHT_COLOR];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="85%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-8 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-fg flex-shrink-0" />
          <span>
            {eigennutzen}% Eigennutzen
            {eigennutzenKwh && (
              <span className="block text-fg-muted">{eigennutzenKwh} kWh</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#D0D0CC] flex-shrink-0" />
          <span>
            {ueberschuss}% Überschuss
            {ueberschussKwh && (
              <span className="block text-fg-muted">{ueberschussKwh} kWh</span>
            )}
          </span>
        </div>
      </div>
      {label && (
        <p className="text-xs text-fg-muted mt-3 text-center">{label}</p>
      )}
    </div>
  );
}
