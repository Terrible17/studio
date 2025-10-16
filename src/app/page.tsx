
"use client";

import { useState, useEffect } from "react";
import { Menu, Mars, Venus, Users, X, Video, ChevronDown } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";


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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-accent hover:bg-transparent hover:text-accent/90"
              aria-label="Premium"
            >
              <PremiumIcon className="h-6 w-6" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Premium Features</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 pt-2 text-left text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>No Ads</li>
                        <li>Unlimited Swipes</li>
                        <li>Connect to any Geo location</li>
                        <li>No restriction on Gender filters</li>
                        <li>Hide location</li>
                        <li>Premium badge</li>
                    </ul>
                    <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground">Once-off Payment (No Subscription)</p>
                        <p>$8 for 15 days.</p>
                        <p className="text-xs text-muted-foreground mt-1">Payment will be handled by PayPal.</p>
                    </div>
                    <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground">Watch Ads for Limited Access</p>
                        <p>Enjoy Premium Features for a limited time of 5 minutes when opting into viewing 2 ads. No cap on how many times premium features can be unlocked with ads.</p>
                    </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ThemeToggle />
        <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="hover:bg-transparent"
                >
                <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background w-full sm:max-w-xs">
                <SheetHeader>
                <SheetTitle className="text-center">Menu</SheetTitle>
                <SheetClose asChild>
                    <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </SheetClose>
                </SheetHeader>
                <div className="py-8">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-medium">Premium</AccordionTrigger>
                        <AccordionContent>
                           More details about premium features.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-medium">Features</AccordionTrigger>
                        <AccordionContent>
                            Details about application features.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-medium">Privacy & Safety</AccordionTrigger>
                        <AccordionContent>
                            Information on privacy and safety.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-medium">Legal</AccordionTrigger>
                        <AccordionContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button className="text-sm text-muted-foreground underline">View Legal Policy</button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Legal Policy</AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                      <ScrollArea className="h-96 w-full pr-6 text-left">
                                        <div className="space-y-4 text-sm text-muted-foreground">
                                          <div>
                                            <h3 className="font-semibold text-foreground">1. General Notice</h3>
                                            <p>This website (“PleasureX”) operates as an adult-oriented 18+ platform designed for private, consensual video interactions between users. By accessing or using this site, you confirm that you are 18 years of age or older and legally permitted to view adult content in your country or region. If you are under 18 (or under the age of majority in your jurisdiction), you must leave this website immediately.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">2. Legal Compliance</h3>
                                            <p>PleasureX complies with all applicable international and local laws governing adult content, online safety, and digital communications. All models, creators, and streamers are required to verify their identity and age before participating in live or recorded sessions. We do not tolerate or permit: The appearance or involvement of minors (under 18). Non-consensual or exploitative acts. Distribution of illegal or copyrighted materials. Any content or user found violating these rules will be permanently removed and reported to the appropriate authorities.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">3. User Responsibility</h3>
                                            <p>All users are personally responsible for: Ensuring they are of legal age to access adult material. Complying with the laws of their country or residence. The content they create, upload, or stream on the platform. Respecting the privacy, consent, and rights of others. PleasureX assumes no responsibility for the actions or conduct of individual users.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">4. Copyright and Intellectual Property</h3>
                                            <p>All text, graphics, logos, and design elements on this site are owned or licensed by PleasureX. Users may not copy, reproduce, or redistribute any content or materials without written permission. Creators retain ownership of their live and uploaded content but grant PleasureX a limited license to display it within the platform.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">5. Limitation of Liability</h3>
                                            <p>PleasureX provides its services “as is” and makes no guarantees regarding availability, accuracy, or reliability. We are not liable for any damages, losses, or claims resulting from the use of the platform, including interactions between users. You use the site at your own discretion and risk.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">6. Third-Party Links</h3>
                                            <p>This site may contain external links to other websites or services. PleasureX is not responsible for the content, privacy policies, or safety of third-party websites.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">7. Moderation and Legal Cooperation</h3>
                                            <p>We cooperate fully with law enforcement in cases involving illegal activity, including but not limited to underage users, exploitation, or fraud. All report logs and relevant data may be shared with authorities when legally required.</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-foreground">8. Changes to This Policy</h3>
                                            <p>PleasureX reserves the right to update or modify this Legal Policy at any time. All changes will be posted here, and continued use of the site implies agreement with the latest version.</p>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogAction>Close</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="font-medium">Moderation</AccordionTrigger>
                        <AccordionContent>
                            Moderation policies.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="font-medium">Contact</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm text-muted-foreground text-left">
                            <p>
                              If you have any questions, concerns, or feedback about our website, services, or policies, please contact us using the information below. We aim to respond to all messages within 24–48 hours.
                            </p>
                            <p>
                              <strong>Email:</strong> support@pleasurex.com<br/>
                              <strong>Support Hours:</strong> Monday – Friday, 9:00 AM to 6:00 PM CAT
                            </p>
                            <p>
                              For security and privacy reasons, please do not send personal or payment information through email.
                            </p>
                             <p>
                              If you’re reporting a content or user issue, include as much detail as possible (such as date, time, and username) so we can assist you quickly.
                            </p>
                             <p>
                              Thank you for reaching out — your feedback helps us keep PleasureX safe, respectful, and enjoyable for everyone.
                            </p>
                          </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                        <AccordionTrigger className="font-medium">Terms & Conditions</AccordionTrigger>
                        <AccordionContent>
                            Terms and conditions.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                        <AccordionTrigger className="font-medium">Report</AccordionTrigger>
                        <AccordionContent>
                           How to report issues.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
            </SheetContent>
        </Sheet>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 text-center text-white">
        <div className="w-56 mt-48">
          <h2 className="text-base font-medium text-white/80 mb-3">
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:text-white">Privacy Policy</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Privacy Policy</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <ScrollArea className="h-96 w-full pr-6 text-left">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p>
                            <strong>Effective Date:</strong> 16 October 2025
                          </p>
                          <p>
                            PleasureX (“we,” “us,” or “our”) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our adult video chat services (“the Site”). By using the Site, you agree to the practices described in this Privacy Policy.
                          </p>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">1. Information We Collect</h3>
                            <p><strong>1.1 Personal Information:</strong> Name, email address, date of birth, and account credentials. Payment information (processed securely by third-party payment providers). Any information you voluntarily provide during chats or profile creation.</p>
                            <p><strong>1.2 Non-Personal Information:</strong> Device information (IP address, browser type, operating system). Usage data (pages visited, features used, time spent on the Site). Cookies and similar tracking technologies.</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">2. How We Use Your Information</h3>
                            <p>We use your information to: Provide, operate, and maintain the Site. Verify your age and eligibility. Improve and personalize your experience. Communicate with you about updates, promotions, or service changes. Detect and prevent fraud, abuse, or illegal activity.</p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">3. Sharing Your Information</h3>
                            <p>We do not sell your personal information. We may share information: With trusted third-party service providers (e.g., payment processors, hosting services). If required by law, court order, or government authority. To protect our rights, safety, or property, or that of our users.</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">4. Adult Content and User Responsibility</h3>
                             <p>The Site contains explicit content intended for adults. You are responsible for your own content during video chats. We are not responsible for content shared by other users.</p>
                          </div>
                          
                          <div className="space-y-2">
                             <h3 className="font-semibold text-foreground">5. Cookies and Tracking</h3>
                             <p>We use cookies and similar technologies to enhance your experience, analyze traffic, and provide targeted content. You can adjust your browser settings to refuse cookies, but some features may not function properly.</p>
                          </div>
                          
                           <div className="space-y-2">
                             <h3 className="font-semibold text-foreground">6. Data Security</h3>
                             <p>We implement reasonable technical and organizational measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute protection.</p>
                          </div>
                          
                           <div className="space-y-2">
                             <h3 className="font-semibold text-foreground">7. Data Retention</h3>
                             <p>We retain your personal data as long as necessary to provide services and comply with legal obligations. Inactive accounts or deleted accounts may still retain anonymized usage data.</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">8. Your Rights</h3>
                            <p>Depending on your jurisdiction, you may have rights to: Access, correct, or delete your personal information. Object to or restrict certain processing of your data. Withdraw consent where applicable. To exercise your rights, contact us at support@pleasurex.com</p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">9. Children’s Privacy</h3>
                            <p>The Site is strictly for adults (18+). We do not knowingly collect information from anyone under 18.</p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">10. Changes to This Privacy Policy</h3>
                            <p>We may update this Privacy Policy at any time. Continued use of the Site constitutes acceptance of any changes.</p>
                          </div>
                        </div>
                      </ScrollArea>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:text-white">Terms of Service</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Terms of Service</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <ScrollArea className="h-96 w-full pr-6 text-left">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p>
                            <strong>Effective Date:</strong> 16 October 2025
                          </p>
                          <p>
                            Welcome to PleasureX (“the Site”). By accessing or using our
                            services, you agree to be bound by these Terms of Service
                            (“Terms”). If you do not agree, you must not use the Site.
                          </p>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">1. Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                You must be at least 18 years old or the legal age in
                                your jurisdiction to use this Site.
                              </li>
                              <li>
                                By using the Site, you affirm that you meet this age
                                requirement.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">
                              2. Account Registration
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                You may need to register an account to use certain
                                features.
                              </li>
                              <li>
                                You agree to provide accurate, complete, and current
                                information during registration.
                              </li>
                              <li>
                                You are responsible for maintaining the
                                confidentiality of your account credentials and for
                                all activities under your account.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">3. User Conduct</h3>
                            <p>You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                Use the Site for any illegal purpose or in violation
                                of applicable laws.
                              </li>
                              <li>Harass, threaten, or defame other users.</li>
                              <li>
                                Share content involving minors, non-consenting
                                adults, or any illegal material.
                              </li>
                              <li>
                                Attempt to exploit, harm, or gain unauthorized access
                                to the Site’s infrastructure, accounts, or data.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">4. Adult Content</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                The Site contains explicit adult content intended for
                                adults only.
                              </li>
                              <li>
                                You acknowledge that you may be exposed to content
                                that is sexual, offensive, or disturbing.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">
                              5. Payment and Subscriptions
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                Certain features may require payment or subscription.
                              </li>
                              <li>
                                All payments are non-refundable unless otherwise
                                stated.
                              </li>
                              <li>
                                You authorize the Site to charge your chosen payment
                                method for any applicable fees.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">6. Termination</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                We reserve the right to suspend or terminate your
                                account at any time for violation of these Terms.
                              </li>
                              <li>
                                Termination does not limit our right to pursue legal
                                action or seek damages for violations.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">7. Content Ownership</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                You retain ownership of content you post, but you
                                grant the Site a license to use, display, and
                                distribute your content as necessary to operate the
                                Site.
                              </li>
                              <li>
                                You are solely responsible for the content you share.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">8. Privacy</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                Our Privacy Policy explains how we collect, use, and
                                protect your information.
                              </li>
                              <li>
                                By using the Site, you consent to the collection and
                                use of your data as described in the Privacy Policy.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">9. Disclaimers</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                The Site is provided “as is” and without warranties
                                of any kind, express or implied.
                              </li>
                              <li>
                                We do not guarantee uninterrupted access, accuracy of
                                content, or security of the Site.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">
                              10. Limitation of Liability
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                To the fullest extent permitted by law, the Site and
                                its owners are not liable for any direct, indirect,
                                incidental, or consequential damages arising from your
                                use of the Site.
                              </li>
                              <li>You use the Site at your own risk.</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">11. Indemnification</h3>
                            <p>
                              You agree to indemnify and hold harmless the Site, its
                              affiliates, and its staff from any claims, damages, or
                              expenses arising from your use of the Site or violation
                              of these Terms.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">12. Modifications</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>We may modify these Terms at any time.</li>
                              <li>
                                Continued use of the Site constitutes acceptance of
                                the updated Terms.
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">13. Governing Law</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                These Terms are governed by the laws of [Your
                                Jurisdiction].
                              </li>
                              <li>
                                Any disputes will be resolved in the courts of [Your
                                Jurisdiction].
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:text-white">Contact</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Contact Us</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4 pt-2 text-left">
                      <p>
                        If you have any questions, concerns, or feedback about our website, services, or policies, please contact us using the information below. We aim to respond to all messages within 24–48 hours.
                      </p>
                      <p>
                        <strong>Email:</strong> support@pleasurex.com<br/>
                        <strong>Support Hours:</strong> Monday – Friday, 9:00 AM to 6:00 PM CAT
                      </p>
                      <p>
                        For security and privacy reasons, please do not send personal or payment information through email.
                      </p>
                      <p>
                        If you’re reporting a content or user issue, include as much detail as possible (such as date, time, and username) so we can assist you quickly.
                      </p>
                      <p>
                        Thank you for reaching out — your feedback helps us keep PleasureX safe, respectful, and enjoyable for everyone.
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:text-white">About Us</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>About Us</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <ScrollArea className="h-96 w-full pr-6 text-left">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p>
                            Welcome to <strong>PleasureX</strong>, the premier platform for safe, private, and exciting 1v1 adult video chats. Our mission is to provide adults 18+ with a space where they can connect, explore, and enjoy intimate conversations in a secure environment.
                          </p>
                          <p>
                            We understand that privacy and discretion are important. That’s why we’ve designed our platform to give you full control over your experience while keeping your personal information safe. Every chat is private, and every user is verified to ensure a respectful and enjoyable community.
                          </p>
                          <p>
                            At <strong>PleasureX</strong>, we believe in creating connections that are fun, consensual, and completely adult-focused. Whether you’re here to meet new people, explore your fantasies, or just enjoy a private conversation, our platform is built to make your experience seamless and exciting.
                          </p>
                          <h4 className="font-semibold text-foreground">Why Choose Us?</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Privacy First:</strong> Your security and anonymity are our top priority.</li>
                            <li><strong>Safe Environment:</strong> We monitor for inappropriate behavior and provide tools to report abuse.</li>
                            <li><strong>User-Friendly:</strong> Simple, fast, and intuitive interface designed for adults.</li>
                            <li><strong>Interactive Experience:</strong> Enjoy real-time 1v1 video chats in a safe and engaging way.</li>
                          </ul>
                          <p>
                            Join us today and discover a new way to connect in the adult world—private, exciting, and just for you.
                          </p>
                        </div>
                      </ScrollArea>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
        </div>
      </footer>
    </div>
  );
}
