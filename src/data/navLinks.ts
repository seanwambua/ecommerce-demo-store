import { HeartHandshake, Home, ShoppingBasketIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass?: string;
}

// --- Navigation Configuration ---
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/catalog", icon: ShoppingBasketIcon },
  {
    label: "Social Impact",
    href: "/impact",
    icon: HeartHandshake,
    iconClass: "text-emerald-500",
  },
];
