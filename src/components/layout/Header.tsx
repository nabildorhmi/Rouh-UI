import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoMain from "../../assets/logo/logo-main.svg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/agency", label: "Agency" },
  { to: "/podcast", label: "Podcast" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const bookMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isAgency = location.pathname === "/agency";
  const isPodcast = location.pathname === "/podcast";

  // Close the ambiguous-page dropdown on outside click.
  useEffect(() => {
    if (!bookMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (bookMenuRef.current && !bookMenuRef.current.contains(e.target as Node)) {
        setBookMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [bookMenuOpen]);

  const goToPlans = () => {
    setBookMenuOpen(false);
    setOpen(false);
    if (isAgency) {
      document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/agency", { state: { scrollTo: "plans" } });
    }
  };

  const goToPackages = () => {
    setBookMenuOpen(false);
    setOpen(false);
    if (isPodcast) {
      document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/podcast", { state: { scrollTo: "packages" } });
    }
  };

  const handleBookClick = () => {
    if (isAgency) return goToPlans();
    if (isPodcast) return goToPackages();
    setBookMenuOpen((v) => !v);
  };

  const bookLabel = isAgency ? "Book a Call" : isPodcast ? "Book a Session" : "Book Now";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold tracking-wide transition-colors ${
      isActive ? "text-orange" : "text-black hover:text-orange"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logoMain} alt="ROUH" className="h-10 w-auto" />
        </NavLink>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative" ref={bookMenuRef}>
            <button
              type="button"
              onClick={handleBookClick}
              aria-haspopup={!isAgency && !isPodcast ? "menu" : undefined}
              aria-expanded={!isAgency && !isPodcast ? bookMenuOpen : undefined}
              className="bg-gradient-brand text-black font-extrabold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(217,162,83,0.35)] cursor-pointer"
            >
              <span>{bookLabel} →</span>
            </button>

            {bookMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl border border-black/10 bg-white shadow-xl overflow-hidden"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={goToPlans}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-black/[0.03] transition-colors cursor-pointer"
                >
                  Book Agency Call →
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={goToPackages}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-black/[0.03] transition-colors border-t border-black/5 cursor-pointer"
                >
                  Book Podcast Session →
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center gap-1.5 h-10 w-10"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-6 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-black/5 px-4 py-4 flex flex-col gap-4 bg-white"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
