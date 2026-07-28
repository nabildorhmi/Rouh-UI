import { Link } from "react-router-dom";
import logoWhite from "../../assets/logo/logo-white.svg";

// Placeholder social links — replace with real profiles.
const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/rouh" },
  { label: "LinkedIn", href: "https://linkedin.com/company/rouh" },
  { label: "YouTube", href: "https://youtube.com/@rouh" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <img src={logoWhite} alt="ROUH" className="h-9 w-auto" />
          <p className="text-sm text-white/60 max-w-xs">
            One brand, two activities: a creative agency and an original podcast.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
            Explore
          </span>
          <Link to="/agency" className="text-sm text-white/80 hover:text-orange w-fit">
            Agency
          </Link>
          <Link to="/podcast" className="text-sm text-white/80 hover:text-orange w-fit">
            Podcast
          </Link>
          <Link to="/contact" className="text-sm text-white/80 hover:text-orange w-fit">
            Contact
          </Link>
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
            Follow
          </span>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:text-orange w-fit"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} ROUH. All rights reserved.
      </div>
    </footer>
  );
}
