"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { gemeinde } from "../../../content/musterstadt";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative bg-bg">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 lg:max-w-[60%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight">
              Energiekonzept
              <br />
              {gemeinde.shortName}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-fg-muted leading-relaxed max-w-xl">
              Eine wirtschaftlich optimale, förderfähige Energielösung für die{" "}
              {gemeinde.name}.
            </p>
          </motion.div>

          <motion.div
            className="flex-shrink-0 w-56 sm:w-64 lg:w-72"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {gemeinde.logoSrc ? (
              <Image
                src={gemeinde.logoSrc}
                alt={`Wappen ${gemeinde.shortName}`}
                width={600}
                height={720}
                priority
                unoptimized={true}
                className="w-full h-auto"
              />
            ) : (
              <ImagePlaceholder label={`Wappen ${gemeinde.shortName}`} ratio="1/1" />
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-6 h-6 text-fg-muted/40" />
      </motion.div>
    </section>
  );
}
