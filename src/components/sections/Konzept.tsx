"use client";

import { Layers, Network, Battery, Zap, Shield, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { konzeptZiele } from "../../../content/musterstadt";
import { SectionWrapper } from "../ui/SectionWrapper";

const icons = [Layers, Network, Zap, Battery, Shield, TrendingDown];

export function Konzept() {
  return (
    <SectionWrapper id="konzept" soft>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Was wir vor Ort erarbeitet haben
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {konzeptZiele.map((ziel, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 border border-border rounded-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-fg-muted" strokeWidth={1.5} />
              </div>
              <p className="text-base leading-relaxed pt-2">{ziel}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
