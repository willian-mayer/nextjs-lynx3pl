// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import FloatingButton from "./components/WhatsappIcon";

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
    <html lang="en">
      <body>
        {/* Contenido de cada página */}
        {children}
        
        {/* FloatingButton estará en todas las páginas */}
        <FloatingButton />
      </body>
    </html>
  );
}