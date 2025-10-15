import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PremiumIcon } from "@/components/icons/premium-icon";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/background_image.jpg')" }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Icons positioned at the top right */}
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
            <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-transparent">
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

      {/* Wrap content in a relative container to ensure it appears above the overlay */}
      <div className="relative z-10 flex flex-1 flex-col">
        <main className="flex-1 flex flex-col items-center justify-center text-center text-white p-4">
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 ease-out">
            
          </div>
        </main>
      </div>
    </div>
  );
}
