interface LogoProps {
  href?: string;
  shortText?: string;
  brandName?: string;
}

export default function Logo({
  href = "/",
  shortText = "T.S-A",
  brandName = "Thrift Store Africa",
}: LogoProps) {
  return (
    <div>
      <a
        href={href}
        className="flex py-8 items-center justify-center gap-2.5 group text-left shrink-0 border-0 sticky-top"
      >
        <div className="min-w-10 min-h-10 rounded-none bg-black dark:bg-amber-500 flex items-center justify-center text-white dark:text-black font-black shadow-xs group-hover:scale-105 transition-transform">
          <span className="text-4lg tracking-tight font-sans px-4 py-2 ">
            {shortText}
          </span>
        </div>
        <div>
          <span className="font-black text-3xl text-black dark:text-white tracking-tight uppercase font-sans font-normal font-bold">
            {brandName}
          </span>
        </div>
      </a>
    </div>
  );
}
