import { kontakt } from "../../../content/musterstadt";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-fg-muted">
          &copy; {new Date().getFullYear()} {kontakt.unternehmen}
        </p>
        <p className="text-xs text-fg-muted/60">
          Musterdarstellung mit fiktiven Beispieldaten – keine reale Gemeinde.
        </p>
        <p className="text-xs text-fg-muted/60">
          Website umgesetzt von{" "}
          <a
            href="https://netnomic.at"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg-muted transition-colors"
          >
            NetNomic
          </a>
        </p>
      </div>
    </footer>
  );
}
