import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Battery, ShieldCheck } from "lucide-react";
import { standorte, phasen } from "../../../../content/boeheimkirchen";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Nur Standorte mit konkreten Kennzahlen bekommen eine Detailseite.
// metaOnly-Standorte (z. B. ein reines Speichersystem) bleiben ohne eigene Seite.
function hatDaten(s: (typeof standorte)[number]): boolean {
  return (s.leistung_kWp != null || s.speicher_kWh != null) && !s.metaOnly;
}

export function generateStaticParams() {
  return standorte.filter(hatDaten).map((s) => ({ slug: s.slug }));
}

type Props = {
  params: { slug: string };
};

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

export default function StandortDetail({ params }: Props) {
  const standort = standorte.find((s) => s.slug === params.slug);

  if (!standort || !hatDaten(standort)) {
    notFound();
  }

  const phase = phasen.find((p) => p.nummer === standort.phase);

  return (
    <main className="pt-16">
      <div className="max-w-content mx-auto px-6 py-12 md:py-20">
        <Link
          href="/#standorte"
          className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>

        <div className="mb-12">
          {standort.bildSrc ? (
            <Image
              src={standort.bildSrc}
              alt={standort.name}
              width={800}
              height={600}
              unoptimized={true}
              className="w-full aspect-[4/3] object-cover"
            />
          ) : (
            <ImagePlaceholder label={standort.bildPlatzhalter ?? standort.name} />
          )}
        </div>

        {phase && (
          <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-4">
            {phase.titel} · {phase.zeitrahmen}
          </p>
        )}

        <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-6">
          {standort.name}
        </h1>

        {standort.adresse && (
          <p className="text-sm text-fg-muted mb-6">{standort.adresse}</p>
        )}

        {standort.beschreibung && (
          <p className="text-lg text-fg-muted leading-relaxed max-w-3xl mb-12">
            {standort.beschreibung}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
          {standort.leistung_kWp != null && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Leistung
              </p>
              <p className="font-serif text-3xl">
                {formatNumber(standort.leistung_kWp)}{" "}
                <span className="text-lg text-fg-muted">kWp</span>
              </p>
            </div>
          )}

          {standort.module != null && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Module
              </p>
              <p className="font-serif text-3xl">{formatNumber(standort.module)}</p>
            </div>
          )}

          {standort.typ && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Typ
              </p>
              <p className="text-lg">{standort.typ}</p>
            </div>
          )}

          {standort.speicher_kWh != null && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Speicher
              </p>
              <p className="font-serif text-3xl flex items-center gap-2">
                <Battery className="w-5 h-5 text-fg-muted" strokeWidth={1.5} />
                {standort.speicher_kWh}{" "}
                <span className="text-lg text-fg-muted">kWh</span>
              </p>
            </div>
          )}

          {standort.notstrom === true && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Notstrom
              </p>
              <p className="text-lg flex items-center gap-2 text-accent">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                Blackoutfähig
              </p>
            </div>
          )}
        </div>

        {standort.besonderheit && (
          <div className="mt-8 p-6 bg-bg-soft border border-border">
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-2">
              Besonderheit
            </p>
            <p className="text-lg">{standort.besonderheit}</p>
          </div>
        )}

        {standort.pdf && (
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-4">
              Detailplanung (PDF)
            </p>
            <div className="w-full h-[70vh] min-h-[420px] border border-border bg-bg-soft overflow-hidden">
              <iframe
                src={standort.pdf}
                title={`Detailplanung ${standort.name}`}
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-fg-muted mt-3">
              <a
                href={standort.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-fg transition-colors"
              >
                PDF in neuem Tab öffnen
              </a>
            </p>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/#standorte"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </main>
  );
}
