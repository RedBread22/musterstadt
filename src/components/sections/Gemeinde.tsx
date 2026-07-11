"use client";

import {
  MapPin,
  User,
  Map,
  Users,
  Maximize,
  Landmark,
  Vote,
  type LucideIcon,
} from "lucide-react";
import { gemeinde, gemeindeFakten } from "../../../content/musterstadt";
import { SectionWrapper } from "../ui/SectionWrapper";

const faktenIcons: Record<string, LucideIcon> = {
  Map,
  Users,
  Maximize,
  Landmark,
  Vote,
};

export function Gemeinde() {
  return (
    <SectionWrapper id="gemeinde" soft>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Über die Marktgemeinde
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex gap-4">
          <MapPin className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Bezirk
            </p>
            <p className="text-lg">
              {gemeinde.bezirk}, {gemeinde.bundesland}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <User className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Bürgermeister
            </p>
            <p className="text-lg">
              {gemeinde.buergermeister.name}
            </p>
            <p className="text-sm text-fg-muted">{gemeinde.buergermeister.partei}</p>
          </div>
        </div>

        {gemeindeFakten.map((fakt) => {
          const Icon = faktenIcons[fakt.icon];
          return (
            <div key={fakt.label} className="flex gap-4">
              {Icon && (
                <Icon
                  className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                  {fakt.label}
                </p>
                <p className="text-lg">{fakt.value}</p>
                {fakt.sub && (
                  <p className="text-sm text-fg-muted">{fakt.sub}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
