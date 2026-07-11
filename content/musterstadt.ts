export const gemeinde = {
  name: "Stadtgemeinde Musterstadt",
  shortName: "Musterstadt",
  bundesland: "Musterland",
  bezirk: "Musterbezirk",
  staat: "Österreich",
  buergermeister: {
    name: "Max Mustermann",
    partei: "—",
  },
  logoSrc: "/images/logos/wappen-musterstadt.webp",
  accentColor: "#C9322B",
  accentWarm: "#F4A623",
} as const;

export const gemeindeFakten: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}[] = [
  {
    icon: "Map",
    label: "Region",
    value: "Musterregion",
    sub: "Stadtgemeinde in Österreich",
  },
  {
    icon: "Users",
    label: "Einwohner",
    value: "1.812",
    sub: "Stand 1. Jänner 2026",
  },
  {
    icon: "Maximize",
    label: "Fläche",
    value: "18,40 km²",
    sub: "58 % landwirtschaftlich, 28 % bewaldet",
  },
  {
    icon: "Landmark",
    label: "Gliederung",
    value: "6 Ortschaften",
    sub: "4 Katastralgemeinden",
  },
  {
    icon: "Vote",
    label: "Gemeinderat",
    value: "19 Mitglieder",
  },
];

export const vorOrtTermin = {
  datum: "16. Januar 2026",
  dauer: "1,5 Stunden",
  ort: "Gemeindeamt Musterstadt",
  anwesende: [
    { name: "Christoph Gassner", rolle: "Consulting Gassner" },
    { name: "N. N.", rolle: "Finanzierungspartner" },
    { name: "Max Mustermann", rolle: "Bürgermeister Stadtgemeinde Musterstadt" },
  ],
} as const;

export const aktuellerStand = {
  stromverbrauch_kWh: 250000,
  energiekosten_ct_kWh: 10.0,
  netzkosten_ct_kWh: 6.5,
  abgaben_ct_kWh: 2.5,
  stromkosten_ct_kWh: 19.0,
  gesamtkosten_eur: 47500,
  pv: {
    groesse_kWp: 60,
    leistung_kWh: 60000,
    eigennutzen_kWh: 42000,
    ueberschuss_eeg_kWh: 18000,
    eigennutzen_prozent: 70,
    ueberschuss_prozent: 30,
    sonnenstunden: 1000,
  },
} as const;

export const konzeptZiele = [
  "Optimierte Auslegung der Standorte",
  "Vernetzung aller Standorte über eine Energiegemeinschaft",
  "Maximierung des Eigenverbrauchs der erzeugten Energie",
  "Zusätzliche Erlöse durch Ladeinfrastruktur (E-Ladestationen)",
  "Erhöhung der Versorgungssicherheit durch Speicher- und Notstromlösung (Blackoutfähig)",
  "Senkung des Energieverbrauchs und der Energiekosten durch Effizienzmaßnahmen",
] as const;

export type Phase = 1 | 2 | 3 | 4;

export type Standort = {
  slug: string;
  name: string;
  phase: Phase;
  typ?: string;
  adresse?: string;
  module?: number;
  leistung_kWp?: number;
  speicher_kWh?: number;
  notstrom?: boolean;
  besonderheit?: string;
  beschreibung?: string;
  bildPlatzhalter?: string;
  bildSrc?: string;
  pdf?: string;
  // Standorte, die im Original eine technische Detail-PDF hatten: statt eines
  // echten Downloads rendert die Detailseite einen dezenten Hinweis, dass in
  // der finalen Version hier eine PDF steht.
  pdfHinweis?: boolean;
  // Reine Kennzahlen-Karte ohne Bild/PDF/Detailseite (z. B. ein Speichersystem
  // ohne eigene PV-Fläche).
  metaOnly?: boolean;
};

// Quelle der Wahrheit: Standort-Tabelle mit fiktiven Beispieldaten. kWp-Werte
// werden direkt übernommen (nicht aus der Modulzahl gerechnet — z. B. Posthaus
// mit 330-W-Modulen). Wirtschaftlichkeit bezieht sich auf Phase 1 (135 kWp),
// 4-Phasen-Struktur.
export const standorte: Standort[] = [
  // ── PHASE 1 — Sofortmaßnahmen / Grundstein der Energiewende ────────────
  {
    slug: "parkplatz-mittelschule",
    name: "Parkplatz Mittelschule",
    phase: 1,
    typ: "Carport",
    adresse: "Musterstraße 1",
    module: 120,
    leistung_kWp: 54.0,
    beschreibung:
      "Überdachung des Mittelschul-Parkplatzes als Carport-Konstruktion mit integrierter Photovoltaik. Doppelter Nutzen: Wetterschutz für die Fahrzeuge und Stromerzeugung über die Mittagsspitze. Mit zwei 22-kW-Ladepunkten direkt am Standort.",
    bildPlatzhalter: "Parkplatz Mittelschule – Carport mit PV",
    bildSrc: "/images/standorte/parkplatz-mittelschule.webp",
    pdfHinweis: true,
  },
  {
    slug: "mittelschule",
    name: "Mittelschule Musterstadt",
    phase: 1,
    typ: "Aufdach (Eternit)",
    adresse: "Musterstraße 2",
    module: 140,
    leistung_kWp: 63.0,
    speicher_kWh: 60,
    notstrom: true,
    beschreibung:
      "Aufdach-Anlage auf dem Eternitdach der Mittelschule inklusive Batteriespeicher und Notstromsystem. Die Schule wird damit blackoutfähig — kritischer Standort als möglicher Notunterstands-Punkt für die Gemeinde.",
    bildPlatzhalter: "Mittelschule – Aufdach-Anlage",
    bildSrc: "/images/standorte/mittelschule.webp",
    pdfHinweis: true,
  },
  {
    slug: "sportplatz",
    name: "Sportplatz Tribüne",
    phase: 1,
    typ: "Flachdach",
    adresse: "Musterstraße 3",
    module: 40,
    leistung_kWp: 18.0,
    speicher_kWh: 20,
    beschreibung:
      "Flachdach-Anlage auf der Sportplatz-Tribüne mit Batteriespeicher zur Lastverschiebung in die Abendstunden (Flutlichtbetrieb). Ergänzt um einen 22-kW-Ladepunkt.",
    bildPlatzhalter: "Sportplatz – Flachdach-PV",
    bildSrc: "/images/standorte/sportplatz-tribuene.webp",
    pdfHinweis: true,
  },
  {
    // Reine Speicher-/Notstromposition ohne eigene PV-Fläche — daher kein
    // Bild, kein PDF und keine eigene Detailseite (metaOnly).
    slug: "speichersystem-mittelschule",
    name: "Speichersystem inkl. Notstrom (Mittelschule)",
    phase: 1,
    speicher_kWh: 160,
    notstrom: true,
    metaOnly: true,
  },

  // ── PHASE 2 — Förder- und Entwicklungsprojekte ──────────────────────────
  {
    slug: "parkplatz-bahnhof",
    name: "Parkplatz Bahnhof",
    phase: 2,
    typ: "Carport",
    adresse: "Musterstraße 4",
    module: 200,
    leistung_kWp: 90.0,
    beschreibung:
      "Größter Einzelstandort des Konzepts. Carport-Anlage am Bahnhof-Parkplatz mit hohem Eigennutzungspotenzial durch die geplanten Ladestationen direkt am Standort.",
    bildPlatzhalter: "Parkplatz Bahnhof – Carport-PV",
    bildSrc: "/images/standorte/parkplatz-bahnhof.webp",
    pdfHinweis: true,
  },
  {
    slug: "parkplatz-ortszentrum",
    name: "Parkplatz Ortszentrum",
    phase: 2,
    typ: "Carport",
    adresse: "Musterstraße 5",
    module: 120,
    leistung_kWp: 54.0,
    beschreibung:
      "Carport-Anlage am Parkplatz im Ortszentrum mit Schnelllade-Infrastruktur (100 kW) und einem zusätzlichen 22-kW-Ladepunkt — hohe Sichtbarkeit und starkes Eigennutzungspotenzial.",
    bildPlatzhalter: "Parkplatz Ortszentrum – Carport-PV",
    bildSrc: "/images/standorte/parkplatz-ortszentrum.webp",
    pdfHinweis: true,
  },

  // ── PHASE 3 — Mittelfristige Ausbauprojekte (2027–2028) ─────────────────
  {
    slug: "kindergarten-nord",
    name: "Kindergarten Nord",
    phase: 3,
    typ: "Aufdach (Blechfalz)",
    adresse: "Musterstraße 6",
    module: 44,
    leistung_kWp: 19.8,
    speicher_kWh: 24,
    beschreibung:
      "PV-Anlage auf dem Blechfalzdach des Kindergartens Nord inklusive Batteriespeicher für eine hohe Eigenversorgung über den Tag.",
    bildPlatzhalter: "Kindergarten Nord – Aufdach",
    bildSrc: "/images/standorte/kindergarten-nord.webp",
    pdfHinweis: true,
  },
  {
    slug: "bauhof",
    name: "Bauhof",
    phase: 3,
    typ: "Flachdach (Kies)",
    adresse: "Musterstraße 7",
    module: 88,
    leistung_kWp: 39.6,
    speicher_kWh: 24,
    beschreibung:
      "Flachdach-Anlage (Kiesdach) auf dem Bauhof mit Batteriespeicher — deckt den Eigenbedarf der gemeindeeigenen Fahrzeuge und Geräte.",
    bildPlatzhalter: "Bauhof – Flachdach-PV",
    bildSrc: "/images/standorte/bauhof.webp",
    pdfHinweis: true,
  },
  {
    slug: "polizei",
    name: "Polizei",
    phase: 3,
    typ: "Bestand",
    adresse: "Musterstraße 8",
    speicher_kWh: 24,
    notstrom: true,
    besonderheit: "Bestand — nur Speicher & Notstrom",
    beschreibung:
      "Bestandsgebäude — Ergänzung um Batteriespeicher und Notstromsystem. Macht den Polizeistandort blackoutfähig, ohne neue PV-Fläche.",
    bildPlatzhalter: "Polizei – Speicher & Notstrom",
    bildSrc: "/images/standorte/polizei.webp",
  },

  // ── PHASE 4 — Langfristige Infrastrukturprojekte ────────────────────────
  {
    slug: "posthaus",
    name: "Posthaus",
    phase: 4,
    typ: "Indach",
    adresse: "Musterstraße 9",
    module: 40,
    leistung_kWp: 13.2,
    besonderheit: "Indachsystem (330-W-Module, gebäudeintegriert)",
    beschreibung:
      "Gebäudeintegriertes Indachsystem mit 330-W-Modulen — die Module ersetzen Teile der Dacheindeckung und fügen sich optisch in das Gebäudebild ein.",
    bildPlatzhalter: "Posthaus – Indachsystem",
    pdfHinweis: true,
  },
  {
    slug: "volksschule",
    name: "Volksschule",
    phase: 4,
  },
  {
    slug: "kindergarten-sued",
    name: "Kindergarten Süd",
    phase: 4,
  },
  {
    slug: "pve",
    name: "PVE",
    phase: 4,
  },
  {
    slug: "friedhof",
    name: "Friedhof",
    phase: 4,
  },
  {
    slug: "gemeindeamt",
    name: "Gemeindeamt Musterstadt",
    phase: 4,
  },
];

type PhaseMeta = {
  nummer: Phase;
  titel: string;
  zeitrahmen: string;
  anschaffungNetto_eur: number | null;
  summe: { module: number; leistung_kWp: number; speicher_kWh?: number } | null;
};

// Phasen-Metadaten inkl. Summen aus der Standort-Tabelle und Anschaffung
// netto je Phase (fiktive Beispieldaten). Klappverhalten: Phase 1 ist
// standardmäßig offen, Phase 2 & 3 klappbar/geschlossen, Phase 4 ist nicht
// klappbar (nur Überschrift, siehe Standorte.tsx).
export const phasen: PhaseMeta[] = [
  {
    nummer: 1,
    titel: "Phase 1 — Sofortmaßnahmen / Grundstein der Energiewende",
    zeitrahmen: "Sofortige Umsetzung",
    anschaffungNetto_eur: 320000,
    summe: { module: 300, leistung_kWp: 135.0, speicher_kWh: 240 },
  },
  {
    nummer: 2,
    titel: "Phase 2 — Förder- und Entwicklungsprojekte",
    zeitrahmen: "Betrachtung im Herbst · Umsetzung Q1–Q3 2027",
    anschaffungNetto_eur: 450000,
    summe: { module: 320, leistung_kWp: 144 },
  },
  {
    nummer: 3,
    titel: "Phase 3 — Mittelfristige Ausbauprojekte (2027–2028)",
    zeitrahmen: "Betrachtung nach Phase 1 & 2",
    anschaffungNetto_eur: 180000,
    summe: { module: 132, leistung_kWp: 59.4, speicher_kWh: 72 },
  },
  {
    nummer: 4,
    titel: "Phase 4 — Langfristige Infrastrukturprojekte",
    zeitrahmen: "Langfristig zu prüfende Standorte",
    anschaffungNetto_eur: null,
    summe: null,
  },
];

// Quelle der Wahrheit: fiktive Beispieldaten — gesamte Wirtschaftlichkeit
// bezogen auf Phase 1 = 135 kWp (sofort umsetzbar), NICHT auf einen
// Vollausbau.
export const ergebnis = {
  gesamtLeistung_kWp: 135.0,
  gesamtSpeicher_kWh: 240,
  pvNachher: {
    leistung_kWp: 135.0,
    leistung_kWh: 148500,
    sonnenstunden: 1100,
    // Eigennutzungsquote (Phase 1, 135 kWp), fiktive Beispielwerte:
    // Eigennutzen = direkte PV + Energiegemeinschaft/EEG ≈ 126.225 kWh;
    // Überschuss (Netzeinspeisung) ≈ 22.275 kWh → 85 % / 15 %.
    eigennutzen_prozent: 85,
    ueberschuss_prozent: 15,
  },
} as const;

export const wirtschaftlichkeit = {
  investitionskosten_eur: 320000,
  moeglicheFoerderung_eur: 64000,
  finanzierung_ct_kWh: 16.0,
  finanzierungskostenProJahr_eur: 23760,
  finanzierungsdauer_jahre: 13.5,
  einsparungProJahr_finanzierung_eur: 14200,
  einsparungProJahr_nachFinanzierung_eur: 37960,
  // Headline = Netto (nach Abzug der Zusatzkosten über 30 Jahre) — ehrlicher
  // als der Brutto-Wert. Brutto und Zusatzkosten werden sekundär ausgewiesen.
  gesamteinsparung_30Jahre_netto_eur: 628040,
  gesamteinsparung_30Jahre_brutto_eur: 818040,
  zusatzkosten_30Jahre_eur: 190000,
  // Aufgeschlüsselt nach Zeitraum (während/nach Finanzierung), je mit eigener
  // Postenliste und Zwischensumme.
  zusatzkostenAufschluesselung: [
    {
      phase: "Während Finanzierung (13,5 J)",
      summe_eur: 116000,
      posten: [
        { label: "Wartung", betrag_eur: 22000 },
        { label: "Komponententausch", betrag_eur: 20000 },
        { label: "Generalwartung", betrag_eur: 10000 },
        { label: "Restwert lt. Finanzierung", betrag_eur: 64000 },
      ],
    },
    {
      phase: "Nach Finanzierung (16,5 J)",
      summe_eur: 74000,
      posten: [
        { label: "Wartung", betrag_eur: 26000 },
        { label: "Komponententausch", betrag_eur: 38000 },
        { label: "Generalwartung", betrag_eur: 10000 },
      ],
    },
  ],
} as const;

// ── Benefits ──────────────────────────────────────────────────────────────
// Eigenständige Mehrwerte des Konzepts: Finanzierung (Kapazitätsleasing),
// Digitalisierung & Monitoring (NetNomic + Video-Visualisierung der Anlage),
// Energieberatung (connesso), Energiegemeinschaft (connesso communities) und
// The Human Touch in the Age of AI (Van Tatsch).

// BENEFIT 1 — Finanzierung über Kapazitätsleasing.
// Eckdaten aus einer beispielhaften Wirtschaftlichkeitsberechnung (Consulting
// Gassner) — Phase 1 = 135 kWp, sofort umsetzbar.
export const finanzierung = {
  stand: "01.04.2026",
  preisProKwh_ct: 16.0,
  laufzeit_jahre: 13.5,
  anschaffungswertNetto_eur: 320000,
  moeglicheFoerderung_eur: 64000,
  pvLeistung_kWp: 135.0,
  speicher_kWh: 240,
  vorteile: [
    {
      icon: "RefreshCw",
      text: "Flexible Rückzahlung anhand der tatsächlichen Stromproduktion zum Fixtarif",
    },
    {
      icon: "Receipt",
      text: "Steuerlich absetzbar — die variable Rate ist zur Gänze absetzbar",
    },
    {
      icon: "Coins",
      text: "Mit Förderungen kombinierbar",
    },
    {
      icon: "Activity",
      text: "Laufendes Monitoring der Anlage durch Datenanbindung",
    },
    {
      icon: "Wallet",
      text: "Schonung der Liquidität — Leasingrate pro kWh statt hoher Anschaffungskosten",
    },
    {
      icon: "Landmark",
      text: "Erhöht den Schuldenstand der Gemeinde nicht — reine Miete ohne Kaufverpflichtung; nur die laufenden Leasingzahlungen sind im Schuldennachweis anzuführen",
    },
  ],
  // Illustrativer Jahresverlauf für das Visual „Leasingrate folgt dem PV-Ertrag“.
  // Balken = PV-Ertrag (kWh), Linie = flexible Leasingrate (kWh × Fixpreis).
  monatsverlauf: [
    { monat: "Jän", ertrag_kWh: 11000 },
    { monat: "Feb", ertrag_kWh: 18000 },
    { monat: "Mär", ertrag_kWh: 29000 },
    { monat: "Apr", ertrag_kWh: 42000 },
    { monat: "Mai", ertrag_kWh: 49000 },
    { monat: "Jun", ertrag_kWh: 51000 },
    { monat: "Jul", ertrag_kWh: 52000 },
    { monat: "Aug", ertrag_kWh: 46000 },
    { monat: "Sep", ertrag_kWh: 34000 },
    { monat: "Okt", ertrag_kWh: 22000 },
    { monat: "Nov", ertrag_kWh: 13000 },
    { monat: "Dez", ertrag_kWh: 9000 },
  ],
} as const;

// BENEFIT 2 — Digitalisierung: Partnernetzwerk.
// Logos werden unter /images/partners/<key>.png ergänzt (optional, mit Fallback).
export const partner: {
  key: string;
  name: string;
  tagline: string;
  beschreibung: string;
  url: string;
  logoSrc: string;
  pdf?: string;
  stichpunkte?: string[];
}[] = [
  {
    key: "connesso",
    name: "connesso",
    tagline: "Beratung für erneuerbare Energien",
    beschreibung:
      "Beratung für Photovoltaik, Wind- und Wasserkraft sowie Biogas und Biomasse. connesso begleitet Energiegemeinschaften bei Gründung und Abwicklung und ist Spezialist für Förderungen (z. B. Erneuerbaren-Ausbau-Gesetz). „connesso“ ist italienisch für „verbunden“.",
    url: "https://www.connesso.at/",
    logoSrc: "/images/partners/connesso.png",
  },
  {
    // SEPARATER Eintrag — eigenes Logo (connesso-community.png), nicht das
    // connesso-Logo aus Benefit 3 (Energieberatung).
    key: "connesso-community",
    name: "connesso communities",
    tagline: "Software für Energiegemeinschaften",
    beschreibung:
      "Die Software-Lösung von connesso macht die gemeinsame Energienutzung einfach: Errichten, Abrechnen und Verwalten der Energiegemeinschaft in einer Anwendung. So behält die Gemeinde jederzeit den Überblick über Erzeugung, Verbrauch und Abrechnung — bei voller Transparenz.",
    url: "https://communities.connesso.at/",
    logoSrc: "/images/partners/connesso-community.png",
    stichpunkte: [
      "Überblick über Erzeugungs- und Verbrauchsmengen in Echtzeit",
      "Effiziente Verwaltung der Kundendaten für die Verrechnung",
      "Nachvollziehbarer Status der Abrechnungsdaten",
      "Übersichtlicher Status der Anmeldeprozesse neuer Teilnehmer",
      "Optional: Buchhaltung & steuerliche Betreuung sowie Abrechnungs-Service",
    ],
  },
  {
    key: "vantatsch",
    name: "Nadine Van Tatsch",
    tagline: "The Human Touch in the Age of AI",
    beschreibung:
      "KI-Enablement, Coaching und Trainings für Unternehmen, Führungskräfte und Professionals. Baut KI-Kompetenz, Resilienz und Mindset auf, um KI wirksam und menschenzentriert einzusetzen.",
    url: "https://www.vantatsch.com/",
    logoSrc: "/images/partners/vantatsch.png",
  },
  {
    key: "netnomic",
    name: "NetNomic",
    tagline: "Websites · KI-Automatisierungen · IT",
    beschreibung:
      "Moderne, schnelle und mobil-optimierte Websites sowie KI-Automatisierungen (n8n-Flows, Chatbots, Buchungssysteme, Kalender- und Mail-Flows). EU-Cloud-Hosting und IT-Dienstleistungen — lokale Betreuung für regionale Betriebe.",
    url: "https://netnomic.at/",
    logoSrc: "/images/partners/netnomic.png",
  },
];

// BENEFIT 3 — Video: Visualisierung einer PV-Anlage im Betrieb.
// MP4 wird unter /videos/<datei> abgelegt.
export const video = {
  src: "/videos/pv-anlage-betrieb.mp4",
  poster: undefined as string | undefined,
  titel: "Die Anlage im Betrieb",
  beschreibung:
    "Eine Visualisierung zeigt das Zusammenspiel von Erzeugung, Speicher und Verbrauch — so wie sich die Anlage im laufenden Betrieb überwachen lässt.",
} as const;

export const kontakt = {
  unternehmen: "Consulting Gassner",
  ansprechpartner: "Christoph Gassner",
  beschreibung:
    "Energieberatung für Gemeinden und Betriebe. Seit vielen Jahren in der Energiebranche — analysiert Energieverbräuche, deckt Einsparpotenziale auf und filtert passende Fördermöglichkeiten heraus. Erarbeitet wirtschaftlich optimale, förderfähige Energiekonzepte — von der Analyse über die wirtschaftliche Auslegung bis zur Umsetzungsplanung.",
  adresse: "Rödschitz 105, 8983 Bad Mitterndorf",
  land: "Austria",
  telefon: "+43 664 5325555",
  email: "office@consulting-gassner.at",
  website: "www.consulting-gassner.at",
  terminBuchenUrl: "https://www.consulting-gassner.at/blank-4",
  logoSrc: "/images/logos/Gassner-Hoelzl.jpeg",
} as const;

// Partner für die Umsetzung — Mario Hölzl, MHZ Beratung.
export const kontaktPartner = {
  unternehmen: "MHZ Beratung",
  ansprechpartner: "Mario Hölzl",
  beschreibung:
    "Projektbegleitung und Beratung für Betriebe und Kommunen — seit über 8 Jahren. Schwerpunkte: Photovoltaik, Straßenbeleuchtung, Innenbeleuchtung und Flutlicht. Unabhängige, produktneutrale und maßgeschneiderte Gesamtlösungen — inkl. Optimierung, Konzeptionierung und Förderbegleitung.",
  adresse: "Quellstrasse 16, 3243 St. Leonhard/Forst",
  land: "Austria",
  telefon: "+43 664 645 0303",
  email: "mhz-beratung@outlook.com",
  website: "www.mhz-beratung.at",
  websiteUrl: "https://www.mhz-beratung.at/",
} as const;
