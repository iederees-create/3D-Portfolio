import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SapPage({
  children,
  crumb,
  wide = false,
}: {
  children: ReactNode;
  crumb: string;
  wide?: boolean;
}) {
  return (
    <main className={`px-4 sm:px-6 pb-24 pt-32 mx-auto ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <nav aria-label="Breadcrumb" className="no-print mb-8 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-300">Home</Link>
        <ChevronRight size={12} />
        <Link to="/sap-archive/" className="hover:text-slate-300">SAP archive</Link>
        {crumb !== 'SAP archive' && (
          <>
            <ChevronRight size={12} />
            <span className="text-slate-300">{crumb}</span>
          </>
        )}
      </nav>
      {children}
    </main>
  );
}
