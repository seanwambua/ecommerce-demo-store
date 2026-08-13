interface LogoProps {
  href?: string;
  shortText?: string;
  brandName?: string;
}

export default function Logo({
  href = "/",
  shortText = "SF",
  brandName = "Store Front",
}: LogoProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 group text-left shrink-0"
    >
      <div className="w-10 h-10 rounded-sm bg-slate-950 dark:bg-amber-500 flex items-center justify-center text-white dark:text-slate-950 font-black shadow-xs group-hover:scale-105 transition-transform">
        <span className="text-xl tracking-tight font-sans">{shortText}</span>
      </div>
      <div>
        <span className="font-black text-xl text-slate-950 dark:text-white tracking-tight uppercase font-sans">
          {brandName}
        </span>
      </div>
    </a>
  );
}
