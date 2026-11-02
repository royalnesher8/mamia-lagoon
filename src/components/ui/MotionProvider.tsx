"use client";

import { MotionConfig } from "motion/react";

/** Respecte automatiquement prefers-reduced-motion pour toutes les animations Motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
