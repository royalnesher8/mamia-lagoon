"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Fenêtre modale accessible basée sur <dialog> natif :
 * piège du focus, fermeture avec Échap et retour du focus gérés par le navigateur.
 */
export function Modal({ open, onClose, labelledBy, className = "", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        // Clic sur le fond (hors contenu) : fermeture.
        if (e.target === ref.current) onClose();
      }}
      className={`m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 text-inherit open:flex ${className}`}
    >
      {children}
    </dialog>
  );
}
