import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <p className="text-white font-semibold text-base">{SITE.name}</p>
          <p>{SITE.address}</p>
          <p>
            <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
              {SITE.phone}
            </a>
            {" · "}
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
          </p>
        </div>
        <nav className="flex flex-col items-end gap-1">
          <Link href="/units" className="hover:text-white transition-colors">View Units</Link>
          <Link href="/neighborhood" className="hover:text-white transition-colors">Neighborhood</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <a href={SITE.furnishedFinderUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Furnished Finder
          </a>
        </nav>
      </div>
      <div className="border-t border-slate-800 text-center text-xs py-4 text-gray-600">
        &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
