"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Battery, ChevronDown, ShieldCheck } from "lucide-react";
import { standorte, phasen, type Standort } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

// Standorte mit konkreten Kennzahlen bekommen eine verlinkte Karte + Detailseite.
// Standorte ohne Werte erscheinen als reine Plan-Karte (Name/Typ, ohne Link).
// metaOnly-Standorte (z. B. ein reines Speichersystem) bekommen trotz
// vorhandener Kennzahlen keinen Link/keine Detailseite.
function hatDaten(s: Standort): boolean {
  return (s.leistung_kWp != null || s.speicher_kWh != null) && !s.metaOnly;
}

function StandortCardInhalt({ s }: { s: Standort }) {
  const zeigtKennzahlen =
    s.leistung_kWp != null || s.module != null || s.speicher_kWh != null || s.notstrom;

  return (
    <>
      {!s.metaOnly &&
        (s.bildSrc ? (
          <Image
            src={s.bildSrc}
            alt={s.name}
            width={800}
            height={600}
            unoptimized={true}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <ImagePlaceholder label={s.bildPlatzhalter ?? s.name} />
        ))}

      <div className="p-6">
        <h3 className="font-serif text-2xl tracking-tight mb-2">{s.name}</h3>

        {(s.typ || s.besonderheit) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {s.typ && (
              <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                {s.typ}
              </span>
            )}
            {s.besonderheit && (
              <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                {s.besonderheit}
              </span>
            )}
          </div>
        )}

        {zeigtKennzahlen && (
          <div className="flex items-center gap-6 text-sm text-fg-muted mb-4">
            {s.leistung_kWp != null && (
              <span>{formatNumber(s.leistung_kWp)} kWp</span>
            )}
            {s.module != null && <span>{formatNumber(s.module)} Module</span>}
            {s.speicher_kWh != null && (
              <span className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5" strokeWidth={1.5} />
                {s.speicher_kWh} kWh
              </span>
            )}
            {s.notstrom && (
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                Notstrom
              </span>
            )}
          </div>
        )}

        {hatDaten(s) && (
          <span className="text-sm text-fg-muted inline-flex items-center gap-1">
            Details ansehen
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </>
  );
}

function StandortCard({ s, i }: { s: Standort; i: number }) {
  const istVerlinkt = hatDaten(s);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
    >
      {istVerlinkt ? (
        <Link
          href={`/standorte/${s.slug}`}
          className="group block border border-[#E5E5E5] hover:border-[#111111] hover:-translate-y-[2px] transition-all duration-200 h-full"
        >
          <StandortCardInhalt s={s} />
        </Link>
      ) : (
        <div className="block border border-[#E5E5E5] h-full">
          <StandortCardInhalt s={s} />
        </div>
      )}
    </motion.div>
  );
}

// Kopfzeile einer Phase (Titel · Summe · Zeitrahmen) — als reiner Inhalt,
// damit sie sowohl im klappbaren Button als auch statisch verwendet werden kann.
function PhaseHeaderInhalt({ phase }: { phase: (typeof phasen)[number] }) {
  return (
    <div className="flex-1">
      <h3 className="font-serif text-3xl tracking-tight">{phase.titel}</h3>
      {phase.summe && (
        <p className="text-sm text-fg-muted mt-2">
          {formatNumber(phase.summe.module)} Module ·{" "}
          {formatNumber(phase.summe.leistung_kWp)} kWp
          {phase.summe.speicher_kWh != null && (
            <> · {formatNumber(phase.summe.speicher_kWh)} kWh Speicher</>
          )}
        </p>
      )}
      <p className="text-sm uppercase tracking-[0.15em] text-fg-muted mt-2">
        {phase.zeitrahmen}
      </p>
      {phase.anschaffungNetto_eur != null && (
        <p className="text-sm text-fg-muted mt-1">
          Anschaffung netto {formatNumber(phase.anschaffungNetto_eur)} €
        </p>
      )}
    </div>
  );
}

function PhaseBlock({
  phase,
  standorteDerPhase,
  offenDefault,
}: {
  phase: (typeof phasen)[number];
  standorteDerPhase: Standort[];
  offenDefault: boolean;
}) {
  const [offen, setOffen] = useState(offenDefault);
  const inhaltId = `phase-${phase.nummer}-inhalt`;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOffen((o) => !o)}
        aria-expanded={offen}
        aria-controls={inhaltId}
        className="group w-full text-left border-t border-border pt-8 mb-10 flex items-start gap-6"
      >
        <PhaseHeaderInhalt phase={phase} />

        <ChevronDown
          className={`w-6 h-6 mt-1 shrink-0 text-fg-muted transition-transform duration-300 ${
            offen ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence initial={false}>
        {offen && (
          <motion.div
            id={inhaltId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-1">
              {standorteDerPhase.map((s, i) => (
                <StandortCard key={s.slug} s={s} i={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Phase 4 ist nicht klappbar: nur Überschrift + Untertitel, dauerhaft
// geschlossen — kein Toggle, kein Chevron, keine Standort-Karten.
function PhaseStatisch({ phase }: { phase: (typeof phasen)[number] }) {
  return (
    <div>
      <div className="border-t border-border pt-8 flex items-start gap-6">
        <PhaseHeaderInhalt phase={phase} />
      </div>
    </div>
  );
}

export function Standorte() {
  return (
    <SectionWrapper id="standorte">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
        Die Timeline für eine unabhängige Gemeinde
      </h2>
      <p className="text-fg-muted text-lg mb-16 max-w-2xl">
        Das Konzept wird in vier Phasen umgesetzt — von den Sofortmaßnahmen
        bis zu langfristig zu prüfenden Standorten. Klicken Sie auf eine Phase,
        um die Standorte ein- oder auszuklappen.
      </p>

      <div className="space-y-20">
        {phasen.map((phase) =>
          phase.nummer === 4 ? (
            <PhaseStatisch key={phase.nummer} phase={phase} />
          ) : (
            <PhaseBlock
              key={phase.nummer}
              phase={phase}
              standorteDerPhase={standorte.filter(
                (s) => s.phase === phase.nummer,
              )}
              offenDefault={false}
            />
          ),
        )}
      </div>
    </SectionWrapper>
  );
}
