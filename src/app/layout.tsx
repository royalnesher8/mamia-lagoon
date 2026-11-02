import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { restaurant } from "@/config/restaurant";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = "Mamia Lagoon | Restaurant gastronomique à Grand-Bassam";
const description =
  "Découvrez Mamia Lagoon à Grand-Bassam : cuisine savoureuse, cadre raffiné et moments privilégiés au bord de la lagune.";

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.siteUrl),
  title: { default: title, template: "%s | Mamia Lagoon" },
  description,
  applicationName: restaurant.name,
  keywords: [
    "Mamia Lagoon",
    "restaurant Grand-Bassam",
    "restaurant bord de lagune",
    "restaurant gastronomique Côte d'Ivoire",
    "cuisine ivoirienne",
    "dîner romantique Grand-Bassam",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "/",
    siteName: restaurant.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#072F55",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
