// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Exo_2 } from "next/font/google";
import "./globals.css";
import FloatingButton from "../components/WhatsappIcon";

// Configurar Inter
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Configurar Exo 2
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lynx 3PL - Logistics Solutions",
  description: "Warehousing, Fulfillment, and Logistics Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${exo2.variable}`}>
      <body className={inter.className}>
        {/* Contenido de cada página */}
        {children}
        
        {/* FloatingButton estará en todas las páginas */}
        <FloatingButton />
      </body>
    </html>
  );
}