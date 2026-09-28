import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Nav() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-white hover:text-amber-400 transition-colors">
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/units" className="text-gray-300 hover:text-white transition-colors">
            Units
          </Link>
          <Link href="/neighborhood" className="text-gray-300 hover:text-white transition-colors">
            Neighborhood
          </Link>
          <Link href="/contact" className="btn-primary text-sm px-4 py-2">
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
