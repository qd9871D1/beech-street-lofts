"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UNITS, SITE } from "@/lib/constants";

function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedUnit = searchParams.get("unit") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    unit: preselectedUnit,
    moveIn: "",
    stayLength: "",
    source: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xwlpalnz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Form submission failed");
      // Fire GA4 lead conversion event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "contact",
          event_label: form.unit || "any",
          source: form.source || "unknown",
        });
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at " + SITE.email);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Got it — thanks!</h2>
        <p className="text-green-700">We typically respond within an hour. Check your email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit (if known)</label>
          <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500">
            <option value="">Any available</option>
            {UNITS.map((u) => (
              <option key={u.slug} value={u.name}>{u.name} — ${u.price}/mo (avail. {u.available})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desired Move-In Date</label>
          <input type="date" value={form.moveIn} onChange={(e) => setForm({ ...form, moveIn: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Length of Stay</label>
          <select value={form.stayLength} onChange={(e) => setForm({ ...form, stayLength: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500">
            <option value="">Select...</option>
            <option>30 days</option>
            <option>60 days</option>
            <option>90 days</option>
            <option>3-6 months</option>
            <option>6+ months</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">How did you find us?</label>
        <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500">
          <option value="">Select...</option>
          <option>Furnished Finder</option>
          <option>Google Search</option>
          <option>Insurance Adjuster</option>
          <option>Hospital / Employer Referral</option>
          <option>Word of Mouth</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Anything else we should know?"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
      </div>

      {!!error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" className="btn-primary w-full">Send Inquiry</button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="section-heading">Send an Inquiry</h1>
      <p className="section-sub">No commitment required. We typically respond within an hour.</p>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2">
          <Suspense fallback={<div className="text-gray-400 text-sm">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="space-y-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-slate-900 mb-1">Direct Contact</p>
            <p><a href={`tel:${SITE.phone}`} className="text-amber-600 hover:underline">{SITE.phone}</a></p>
            <p><a href={`mailto:${SITE.email}`} className="text-amber-600 hover:underline">{SITE.email}</a></p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-1">Location</p>
            <p>{SITE.address}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-1">Also on</p>
            <a href={SITE.furnishedFinderUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
              Furnished Finder
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
