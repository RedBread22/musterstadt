"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { aktuellerStand, gemeinde } from "../../../content/musterstadt";
import { SectionWrapper } from "../ui/SectionWrapper";
import { KpiNumber } from "../ui/KpiNumber";
import { PieChartDisplay } from "../ui/PieChartVorherNachher";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

function formatCt(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function formatEur(n: number): string {
  return n.toLocaleString("de-AT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function AktuellerStand() {
  const [showRechenweg, setShowRechenweg] = useState(false);

  return (
    <SectionWrapper id="aktueller-stand">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Wo {gemeinde.shortName} heute steht
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 lg:gap-x-20 gap-y-12 items-start mb-12">
        <KpiNumber
          value={formatNumber(aktuellerStand.stromverbrauch_kWh)}
          label="Stromverbrauch kWh"
          compact
        />
        <KpiNumber
          value={formatNumber(aktuellerStand.gesamtkosten_eur)}
          label="Gesamtkosten €"
          compact
        />
        <KpiNumber
          value={aktuellerStand.stromkosten_ct_kWh.toFixed(2).replace(".", ",")}
          label="Cent pro kWh"
          suffix="ct"
          compact
        />
        <KpiNumber
          value={formatNumber(aktuellerStand.pv.groesse_kWp)}
          label="Bestehende PV kWp"
          suffix="kWp"
          compact
        />
      </div>

      <div className="max-w-xl mb-20">
        <button
          type="button"
          onClick={() => setShowRechenweg((v) => !v)}
          aria-expanded={showRechenweg}
          className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-fg-muted hover:text-fg transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showRechenweg ? "rotate-180" : ""}`}
            strokeWidth={1.5}
          />
          Rechenweg: Wie setzen sich die 19,0 ct/kWh zusammen?
        </button>

        {showRechenweg && (
          <div className="mt-6 border-l-2 border-fg/10 pl-6">
            <dl className="space-y-2 font-mono text-sm md:text-base">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-fg-muted">Energiekosten</dt>
                <dd className="tabular-nums">
                  {formatCt(aktuellerStand.energiekosten_ct_kWh)} ct/kWh
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-fg-muted">Netzkosten</dt>
                <dd className="tabular-nums">
                  {formatCt(aktuellerStand.netzkosten_ct_kWh)} ct/kWh
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-fg-muted">Abgaben</dt>
                <dd className="tabular-nums">
                  {formatCt(aktuellerStand.abgaben_ct_kWh)} ct/kWh
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t-2 border-fg pt-2 mt-2 font-semibold">
                <dt>= Stromkosten</dt>
                <dd className="tabular-nums">
                  {formatCt(aktuellerStand.stromkosten_ct_kWh)} ct/kWh
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-sm text-fg-muted leading-relaxed">
              {formatEur(aktuellerStand.stromverbrauch_kWh)} kWh Stromverbrauch ×{" "}
              {formatCt(aktuellerStand.stromkosten_ct_kWh)} ct/kWh ={" "}
              <span className="text-fg font-medium">
                {formatEur(aktuellerStand.gesamtkosten_eur)} €
              </span>{" "}
              Gesamtkosten.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <PieChartDisplay
          eigennutzen={aktuellerStand.pv.eigennutzen_prozent}
          ueberschuss={aktuellerStand.pv.ueberschuss_prozent}
          eigennutzenKwh={formatEur(aktuellerStand.pv.eigennutzen_kWh)}
          ueberschussKwh={formatNumber(
            Math.trunc(aktuellerStand.pv.ueberschuss_eeg_kWh),
          )}
          label={`PV-Leistung ${formatNumber(aktuellerStand.pv.groesse_kWp)} kWp · ${formatNumber(aktuellerStand.pv.leistung_kWh)} kWh · ${formatNumber(aktuellerStand.pv.sonnenstunden)} Sonnenstunden`}
        />
      </div>
    </SectionWrapper>
  );
}
