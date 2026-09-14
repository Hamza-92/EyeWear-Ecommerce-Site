import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconProps = {
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5,
  viewBox: "0 0 24 24",
} as const;

export function SearchIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="10.75" cy="10.75" r="6.5" />
      <path d="m15.5 15.5 4.25 4.25" />
    </svg>
  );
}

export function AccountIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.25 20c.55-3.45 3.1-5.5 6.75-5.5s6.2 2.05 6.75 5.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20.1 5.9c-2-2-5.15-1.72-6.82.38L12 7.88l-1.28-1.6C9.05 4.18 5.9 3.9 3.9 5.9c-2.2 2.2-1.88 5.72.3 7.8L12 21l7.8-7.3c2.18-2.08 2.5-5.6.3-7.8Z" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5.25 8.25h13.5l-.8 11.5H6.05l-.8-11.5Z" />
      <path d="M9 9V6.75a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m7 9.5 5 5 5-5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </svg>
  );
}
