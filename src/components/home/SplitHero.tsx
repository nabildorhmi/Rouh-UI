import { Link } from "react-router-dom";
import agencyHero from "../../assets/hero/agency-hero.webp";
import podcastHero from "../../assets/hero/podcast-hero.webp";

function RouhBirdMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="150 100 420 300" className={className}>
      <path
        d="M334.446,271.039C336.027,270.816 362.287,268.433 389.226,252.037C402.47,243.977 416.622,230.458 419.07,227.157C424.554,219.764 435.197,209.369 429.42,207.972C386.798,197.663 391.773,153.575 412.556,134.563C433.284,115.601 452.285,151.559 455.621,171.484C457.327,181.679 446.634,206.758 442.147,215.317C416.757,263.75 381.468,278.639 374.713,281.937C341.172,298.312 299.593,296.447 287.449,294.873C248.203,289.788 235.905,276.035 226.647,265.364C216.73,253.934 212.731,230.573 213.575,229.541C215.862,226.744 213.714,233.165 225.688,245.321C248.796,268.781 297.001,275.733 334.446,271.039Z"
        fill="currentColor"
      />
      <path
        d="M229.518,276.674L230.477,276.515C232.219,283.198 232.475,291.013 243.975,304.088C273.094,337.193 376.24,335.826 447.427,252.433C460.325,237.324 467.766,220.717 488.339,208.239C491.337,206.421 510.049,195.071 530.507,196.301C535.151,196.58 537.849,196.021 536.108,200.358C535.4,202.121 528.427,219.49 527.114,222.333C525.794,225.195 523.539,222.821 522.55,222.407C495.658,211.141 480.283,223.426 462.021,250.103C417.9,314.553 390.454,326.734 375.359,334.234C344.367,349.632 306,349.589 283.603,345.066C222.072,332.639 228.382,275.94 228.985,275.972C229.278,275.988 229.224,276.658 229.518,276.674Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SplitHero() {
  return (
    <div className="split-hero">
      <Link to="/agency" className="split-half agency">
        <div className="split-media">
          <img src={agencyHero} alt="" />
          <div className="split-overlay agency" />
          <span className="split-badge">ROUH Agency</span>
        </div>
        <div className="split-content">
          <span className="eyebrow text-gold">Brand &amp; Marketing</span>
          <h2>
            Brands, built
            <br />
            with intent.
          </h2>
          <p>
            Strategy, content, and growth for brands that want to move with purpose — a full creative team, not just another vendor.
          </p>
          <span className="split-cta">Explore the Agency →</span>
        </div>
      </Link>

      <RouhBirdMark className="split-mark" />

      <Link to="/podcast" className="split-half podcast">
        <div className="split-media">
          <img src={podcastHero} alt="" />
          <div className="split-overlay podcast" />
          <span className="split-badge">ROUH Studio</span>
        </div>
        <div className="split-content podcast-content">
          <span className="eyebrow text-orange">Podcast Studio Rental</span>
          <h2>
            Rent the studio.
            <br />
            Record your show.
          </h2>
          <p>
            Book the room, the mics, and the crew — everything you need to produce your own podcast, on your terms.
          </p>
          <span className="split-cta podcast-cta">Explore the Studio →</span>
        </div>
      </Link>
    </div>
  );
}
