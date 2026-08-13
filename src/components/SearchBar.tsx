import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-4 lg:mx-8 relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-950 dark:focus:border-amber-500 transition-all font-sans"
      />
    </div>
  );
}