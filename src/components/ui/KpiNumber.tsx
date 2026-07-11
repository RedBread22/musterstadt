"use client";

import { motion } from "framer-motion";

type Props = {
  value: string;
  label: string;
  suffix?: string;
  compact?: boolean;
};

export function KpiNumber({ value, label, suffix, compact }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="inline-flex flex-col items-center text-center"
    >
      <p className={`font-serif tracking-tight text-fg leading-none ${compact ? "text-4xl lg:text-5xl" : "text-5xl"}`}>
        {value}
        {suffix && (
          <span className="text-2xl text-fg-muted ml-1 align-baseline">
            {suffix}
          </span>
        )}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-fg-muted font-sans">
        {label}
      </p>
    </motion.div>
  );
}
