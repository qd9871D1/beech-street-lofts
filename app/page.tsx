import Link from "next/link";
import { UNITS, AMENITIES, SITE } from "@/lib/constants";
import { Wifi, Tv, UtensilsCrossed, Coffee, Car, Wind, Package, Archive, Laptop, ShieldCheck, Moon, WashingMachine } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wifi, Tv, UtensilsCrossed, Coffee, Car, Wind, Package, Archive, Laptop, ShieldCheck, Moon, WashingMachine,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">
            Downtown Moses Lake, WA
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Live Downtown.<br />Work. Explore. Unwind.
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Fully furnished loft apartments in the heart of Moses Lake. One flat monthly
            payment covers rent, utilities, and 1 gig WiFi. No booking fees. No surprises.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/units" className="btn-primary">View Available Units</Link>
            <Link href="/neighborhood" className="btn-outline">Explore the Neighborhood</Link>
          </div>
        </div>
      </section>

      {/* Bar */}
      <section className="bg-amber-500 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold">
          <span>30-Day Minimum Stay</span>
          <span>All Utilities Included</span>
          <span>1 Gig WiFi</span>
          <span>Steps from 20+ Restaurants</span>
          <span>No Booking Fees</span>
        </div>
      </section>

      {/* Units preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center">Available Units</h2>
          <p className="section-sub text-center">
            Three loft 1-bedrooms. All mirror images — same layout, same amenities, same quality.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {UNITS.map((unit) => (
              <div key={unit.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* PLACEHOLDER: unit photo → public/images/{slug}-hero.jpg */}
                <div className="h-48 bg-slate-200 flex items-center justify-center text-gray-400 text-sm">
                  Photo — {unit.name}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900">{unit.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">Loft 1-Bedroom · 1 Bath · All-Inclusive</p>
                  <p className="text-2xl font-bold text-amber-600">
                    ${unit.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-4">Available: {unit.available}</p>
                  <div className="flex gap-2">
                    <Link href={`/units/${unit.slug}`} className="btn-primary text-sm flex-1 text-center py-2 px-3">
                      Details
                    </Link>
                    <a href={unit.ffUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm flex-1 text-center py-2 px-3">
                      Book on FF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center">Everything Included</h2>
          <p className="section-sub text-center">Move in Monday. Be comfortable by Tuesday.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AMENITIES.map((a) => {
              const Icon = iconMap[a.icon];
              return (
                <div key={a.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  {!!Icon && <Icon className="text-amber-500 flex-shrink-0" size={20} />}
                  <span className="text-sm text-slate-700 font-medium">{a.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location teaser */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Two Blocks from Everything</h2>
          <p className="text-gray-300 text-lg mb-8">
            The Farmer&apos;s Market is next door. Over 20 restaurants within walking distance.
            McCosh Park, the Centennial Amphitheater, and the Japanese Peace Garden are steps away.
            This isn&apos;t a generic furnished apartment — it&apos;s a place with character.
          </p>
          <Link href="/neighborhood" className="btn-primary">See the Neighborhood</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Book?</h2>
          <p className="text-gray-600 mb-8">
            Send us a quick inquiry — no commitment required. We typically respond within an hour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Send an Inquiry</Link>
            <a href={SITE.furnishedFinderUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              View on Furnished Finder
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
