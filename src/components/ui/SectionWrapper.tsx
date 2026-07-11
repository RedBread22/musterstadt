"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  soft?: boolean;
};

export function SectionWrapper({ id, children, className = "", soft }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-20 md:py-[120px] ${soft ? "bg-bg-soft" : "bg-bg"} ${className}`}
    >
      <div className="max-w-content mx-auto px-6">{children}</div>
    </motion.section>
  );
}
