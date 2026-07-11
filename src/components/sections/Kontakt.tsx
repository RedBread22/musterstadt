"use client";

import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { kontakt, kontaktPartner } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";

export function Kontakt() {
  return (
    <SectionWrapper id="kontakt" soft>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          Machen wir den Schritt gemeinsam
        </h2>
        <p className="text-lg text-fg-muted mb-12">
          Lassen Sie uns gemeinsam die Umsetzung planen.
        </p>

        {/* Ein gemeinsamer Block: kombiniertes Logo oben, darunter beide
            Kontakte (Desktop nebeneinander, Handy untereinander). */}
        <div className="rounded-xl border border-border bg-bg p-6 md:p-8 mb-12">
          <div className="mb-8">
            <Image
              src={kontakt.logoSrc}
              alt="Consulting Gassner & MHZ Beratung"
              width={640}
              height={240}
              className="w-[85%] max-w-[280px] md:max-w-[360px] h-auto mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-left">
            {/* LINKS — Christoph Gassner */}
            <div className="flex flex-col">
              <h3 className="font-serif text-2xl tracking-tight">
                {kontakt.ansprechpartner}
              </h3>
            <p className="text-sm uppercase tracking-[0.2em] text-fg-muted mt-1">
              {kontakt.unternehmen}
            </p>

            <p className="text-sm text-fg-muted leading-relaxed mt-4">
              {kontakt.beschreibung}
            </p>

            <div className="flex flex-col gap-3 mt-6 text-fg-muted">
              <a
                href={`tel:${kontakt.telefon}`}
                className="flex items-center gap-3 hover:text-fg transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontakt.telefon}
              </a>
              <a
                href={`mailto:${kontakt.email}`}
                className="flex items-center gap-3 hover:text-fg transition-colors break-all"
              >
                <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontakt.email}
              </a>
              <a
                href={`https://${kontakt.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-fg transition-colors break-all"
              >
                <Globe className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontakt.website}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <span>{kontakt.adresse}</span>
              </div>
            </div>
          </div>

            {/* RECHTS — Mario Hölzl, MHZ Beratung */}
            <div className="flex flex-col border-t border-border pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              <h3 className="font-serif text-2xl tracking-tight">
              {kontaktPartner.ansprechpartner}
            </h3>
            <a
              href={kontaktPartner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[0.2em] text-fg-muted mt-1 hover:text-fg transition-colors"
            >
              {kontaktPartner.unternehmen}
            </a>

            <p className="text-sm text-fg-muted leading-relaxed mt-4">
              {kontaktPartner.beschreibung}
            </p>

            <div className="flex flex-col gap-3 mt-6 text-fg-muted">
              <a
                href={`tel:${kontaktPartner.telefon}`}
                className="flex items-center gap-3 hover:text-fg transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontaktPartner.telefon}
              </a>
              <a
                href={`mailto:${kontaktPartner.email}`}
                className="flex items-center gap-3 hover:text-fg transition-colors break-all"
              >
                <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontaktPartner.email}
              </a>
              <a
                href={kontaktPartner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-fg transition-colors break-all"
              >
                <Globe className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {kontaktPartner.website}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <span>{kontaktPartner.adresse}</span>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={kontakt.terminBuchenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fg text-bg border-2 border-fg px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium cursor-pointer hover:bg-bg hover:text-fg transition-colors duration-200"
          >
            Termin vereinbaren
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
