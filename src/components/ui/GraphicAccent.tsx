import element1 from "../../assets/graphic-elements/element-1.svg";
import element2 from "../../assets/graphic-elements/element-2.svg";
import element3 from "../../assets/graphic-elements/element-3.svg";
import element4 from "../../assets/graphic-elements/element-4.svg";

const elements = [element1, element2, element3, element4];

interface GraphicAccentProps {
  /** Which of the 4 brand stroke elements to render (1-4). */
  variant: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * Purely decorative brand stroke — one of the 4 disassembled calligraphic
 * elements from the ROUH logo. Never used as a literal icon.
 */
export function GraphicAccent({ variant, className = "" }: GraphicAccentProps) {
  return (
    <img
      src={elements[variant - 1]}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
