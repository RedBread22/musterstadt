import { Hero } from "@/components/sections/Hero";
import { Gemeinde } from "@/components/sections/Gemeinde";
import { AktuellerStand } from "@/components/sections/AktuellerStand";
import { Konzept } from "@/components/sections/Konzept";
import { Standorte } from "@/components/sections/Standorte";
import { Ergebnis } from "@/components/sections/Ergebnis";
import { Benefits } from "@/components/sections/Benefits";
import { Kontakt } from "@/components/sections/Kontakt";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gemeinde />
      <AktuellerStand />
      <Konzept />
      <Standorte />
      <Ergebnis />
      <Benefits />
      <Kontakt />
    </main>
  );
}
