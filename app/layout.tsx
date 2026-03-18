// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Exo_2 } from "next/font/google";
import Script from "next/script"; // ✅ FIX: added import
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

// ✅ UPDATED METADATA (Google verification added here)
export const metadata: Metadata = {
  title: "Lynx 3PL",
  description: "Warehousing, Fulfillment, and Logistics Services",
  verification: {
    google: "Z-Ge-CzQ6v76HCtVy6MPjdIATa33-u4eh8HCKV4j8ng",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${exo2.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XGPTMW1ZJJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XGPTMW1ZJJ');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        {children}
        <FloatingButton />
      </body>
    </html>
  );
}
