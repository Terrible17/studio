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

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full p-4">
      <nav className="container mx-auto flex items-center justify-end">
        <div className="flex items-center space-x-1 rounded-full bg-background/50 p-1 backdrop-blur-sm">
          <Button variant="ghost" size="icon" className="text-accent hover:text-accent/90" aria-label="Premium">
            <PremiumIcon className="h-6 w-6" />
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
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
      </nav>
    </header>
  );
}
