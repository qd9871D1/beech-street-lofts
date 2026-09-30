import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UNITS, AMENITIES, SITE } from "@/lib/constants";
import { Wifi, Tv, UtensilsCrossed, Coffee, Car, Wind, Package, Archive, Laptop, ShieldCheck, Moon, WashingMachine } from "lucide-react";
import type { Metadata } from "next";

const iconMap: Record<string, React.ElementType> = {
  Wifi, Tv, UtensilsCrossed, Coffee, Car, Wind, Package, Archive, Laptop, ShieldCheck, Moon, WashingMachine,
};

export async function generateStaticParams() {
  return UNITS.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) return {};
  return {
    title: `${unit.title} | Furnished Loft Moses Lake, WA`,
    description: `Furnished loft 1-bedroom in downtown Moses Lake, WA. ${unit.name} — $${unit.price}/mo all-inclusive (rent, utilities, 1 gig WiFi). Travel nurse and corporate housing welcome. Available ${unit.available}.`,
  };
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) notFound();

  const otherUnits = UNITS.filter((u) => u.slug !== slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Back */}
      <Link href="/units" className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-8 inline-block">
        &larr; All Units
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Photos */}
        <div>
          <div className="relative h-80 rounded-lg overflow-hidden mb-2">
            <Image
              src="/images/unit-23-loft-overview.jpeg"
              alt="Loft overview"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: "/images/unit-13-kitchen.jpeg", alt: "Kitchen" },
              { src: "/images/unit-19-bedroom.jpeg", alt: "Bedroom" },
              { src: "/images/unit-12-living-tv.jpeg", alt: "Living area" },
            ].map((img) => (
              <div key={img.src} className="relative h-24 rounded overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{unit.name}</h1>
          <p className="text-gray-500 mb-4">Loft 1-Bedroom · 1 Private Bath · Downtown Moses Lake</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
            <p className="text-3xl font-bold text-amber-600 mb-1">${unit.price.toLocaleString()}<span className="text-base font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-600">Rent + all utilities + 1 gig WiFi. No booking fees.</p>
            <p className="text-sm font-semibold text-green-700 mt-2">Available: {unit.available}</p>
          </div>

          <div className="space-y-2 text-sm text-gray-700 mb-6 border-t pt-4">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span>Minimum Stay</span><span className="font-medium">30 Days</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span>Max Occupancy</span><span className="font-medium">1</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span>Max Vehicles</span><span className="font-medium">1</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span>Pets</span><span className="font-medium text-red-500">Not Allowed</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span>Smoking</span><span className="font-medium text-red-500">Not Allowed</span>
            </div>
            {unit.deposit > 0 && (
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Refundable Deposit</span><span className="font-medium">${unit.deposit}</span>
              </div>
            )}
            {unit.cleaningFee > 0 && (
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Cleaning Fee</span><span className="font-medium">${unit.cleaningFee}</span>
              </div>
            )}
            {unit.depositNonRefundable > 0 && (
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Non-Refundable Deposit</span><span className="font-medium">${unit.depositNonRefundable}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Link href={`/contact?unit=${unit.name}`} className="btn-primary text-center">
              Send Inquiry
            </Link>
            <a href={unit.ffUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-center">
              Book on Furnished Finder
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Unit</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Furnished loft 1-bedroom apartment in the heart of downtown Moses Lake. One flat monthly
          payment covers rent, all utilities, and 1 gig WiFi — no surprise bills, no booking fees.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Steps from some of Moses Lake&apos;s best restaurants — Michaels Bistro, Pho Saigon,
          Shitake Sizzle, Tsunami Sushi, Red Door Cafe, and a dozen more. The Farmer&apos;s Market
          is literally next door. McCosh Park, the Centennial Amphitheater, and the Japanese Peace
          Garden are all within a few blocks.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Short drive to Samaritan Healthcare&apos;s new hospital on Clover Drive — ideal for
          traveling healthcare workers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The loft is fully furnished and move-in ready. Comfortable living area with SmartTV
          (log into your own streaming apps), fold-out coffee table laptop workspace, and
          room-darkening shades. Full kitchenette with range, oven, microwave, dishwasher,
          full-size fridge, and complete cookware. Keurig included. Starter pack provided on
          arrival. Dedicated parking directly outside your unit.
        </p>
      </div>

      {/* Amenities */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AMENITIES.map((a) => {
            const Icon = iconMap[a.icon];
            return (
              <div key={a.label} className="flex items-center gap-2 text-sm text-gray-700">
                {!!Icon && <Icon className="text-amber-500 flex-shrink-0" size={16} />}
                <span>{a.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other units */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Available Units</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {otherUnits.map((u) => (
            <div key={u.slug} className="border border-gray-200 rounded-lg p-5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-900">{u.name}</p>
                <p className="text-amber-600 font-bold">${u.price.toLocaleString()}/mo</p>
                <p className="text-sm text-gray-500">Available: {u.available}</p>
              </div>
              <Link href={`/units/${u.slug}`} className="btn-outline text-sm py-2 px-4">
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
