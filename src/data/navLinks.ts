import { Flame, Grid, HeartHandshake, Home } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass?: string;
}

// --- Navigation Configuration ---
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Catalog", href: "/catalog", icon: Grid },
  { label: "Discounts", href: "/catalog?filter=discounts", icon: Flame },
  {
    label: "Impact",
    href: "/impact",
    icon: HeartHandshake,
    iconClass: "text-emerald-500",
  },
];
