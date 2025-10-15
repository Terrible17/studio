
"use client";

import { useState, useEffect } from "react";
import { Menu, Mars, Venus, Users, X, Video } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { PremiumIcon } from "@/components/icons/premium-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { LiveVideoButton } from "@/components/live-video-button";

type Gender = "Male" | "Female" | "Couple";

const genderConfig = {
  Male: {
    icon: <Mars className="h-4 w-4" />,
    color: "#3b82f6", // blue-500
  },
  Female: {
    icon: <Venus className="h-4 w-4" />,
    color: "#ec4899", // pink-500
  },
  Couple: {
    icon: <Users className="h-4 w-4" />,
    color: "#ef4444", // red-500
  },
};

const topics = [
  "Roleplay",
  "Cosplay",
  "BDSM",
  "Threesome",
  "Swinging",
  "Exhibitionism",
  "Voyeurism",
  "Dominance & Submission",
  "Tantric",
  "Fetish",
  "Group Fun",
  "Exploring Fantasies",
  "Intimate Massage",
  "Edging",
  "Spanking",
];

export default function Home() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [videoClicked, setVideoClicked] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      
      const date = now.toLocaleDateString('en-GB', dateOptions).replace(/(\d+) (\w+) (\d+)/, '$1 $2 $3');
      const time = now.toLocaleTimeString('en-US', timeOptions);

      setDateTime(`Date: ${date} / Time: ${time}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleCustomTopic = (inputValue: string) => {
    const newTopic = inputValue.trim();
    if (newTopic && !topics.includes(newTopic) && !selectedTopics.includes(newTopic) && selectedTopics.length < 5) {
        setSelectedTopics([...selectedTopics, newTopic]);
    }
  };

  const handleVideoClick = () => {
    setVideoClicked(true);
    // Wait for the color change to be visible before redirecting
    setTimeout(() => {
      router.push('/video');
    }, 300);
  };

  const buttonStyle = selectedGender
    ? {
        borderColor: genderConfig[selectedGender].color,
        color: genderConfig[selectedGender].color,
      }
    : {
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      };

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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 text-center text-white">
        <div className="w-56 mt-32">
          <h2 className="text-lg font-medium text-white/90 mb-3">
            Confirm consent to proceed
          </h2>
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
          <p className="text-xs text-white/70 mt-4">
            {dateTime}
          </p>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-white/10"
                  style={buttonStyle}
                >
                  {selectedGender ? (
                    <>
                      {genderConfig[selectedGender].icon}
                      <span className="ml-2">{selectedGender}</span>
                    </>
                  ) : (
                    "Gender"
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onSelect={() => setSelectedGender("Male")} style={{ color: genderConfig.Male.color }}>
                  {genderConfig.Male.icon}
                  <span>Male</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedGender("Female")} style={{ color: genderConfig.Female.color }}>
                  {genderConfig.Female.icon}
                  <span>Female</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedGender("Couple")} style={{ color: genderConfig.Couple.color }}>
                  {genderConfig.Couple.icon}
                  <span>Couple</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-white/80 mt-6 mb-2">
            Pleasurable Needs (Optional)
          </p>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="w-full justify-center bg-transparent hover:bg-white/10 border-white text-white"
              >
                {selectedTopics.length > 0 ? "Selected" : "Choose up to 5"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
              <Command>
                <CommandInput placeholder="Search or add topic..." onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleCustomTopic(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}/>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-48">
                      {topics.map((topic) => (
                        <CommandItem
                          key={topic}
                          onSelect={() => handleTopicSelect(topic)}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              selectedTopics.includes(topic)
                                ? "bg-primary"
                                : "bg-transparent"
                            )}
                          />
                          {topic}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="mt-2 flex flex-wrap gap-1 justify-center">
            {selectedTopics.map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="bg-primary/20 border-primary/50 text-white"
              >
                {topic}
                <button
                  onClick={() => handleTopicSelect(topic)}
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <LiveVideoButton
              isClicked={videoClicked}
              onClick={handleVideoClick}
            />
          </div>

        </div>
      </div>
      <footer className="relative z-10 w-full py-8 px-4 text-white">
        <div className="container mx-auto text-center">
            <div className="mb-4">
              <p className="text-sm text-white/70">© {new Date().getFullYear()} PleasureX. All rights reserved.</p>
              <p className="text-sm text-white/70 mt-2">PleasureX is a private 1v1 video chat site, please use responsibly. 18+</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-white/80">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">About Us</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
