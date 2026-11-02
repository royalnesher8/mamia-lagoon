/** Logotype provisoire (typographique) — à remplacer par le logo officiel s'il existe. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const color = tone === "light" ? "text-ivory" : "text-lagoon";
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <path
          d="M8 21c2.4-2 4.8-2 7.2 0s4.8 2 7.2 0 4.8-2 7.2 0M10 26c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"
          fill="none"
          stroke="#C5A46D"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path d="M20 9.5c-2.6 2.4-3.4 5.2-2.3 8.2M20 9.5c2.6 2.4 3.4 5.2 2.3 8.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-semibold tracking-[0.18em]">MAMIA</span>
        <span className="mt-1 font-sans text-[0.58rem] font-semibold tracking-[0.55em] text-champagne">LAGOON</span>
      </span>
    </span>
  );
}
