"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { links, navigation, restaurant } from "@/config/restaurant";
import { Logo } from "./ui/Logo";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#accueil");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  // Section active (pour aria-current et le soulignement doré).
  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Bloque le défilement et ferme avec Échap quand le menu mobile est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-luxe ${
        restaurant.previewMode ? "top-8 sm:top-7" : "top-0"
      } ${solid ? "bg-lagoon-deep/95 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)]" : "bg-transparent py-5 lg:py-7"} ${scrolled && !open ? "backdrop-blur-md" : ""}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#accueil" className="relative z-10 rounded-sm" aria-label="Mamia Lagoon — retour à l’accueil" onClick={() => setOpen(false)}>
          <Logo preload size={54} />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className="group relative py-2 text-[0.8rem] font-medium tracking-[0.12em] text-ivory/85 uppercase transition-colors hover:text-ivory aria-[current]:text-ivory"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sun transition-transform duration-500 ease-luxe group-hover:scale-x-100 group-aria-[current]:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#reservation" className="btn-gold hidden min-h-11 px-6 sm:inline-flex">
            Réserver une table
          </a>
          <button
            type="button"
            className="relative z-10 inline-flex size-12 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 top-0 flex h-dvh flex-col bg-lagoon-deep px-6 pt-28 pb-10 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Navigation mobile" className="flex-1">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-serif text-[2.1rem] text-ivory"
                    >
                      <span className="font-sans text-xs tracking-widest text-sun">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="grid gap-3">
              <a href="#reservation" onClick={() => setOpen(false)} className="btn-gold w-full">
                Réserver une table
              </a>
              <a href={links.tel} className="btn-ghost-light w-full">
                <Phone className="size-4" aria-hidden="true" /> Nous appeler
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
