import Link from "next/link";
import { UNITS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Units",
  description: "Browse all three furnished loft 1-bedroom apartments at Beech Street Lofts in downtown Moses Lake, WA.",
};

export default function UnitsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="section-heading">Available Units</h1>
      <p className="section-sub">
        Three loft 1-bedrooms at 513 Beech St, Moses Lake. All mirror images —
        same layout, same amenities. Different availability dates and pricing noted below.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {UNITS.map((unit) => (
          <div key={unit.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* PLACEHOLDER: unit photo → public/images/{unit.slug}-hero.jpg */}
            <div className="h-56 bg-slate-200 flex items-center justify-center text-gray-400 text-sm">
              Photo — {unit.name}
            </div>
            <div className="p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-1">{unit.name}</h2>
              <p className="text-gray-500 text-sm mb-4">Loft 1-Bedroom · 1 Private Bath · All-Inclusive</p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Monthly Rent</span>
                  <span className="font-semibold text-amber-600">${unit.price.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilities + WiFi</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Stay</span>
                  <span className="font-semibold">30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Available</span>
                  <span className="font-semibold">{unit.available}</span>
                </div>
                {unit.deposit > 0 && (
                  <div className="flex justify-between">
                    <span>Refundable Deposit</span>
                    <span className="font-semibold">${unit.deposit}</span>
                  </div>
                )}
                {unit.cleaningFee > 0 && (
                  <div className="flex justify-between">
                    <span>Cleaning Fee</span>
                    <span className="font-semibold">${unit.cleaningFee}</span>
                  </div>
                )}
                {unit.depositNonRefundable > 0 && (
                  <div className="flex justify-between">
                    <span>Non-Refundable Deposit</span>
                    <span className="font-semibold">${unit.depositNonRefundable}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/units/${unit.slug}`} className="btn-primary text-center">
                  View Details
                </Link>
                <a href={unit.ffUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-center">
                  Book on Furnished Finder
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
