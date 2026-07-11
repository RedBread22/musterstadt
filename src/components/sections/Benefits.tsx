"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  RefreshCw,
  Receipt,
  Coins,
  Activity,
  Wallet,
  Landmark,
  Network,
  ArrowRight,
  ChevronDown,
  Globe,
  FileText,
  Leaf,
  Sparkles,
  Users,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  finanzierung,
  partner,
  video,
} from "../../../content/musterstadt";
import { SectionWrapper } from "../ui/SectionWrapper";
import { LeasingChart } from "../ui/LeasingChart";

type Partner = (typeof partner)[number];

const vorteilIcons: Record<string, LucideIcon> = {
  RefreshCw,
  Receipt,
  Coins,
  Activity,
  Wallet,
  Landmark,
};

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

function formatCt(n: number): string {
  return n.toLocaleString("de-AT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ── Karten-Hülle (klappbar, Verhalten wie die Timeline-Phasen) ──────────── */

function BenefitCard({
  index,
  kicker,
  titel,
  Icon,
  offenDefault = false,
  children,
}: {
  index: number;
  kicker: string;
  titel: string;
  Icon: LucideIcon;
  offenDefault?: boolean;
  children: React.ReactNode;
}) {
  const [offen, setOffen] = useState(offenDefault);
  const inhaltId = `benefit-${index}-inhalt`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-bg overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOffen((o) => !o)}
        aria-expanded={offen}
        aria-controls={inhaltId}
        className="group w-full text-left flex items-start gap-4 p-6 md:p-10"
      >
        <div className="flex-shrink-0 w-11 h-11 rounded-sm border border-border flex items-center justify-center">
          <Icon className="w-5 h-5 text-fg-muted" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-fg-muted">
            Benefit {index} · {kicker}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight mt-1">
            {titel}
          </h3>
        </div>
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
            <div className="px-6 md:px-10 pb-6 md:pb-10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Benefit 1 — Finanzierung ───────────────────────────────────────────── */

function Finanzierung() {
  const kennzahlen = [
    {
      label: "Preis pro kWh (Fixtarif)",
      value: `${formatCt(finanzierung.preisProKwh_ct)} ct`,
    },
    {
      label: "Geplante Laufzeit",
      value: `${finanzierung.laufzeit_jahre.toLocaleString("de-AT")} Jahre`,
    },
    {
      label: "Investition gesamt",
      value: `${formatNumber(finanzierung.anschaffungswertNetto_eur)} €`,
    },
    {
      label: "PV-Leistung · Speicher",
      value: `${formatNumber(finanzierung.pvLeistung_kWp)} kWp · ${formatNumber(
        finanzierung.speicher_kWh,
      )} kWh`,
    },
    {
      label: "Mögliche Förderung",
      value: `${finanzierung.moeglicheFoerderung_eur.toLocaleString("de-AT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`,
    },
  ];

  return (
    <BenefitCard
      index={1}
      kicker="Finanzierung"
      titel="Kapazitätsleasing"
      Icon={Wallet}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Die PV-Anlage wird nicht klassisch gekauft, sondern über den
        tatsächlichen Ertrag finanziert. Die Leasingrate richtet sich nach der
        PV-Produktion — im ertragsstarken Sommer höher, im Winter niedriger.
        <span className="block mt-3 text-fg">
          Rate = PV-Ertrag (kWh) × Fixpreis pro kWh
        </span>
      </p>

      {/* Kennzahlen-Block aus der Wirtschaftlichkeitsberechnung (Phase 1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-10">
        {kennzahlen.map((k) => (
          <div key={k.label} className="bg-bg p-5">
            <p className="font-serif text-2xl md:text-3xl tracking-tight">
              {k.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-fg-muted leading-snug">
              {k.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-fg-muted mb-10 -mt-6">
        Eckdaten aus der Wirtschaftlichkeitsberechnung (Phase 1 · 190,8 kWp) ·
        Consulting Gassner
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Vorteile */}
        <ul className="space-y-4">
          {finanzierung.vorteile.map((v) => {
            const Icon = vorteilIcons[v.icon] ?? Receipt;
            return (
              <li key={v.text} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-soft flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-fg" strokeWidth={1.5} />
                </div>
                <p className="text-base leading-relaxed pt-1">{v.text}</p>
              </li>
            );
          })}
        </ul>

        {/* Visual: Leasingrate folgt dem PV-Ertrag */}
        <div className="rounded-xl bg-bg-soft border border-border p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
            Leasingrate folgt dem PV-Ertrag
          </p>
          <p className="text-sm text-fg-muted mb-5">
            Illustrativer Jahresverlauf über 12 Monate
          </p>
          <LeasingChart
            daten={finanzierung.monatsverlauf}
            preisProKwh_ct={finanzierung.preisProKwh_ct}
          />
        </div>
      </div>

      {/* Demo-Hinweis an der Stelle des früheren „store and more“-PDF-Embeds:
          das echte Konzept-PDF existiert in der Demo nicht. */}
      <div className="mt-12 flex items-start gap-4 p-6 rounded-xl border border-dashed border-border bg-bg-soft/50">
        <FileText
          className="w-5 h-5 flex-shrink-0 mt-0.5 text-fg-muted"
          strokeWidth={1.5}
        />
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-2">
            store and more — Finanzierungskonzept
          </p>
          <p className="text-sm text-fg-muted leading-relaxed">
            In der finalen Version ist hier das vollständige Konzept als PDF
            eingebettet.
          </p>
        </div>
      </div>
    </BenefitCard>
  );
}

/* ── Benefit 2 — Digitalisierung ────────────────────────────────────────── */

function PartnerLogo({
  src,
  alt,
  className = "h-16 md:h-20 w-auto max-w-[240px] object-contain object-left",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [fehlt, setFehlt] = useState(false);

  if (fehlt) {
    return (
      <div className="flex items-center">
        <span className="font-serif text-xl tracking-tight">{alt}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFehlt(true)}
      className={className}
    />
  );
}

/* Modal/Overlay mit den vollen Infos zu einem Partner.
   Schließbar per X, Backdrop-Klick und ESC. Body-Scroll gesperrt, Fokus-Falle,
   Fokus kehrt beim Schließen auf das auslösende Element zurück. */
function PartnerModal({
  p,
  scrollToPdf,
  onClose,
}: {
  p: Partner;
  scrollToPdf: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Body-Scroll sperren + Fokus beim Schließen zurückgeben
  useEffect(() => {
    const zuvorFokussiert = document.activeElement as HTMLElement | null;
    const overflowVorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowVorher;
      zuvorFokussiert?.focus?.();
    };
  }, []);

  // ESC zum Schließen + Fokus-Falle (Tab bleibt im Modal)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el.tagName === "IFRAME");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Initialer Fokus ins Modal — ggf. direkt zur eingebetteten PDF scrollen
  useEffect(() => {
    const panel = panelRef.current;
    const erstes = panel?.querySelector<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    erstes?.focus();

    if (scrollToPdf && pdfRef.current) {
      pdfRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollToPdf]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-fg/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`partner-modal-${p.key}`}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-bg shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
      >
        {/* Kopf mit Schließen-Button (bleibt beim Scrollen sichtbar) */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg/95 px-6 py-5 backdrop-blur md:px-8">
          <PartnerLogo
            src={p.logoSrc}
            alt={p.name}
            className="h-11 w-auto max-w-[200px] object-contain object-left"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex-shrink-0 -mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Inhalt: Name, Steckbrieftext, Website-Link */}
        <div className="px-6 py-6 md:px-8">
          <h3
            id={`partner-modal-${p.key}`}
            className="font-serif text-2xl tracking-tight md:text-3xl"
          >
            {p.name}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-fg-muted">
            {p.tagline}
          </p>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {p.beschreibung}
          </p>

          {p.stichpunkte && p.stichpunkte.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {p.stichpunkte.map((s) => (
                <li key={s} className="flex gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                    strokeWidth={2}
                  />
                  <span className="text-sm leading-relaxed text-fg-muted">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
              Website
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            {p.pdf && (
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                PDF in neuem Tab öffnen
              </a>
            )}
          </div>
        </div>

        {/* Speziell für Van Tatsch: PDF unten eingebettet, eigener Scroll */}
        {p.pdf && (
          <div
            ref={pdfRef}
            className="border-t border-border px-6 pb-6 pt-5 md:px-8"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.12em] text-fg-muted">
              Steckbrief als PDF
            </p>
            <div className="h-[60vh] w-full overflow-hidden rounded-lg border border-border bg-bg-soft sm:h-[520px]">
              <iframe
                src={p.pdf}
                title={`PDF ${p.name}`}
                className="h-full w-full"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body,
  );
}

function PartnerKarte({
  p,
  onOpen,
}: {
  p: Partner;
  onOpen: (scrollToPdf: boolean) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(false);
        }
      }}
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-border bg-bg p-6 text-left transition-colors hover:border-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <PartnerLogo src={p.logoSrc} alt={p.name} />

      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-fg-muted">
        {p.tagline}
      </p>
      <p className="mt-3 flex-1 text-base leading-relaxed text-fg-muted">
        {p.beschreibung}
      </p>

      {p.stichpunkte && p.stichpunkte.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {p.stichpunkte.map((s) => (
            <li key={s} className="flex gap-2.5">
              <Check
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                strokeWidth={2}
              />
              <span className="text-sm leading-relaxed text-fg-muted">{s}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
        >
          <Globe className="h-4 w-4" strokeWidth={1.5} />
          Website
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        {p.pdf && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} />
            PDF ansehen
          </button>
        )}
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-fg-muted transition-colors group-hover:text-fg">
        Mehr erfahren
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );
}

// Partner nach Schlüssel holen — die drei Steckbriefe leben jetzt einzeln in
// eigenen Benefits statt in einem 3-Karten-Grid.
function partnerByKey(key: string): Partner {
  const p = partner.find((x) => x.key === key);
  if (!p) throw new Error(`Partner "${key}" nicht gefunden`);
  return p;
}

// Einzelner Partner-Steckbrief inkl. eigenem Modal (Website-Link, „PDF ansehen“,
// „Mehr erfahren“). Hält seinen Öffnungszustand selbst.
function PartnerSteckbrief({ p }: { p: Partner }) {
  const [aktiv, setAktiv] = useState<{ scrollToPdf: boolean } | null>(null);

  return (
    <div className="max-w-2xl">
      <PartnerKarte p={p} onOpen={(scrollToPdf) => setAktiv({ scrollToPdf })} />
      {aktiv && (
        <PartnerModal
          p={p}
          scrollToPdf={aktiv.scrollToPdf}
          onClose={() => setAktiv(null)}
        />
      )}
    </div>
  );
}

// Monitoring-Video — lebt jetzt im Benefit „Digitalisierung & Monitoring“.
// Wird erst gerendert, wenn der Benefit geöffnet ist (Eltern-AnimatePresence),
// daher zieht es beim Laden der Seite keine Bandbreite. Einstellungen wie
// gehabt: autoPlay/loop/muted/playsInline, keine Controls.
function MonitoringVideo() {
  return (
    <div className="mt-10 pt-10 border-t border-border">
      <p className="text-xs uppercase tracking-[0.18em] text-fg-muted">
        Monitoring
      </p>
      <h4 className="font-serif text-xl md:text-2xl tracking-tight mt-1 mb-4">
        {video.titel}
      </h4>
      <p className="text-base leading-relaxed text-fg-muted mb-8 max-w-3xl">
        {video.beschreibung}
      </p>

      {/* Nahtlose, dauerhaft laufende Animation — kein klassischer Player.
          autoPlay/loop/muted/playsInline (muted ist Pflicht fürs Autoplay),
          keine Controls, kein Play-Overlay, kein Vollbild-Button.
          Quelle ist 480×528 (≈10:11, leicht hochformatig): object-contain +
          natives Seitenverhältnis zeigt das ganze Bild ohne Beschnitt, und die
          max-width = native Breite verhindert unscharfes Hochskalieren. */}
      <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-xl border border-border bg-fg">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={video.poster}
          style={{ aspectRatio: "480 / 528" }}
          className="w-full object-contain bg-fg"
        >
          <source src={video.src} type="video/mp4" />
          Ihr Browser unterstützt das Video-Element nicht.
        </video>
      </div>
    </div>
  );
}

/* ── Benefit 2 — Digitalisierung & Monitoring ───────────────────────────── */

function DigitalisierungMonitoring() {
  return (
    <BenefitCard
      index={2}
      kicker="Digitalisierung & Monitoring"
      titel="Digitalisierung & Monitoring"
      Icon={Network}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Moderne Web- und IT-Dienstleistungen sowie KI-Automatisierungen — und ein
        laufendes Monitoring, das den Betrieb der Anlage jederzeit transparent
        macht.
      </p>

      <PartnerSteckbrief p={partnerByKey("netnomic")} />

      <MonitoringVideo />
    </BenefitCard>
  );
}

/* ── Benefit 3 — Energieberatung ────────────────────────────────────────── */

function Energieberatung() {
  return (
    <BenefitCard
      index={3}
      kicker="Energieberatung"
      titel="Beratung für erneuerbare Energien"
      Icon={Leaf}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Spezialisierte Beratung für Photovoltaik, Energiegemeinschaften und
        Förderungen begleitet die Gemeinde von der Planung bis zur Abwicklung.
      </p>

      <PartnerSteckbrief p={partnerByKey("connesso")} />
    </BenefitCard>
  );
}

/* ── Benefit 4 — Energiegemeinschaft ────────────────────────────────────── */

function Energiegemeinschaft() {
  return (
    <BenefitCard
      index={4}
      kicker="Energiegemeinschaft"
      titel="Energiegemeinschaft"
      Icon={Users}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Über eine Energiegemeinschaft teilen die Gemeindestandorte ihren
        PV-Strom — die Plattform von connesso bündelt Errichtung, Abrechnung und
        Verwaltung in einer Anwendung.
      </p>

      <PartnerSteckbrief p={partnerByKey("connesso-community")} />
    </BenefitCard>
  );
}

/* ── Benefit 5 — The Human Touch in the Age of AI ───────────────────────── */

function HumanTouch() {
  return (
    <BenefitCard
      index={5}
      kicker="The Human Touch in the Age of AI"
      titel="KI-Kompetenz, menschenzentriert"
      Icon={Sparkles}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        KI-Enablement, Coaching und Trainings bauen Kompetenz, Resilienz und
        Mindset auf, um KI wirksam und menschenzentriert einzusetzen.
      </p>

      <PartnerSteckbrief p={partnerByKey("vantatsch")} />
    </BenefitCard>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function Benefits() {
  return (
    <SectionWrapper id="benefits">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
        Die Benefits für die Gemeinde
      </h2>
      <p className="text-fg-muted text-lg mb-16 max-w-2xl">
        Das Konzept bringt mehr als günstigen Strom: eine ertragsabhängige
        Finanzierung, Digitalisierung mit laufendem Monitoring, eine fundierte
        Energieberatung, eine gemeinsam nutzbare Energiegemeinschaft und
        KI-Kompetenz für die Gemeinde. Klicken Sie auf einen Benefit, um ihn ein-
        oder auszuklappen.
      </p>

      <div className="space-y-6 md:space-y-8">
        <Finanzierung />
        <DigitalisierungMonitoring />
        <Energieberatung />
        <Energiegemeinschaft />
        <HumanTouch />
      </div>
    </SectionWrapper>
  );
}
