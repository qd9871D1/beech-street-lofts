import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";

const GA_ID = "G-E7RXQZFD6C";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Furnished Loft Apartments | Moses Lake, WA`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Furnished loft 1-bedroom apartments in downtown Moses Lake, WA. All-inclusive monthly rentals — rent, utilities, 1 gig WiFi included. Ideal for travel nurses, corporate housing, and insurance relocation. 30-day minimum.",
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
      <head>
        {/* GA4 */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
