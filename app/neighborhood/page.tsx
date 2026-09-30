import Link from "next/link";
import Image from "next/image";
import { RESTAURANTS, ATTRACTIONS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighborhood",
  description: "Beech Street Lofts sits two blocks from downtown Moses Lake. Restaurants, farmer's market, parks, and entertainment all within walking distance.",
};

const DISTANCES = [
  { place: "Samaritan Healthcare", detail: "~8 min drive" },
  { place: "Downtown core", detail: "2 blocks" },
  { place: "Farmer's Market", detail: "Next door" },
  { place: "Grant County Airport", detail: "~10 min drive" },
  { place: "Columbia Basin College", detail: "~7 min drive" },
  { place: "Walmart / Shopping", detail: "~5 min drive" },
  { place: "I-90 on-ramp", detail: "~5 min drive" },
];

export default function NeighborhoodPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Neighborhood photo strip */}
      <div className="grid grid-cols-3 gap-3 mb-10 -mx-4 md:mx-0">
        {[
          { src: "/images/neighborhood-aerial-lake.jpeg", alt: "Aerial lake view" },
          { src: "/images/unit-01-exterior.jpeg", alt: "Beech Street exterior" },
          { src: "/images/neighborhood-exterior-2.jpeg", alt: "Neighborhood exterior" },
        ].map((img) => (
          <div key={img.src} className="relative h-48 overflow-hidden rounded-lg">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      <h1 className="section-heading">The Neighborhood</h1>
      <p className="section-sub">
        Two blocks from Moses Lake&apos;s downtown core. The Farmer&apos;s Market is next door.
        Over 20 restaurants within walking distance. This isn&apos;t a suburb — it&apos;s the center of things.
      </p>

      {/* Map + distance callouts */}
      <section className="mb-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-xl overflow-hidden shadow-md h-80">
          <iframe
            title="Beech Street Lofts location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-119.2930%2C47.1240%2C-119.2636%2C47.1362&layer=mapnik&marker=47.1301%2C-119.2783"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Getting Around</h2>
          <ul className="space-y-4">
            {DISTANCES.map((item) => (
              <li key={item.place} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-slate-700 font-medium">{item.place}</span>
                <span className="text-amber-600 font-semibold text-sm">{item.detail}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://maps.google.com/?q=503+S+Beech+St,+Moses+Lake,+WA+98837"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm text-amber-600 font-semibold hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>

      {/* Restaurants */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Nearby Restaurants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RESTAURANTS.map((r) => (
            <div key={r} className="bg-gray-50 rounded px-4 py-3 text-sm text-slate-700 font-medium">
              {r}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">And many more — check Yelp for a full list.</p>
      </section>

      {/* Attractions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Points of Interest</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {ATTRACTIONS.map((a) => (
            <div key={a.name} className="flex items-center justify-between border border-gray-200 rounded-lg px-5 py-4">
              <span className="font-medium text-slate-800">{a.name}</span>
              <span className="text-sm text-amber-600 font-semibold">{a.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Arts District */}
      <section className="bg-slate-900 text-white rounded-xl p-10 mb-16">
        <h2 className="text-2xl font-bold mb-4">Moses Lake&apos;s Creative Arts District</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Beech Street Lofts sits in Moses Lake&apos;s Creative Arts District — the cultural
          heart of the city. Street-level shops, galleries, restaurants, and community events
          give this neighborhood a character you won&apos;t find in a generic apartment complex
          on the outskirts of town.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Whether you&apos;re here for a 30-day work assignment or a 90-day relocation,
          you&apos;ll actually enjoy where you live — not just endure it.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Call This Home?</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/units" className="btn-primary">View Available Units</Link>
          <Link href="/contact" className="btn-outline">Send an Inquiry</Link>
        </div>
      </div>
    </div>
  );
}
