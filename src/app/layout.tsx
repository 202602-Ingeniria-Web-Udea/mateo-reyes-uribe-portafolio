import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mateo Reyes Uribe — Backend Developer",
  description:
    "Systems Engineering student at Universidad de Antioquia building backend services with Java, Spring Boot and PostgreSQL. Open to internships for 2027-1.",
};

// Tiñe la barra del navegador móvil del mismo negro que el fondo.
export const viewport: Viewport = {
  themeColor: "#07080F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
