import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { NAV_LINKS } from "../data/navLinks";
import type { User } from "../types";
import { cn } from "../lib/utils";

interface HeaderProps {
  user?: User | null;
  cartCount?: number;
  currentPath?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function Header({
  user = null,
  cartCount = 0,
  currentPath = "/",
  searchValue = "",
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-center">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 ml-8 lg:ml-10 xl:ml-14 border-l border-slate-200 dark:border-slate-800 pl-8 lg:pl-10 xl:pl-14">
            {NAV_LINKS.map(({ label, href, icon: Icon, iconClass }) => {
              const isActive = currentPath === href;
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                    isActive
                      ? "bg-slate-950 dark:bg-amber-500 text-white dark:text-slate-950"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900",
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", iconClass)} />
                  {label}
                </a>
              );
            })}
          </nav>
        </div>

        <SearchBar value={searchValue} onChange={onSearchChange} />

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative p-2 rounded-xl border border-1 shadow-lg transition-colors flex items-center gap-2 px-3.5 shadow-xs cursor-pointer"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="pl-1 border-l border-slate-200 dark:border-slate-800">
                {/* <UserMenu user={user} /> */}
              </div>
            ) : (
              <Button
                size="sm"
                className="text-xs font-bold bg-slate-950 dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-400 px-4 py-2 rounded-xl shadow-xs cursor-pointer"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Subnav Bar */}
      <div className="flex lg:hidden items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-2.5 px-4 text-xs font-bold">
        {NAV_LINKS.map(({ label, href, icon: Icon, iconClass }) => {
          const isActive = currentPath === href;
          return (
            <a
              key={`mobile-${label}`}
              href={href}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isActive
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white",
              )}
            >
              <Icon className={cn("w-4 h-4", iconClass)} />
              {label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
