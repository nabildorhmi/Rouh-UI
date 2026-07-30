import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CrossSellBannerProps {
  to: string;
  children: ReactNode;
}

export function CrossSellBanner({ to, children }: CrossSellBannerProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 border-t border-black/5 text-center">
      <Link to={to} className="inline-flex items-center gap-2 font-bold text-orange hover:gap-3 transition-all">
        {children}
      </Link>
    </div>
  );
}
