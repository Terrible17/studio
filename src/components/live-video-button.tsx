
"use client";

import { Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveVideoButtonProps {
  isClicked: boolean;
  onClick: () => void;
}

export function LiveVideoButton({ isClicked, onClick }: LiveVideoButtonProps) {
  const colorClass = isClicked ? "text-green-500" : "text-red-500";
  const ringColorClass = isClicked ? "ring-green-500/30" : "ring-red-500/30";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center h-16 w-16 rounded-full bg-transparent transition-all",
        colorClass
      )}
      aria-label="Start video call"
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" style={{ animation: 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite' }}></span>
       <span className={cn("relative inline-flex rounded-full h-16 w-16 ring-4", ringColorClass)}>
         <Video className="h-8 w-8 m-auto" />
      </span>
    </button>
  );
}
