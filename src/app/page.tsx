
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PremiumIcon } from "@/components/icons/premium-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/background_image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-accent hover:bg-transparent hover:text-accent/90"
          aria-label="Premium"
        >
          <PremiumIcon className="h-6 w-6" />
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="hover:bg-transparent"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Home</DropdownMenuItem>
            <DropdownMenuItem>Features</DropdownMenuItem>
            <DropdownMenuItem>Pricing</DropdownMenuItem>
            <DropdownMenuItem>About</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 text-center text-white pb-32">
        <div className="w-full max-w-xs">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className={`w-full border-2 transition-all bg-transparent hover:bg-white/10 ${
                  isConfirmed ? "border-green-500" : "border-primary"
                }`}
                style={
                  isConfirmed
                    ? { color: "hsl(120 100% 50%)" }
                    : { color: "hsl(var(--primary))" }
                }
              >
                Consent 18+
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 rounded-md border border-zinc-700 bg-black/50 p-6 text-left shadow-lg">
              <ScrollArea className="h-40 w-full rounded-md border border-zinc-600 p-4 mb-4">
                <p className="text-sm text-zinc-300">
                  I confirm that I am 18 years of age or older and legally
                  allowed to view adult content in my region. I understand that
                  this platform is for consenting adults only and may include
                  explicit material. I am entering of my own free will and give
                  my full consent to participate in adult interactions,
                  conversations, or live video chats. I understand that all
                  participants must be adults and that any form of
                  non-consensual, illegal, or exploitative behavior is strictly
                  prohibited. By continuing, I agree and consent to the above.
                </p>
              </ScrollArea>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isConfirmed}
                  onCheckedChange={() => setIsConfirmed(!isConfirmed)}
                  className="border-zinc-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm I am 18 or older.
                </Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
