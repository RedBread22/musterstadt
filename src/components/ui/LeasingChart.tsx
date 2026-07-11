"use client";

import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Monat = {
  monat: string;
  ertrag_kWh: number;
};

type Props = {
  daten: readonly Monat[];
  preisProKwh_ct: number;
};

function formatKwh(n: number): string {
  return n.toLocaleString("de-AT");
}

function formatEur(n: number): string {
  return n.toLocaleString("de-AT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Kompakte Tausender-Schreibweise für die rechte €-Achse, passend zur
// linken kWh-Achse ("15k"). Beispiele: 10000 -> "10k", 2500 -> "2,5k".
function formatEurCompact(n: number): string {
  if (n === 0) return "0";
  const k = n / 1000;
  const str = k.toLocaleString("de-AT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  return `${str}k`;
}

export function LeasingChart({ daten, preisProKwh_ct }: Props) {
  const fixpreis = preisProKwh_ct / 100;
  const data = daten.map((m) => ({
    monat: m.monat,
    ertrag_kWh: m.ertrag_kWh,
    rate_eur: Math.round(m.ertrag_kWh * fixpreis),
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 28, bottom: 0, left: 8 }}
        >
          <CartesianGrid stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="monat"
            tick={{ fill: "#6B6B6B", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#E5E5E5" }}
          />
          <YAxis
            yAxisId="kwh"
            tick={{ fill: "#6B6B6B", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
          />
          <YAxis
            yAxisId="eur"
            orientation="right"
            tick={{ fill: "#6B6B6B", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={56}
            tickFormatter={(v: number) => `${formatEurCompact(v)} €`}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E5E5E5",
              fontSize: 12,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
            formatter={(value, name) => {
              const n = Number(value);
              return name === "rate_eur"
                ? [`${formatEur(n)} €`, "Leasingrate"]
                : [`${formatKwh(n)} kWh`, "PV-Ertrag"];
            }}
            labelFormatter={(l) => `Monat: ${l}`}
          />
          <Bar
            yAxisId="kwh"
            dataKey="ertrag_kWh"
            fill="#D0D0CC"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            yAxisId="eur"
            type="monotone"
            dataKey="rate_eur"
            stroke="#C9322B"
            strokeWidth={2}
            dot={{ r: 3, fill: "#C9322B" }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#D0D0CC] flex-shrink-0" />
          <span className="text-fg-muted">PV-Ertrag (kWh)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-[2px] bg-accent flex-shrink-0" />
          <span className="text-fg-muted">Leasingrate (€)</span>
        </div>
      </div>
    </div>
  );
}
