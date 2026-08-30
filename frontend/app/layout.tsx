import type { Metadata } from "next";
import { Playfair_Display, Manrope, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModalProvider } from "@/components/ui/SearchModal";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Heritage Atlas — Explore India. Discover Its Stories.",
    template: "%s | Heritage Atlas",
  },
  description:
    "Heritage Atlas is an interactive digital platform for discovering India's cultural heritage through maps, stories, history, places, culture, and AI-powered exploration.",
  keywords: [
    "Indian heritage",
    "cultural heritage",
    "heritage atlas",
    "Indian monuments",
    "Indian crafts",
    "Indian history",
    "heritage discovery",
    "India interactive map",
    "AI heritage guide",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SearchModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SearchModalProvider>
      </body>
    </html>
  );
}
