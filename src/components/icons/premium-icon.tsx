import { Crown } from "lucide-react";
import type { LucideProps } from "lucide-react";

export function PremiumIcon(props: LucideProps) {
  return (
    <div className="relative">
      <Crown {...props} />
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
    </div>
  );
}
