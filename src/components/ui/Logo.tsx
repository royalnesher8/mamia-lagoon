import Image from "next/image";
import logo from "@/assets/logo-mamia-lagoon.webp";

type LogoProps = {
  tone?: "light" | "dark";
  /** Hauteur du badge en pixels. */
  size?: number;
  /** Affiche le nom en toutes lettres à côté du badge (lisibilité aux petites tailles). */
  wordmark?: boolean;
  className?: string;
  /** Précharge l'image (logo du header, visible dès l'arrivée). */
  preload?: boolean;
};

/** Logo officiel de Mamia Lagoon (badge rond), avec nom typographique optionnel. */
export function Logo({ tone = "light", size = 52, wordmark = true, className = "", preload = false }: LogoProps) {
  const color = tone === "light" ? "text-ivory" : "text-lagoon";
  const width = Math.round((size * logo.width) / logo.height);
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <Image
        src={logo}
        alt={wordmark ? "" : "Mamia Lagoon"}
        width={width}
        height={size}
        preload={preload}
        sizes={`${width}px`}
        className="shrink-0 drop-shadow-[0_4px_14px_rgb(0_0_0/0.25)]"
        style={{ height: size, width: "auto" }}
      />
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.45rem] font-semibold tracking-[0.18em]">MAMIA</span>
          <span className="mt-1 font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-champagne">LAGOON</span>
        </span>
      )}
    </span>
  );
}
