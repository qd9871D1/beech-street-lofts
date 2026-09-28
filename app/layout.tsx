import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Downtown Moses Lake Monthly Rentals`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Fully furnished loft 1-bedroom apartments in downtown Moses Lake, WA. All-inclusive monthly rentals — rent, utilities, 1 gig WiFi included. Steps from restaurants, farmer's market, and parks.",
  metadataBase: new URL(SITE.url),
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
