
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Camera,
  PhoneOff,
  PhoneForwarded,
  MessageSquare,
  Send,
  SmilePlus,
  X,
  Video,
  Flag,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CountrySelect } from "@/components/country-select";
import { GenderSelect } from "@/components/gender-select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { countries } from "@/lib/countries";
import { ChatSettings } from "@/components/chat-settings";

const EmojiButton = ({ emoji, onSelect }) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-10 w-10 rounded-full text-white"
    onClick={() => onSelect(emoji)}
  >
    {emoji}
  </Button>
);

const ChatHistory = ({ chatHistory }) => (
  <div className="absolute bottom-24 left-4 right-4 max-h-60 overflow-y-auto z-20 flex flex-col">
    {chatHistory.map((chat, index) => (
      <div
        key={index}
        className={`flex ${
          chat.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={
            "p-2 rounded-lg my-1 text-sm bg-black/30 backdrop-blur-sm text-white max-w-xs"
          }
        >
          {chat.text}
        </div>
      </div>
    ))}
  </div>
);

const EmojiBlast = ({ emojiBlast }) => (
  <div className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden">
    {emojiBlast.map((particle) => (
      <span key={particle.id} style={particle.style}>
        {particle.emoji}
      </span>
    ))}
  </div>
);

const SearchingAnimation = () => {
  const text = "Searching...";
  return (
    <div className="text-2xl font-extrabold flex">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-worm"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const ReportDialog = ({ open, onOpenChange }) => (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md bg-card text-card-foreground">
        <AlertDialogHeader className="bg-muted p-4 rounded-t-lg">
          <AlertDialogTitle className="text-center text-lg font-bold text-foreground">
            Report a User
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <ScrollArea className="h-auto max-h-64 w-full p-4 border-y">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>If you encounter inappropriate behavior, you can report it by contacting support at <strong>support@pleasurex.com</strong>.</p>
              <p>Reports should include:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Username or profile link of the reported user.</li>
                  <li>Description of the incident.</li>
                  <li>Date/time of occurrence.</li>
                  <li>Evidence (optional, if available).</li>
              </ul>
              <div>
                  <h3 className="font-semibold text-foreground">After You Report</h3>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Our moderation team will review your report within 24–48 hours.</li>
                      <li>Depending on the severity, the user may be suspended, permanently banned, or reported to authorities.</li>
                      <li>All reports are confidential. Your identity will not be shared with the reported user.</li>
                  </ul>
              </div>
            </div>
          </ScrollArea>
        </AlertDialogDescription>
        <AlertDialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

export default function VideoPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [selectedGender, setSelectedGender] = useState("everyone");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState("user");
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [emojiBlast, setEmojiBlast] = useState<
    { id: number; emoji: string; style: React.CSSProperties }[]
  >([]);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string }[]
  >([]);
  const [matchedUser, setMatchedUser] = useState<{ gender: string; country: string } | null>(null);
  const isPremium = true;

  const handleAgree = () => {
    if (termsAccepted && privacyAccepted) {
      document.documentElement.requestFullscreen().catch(console.error);
      setShowVideo(true);
    }
  };

  useEffect(() => {
    if (!showVideo) return;

    const getCameraPermission = async () => {
      try {
        if (stream) stream.getTracks().forEach((track) => track.stop());
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { facingMode },
        });
        setStream(newStream);
        if (selfVideoRef.current) selfVideoRef.current.srcObject = newStream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getCameraPermission();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (document.fullscreenElement) document.exitFullscreen();
    };
  }, [showVideo, facingMode]);

  useEffect(() => {
    if (isConnected) {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const genders = ['male', 'female'];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      setMatchedUser({
        gender: randomGender,
        country: randomCountry.value,
      });
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isSearching) {
      setIsConnected(false);
      return;
    }

    setIsConnected(false);
    const timer = setTimeout(() => setIsConnected(true), 5000);
    return () => clearTimeout(timer);
  }, [isSearching]);

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  const flipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleSearch = () => {
    setShowChat(false);
    setShowEmojis(false);
    setIsSearching((prev) => !prev);
  };

  const handleSkip = () => {
    setShowChat(false);
    setShowEmojis(false);
    setIsSearching(false);
    setTimeout(() => {
      setIsSearching(true);
    }, 0);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
      setMessage("");
      setTimeout(
        () =>
          setChatHistory((prev) => [...prev, { sender: "other", text: "Hi" }]),
        1000
      );
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      id: Math.random(),
      emoji,
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        fontSize: `${Math.random() * 24 + 8}px`,
        animation: `blast 2s ease-out forwards`,
        animationDelay: `${Math.random() * 0.2}s`,
        "--tx": `${(Math.random() - 0.5) * (window.innerWidth * 1.5)}px`,
        "--ty": `${(Math.random() - 0.5) * (window.innerHeight * 1.5)}px`,
      } as React.CSSProperties,
    }));

    setEmojiBlast(newParticles);
    setShowEmojis(false);

    setTimeout(() => setEmojiBlast([]), 2200);
  };

  const {
    label: selectedCountryLabel,
    flag: selectedCountryFlag,
  } = countries.find((c) => c.value === selectedCountry) || {
    label: "Worldwide",
    flag: "🌍",
  };
  const genderSymbol =
    selectedGender === "male" ? "♂️" : selectedGender === "female" ? "♀️" : "";

  const renderToolbar = () => {
    if (isSearching) {
      if (showChat) {
        return (
          <div className="flex w-full max-w-lg mx-auto items-center">
            <Button
              size="icon"
              className="mr-2"
              onClick={() => {
                setShowChat(false);
                setShowEmojis(false);
              }}
            >
              <X />
            </Button>
            {showEmojis ? (
              <div className="flex justify-evenly items-center bg-transparent rounded-full w-full p-2">
                <EmojiButton emoji="😍" onSelect={handleEmojiSelect} />
                <EmojiButton emoji="❤️" onSelect={handleEmojiSelect} />
                <EmojiButton emoji="💦" onSelect={handleEmojiSelect} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-white"
                  onClick={() => setShowEmojis(false)}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-transparent border-none text-white flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="mx-2"
                  onClick={() => setShowEmojis(true)}
                >
                  <SmilePlus />
                </Button>
                <Button size="icon" onClick={handleSendMessage}>
                  <Send />
                </Button>
              </>
            )}
          </div>
        );
      }
      return (
        <div className="flex justify-evenly items-center bg-black/30 backdrop-blur-sm rounded-full w-full max-w-lg mx-auto p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full text-white"
            onClick={toggleMute}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full text-white"
            onClick={flipCamera}
          >
            <Camera />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-16 w-16 rounded-full"
            onClick={() => {
              setIsSearching(false);
              setIsConnected(false);
            }}
          >
            <PhoneOff />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-16 w-16 rounded-full bg-gray-500 hover:bg-gray-600"
            onClick={handleSkip}
          >
            <PhoneForwarded />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full text-white"
            onClick={() => {
              setShowChat(true);
              setShowEmojis(false);
            }}
          >
            <MessageSquare />
          </Button>
          <ChatSettings isPremium={isPremium} />
        </div>
      );
    }
    return (
      <Button
        variant="default"
        size="icon"
        className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 animate-pulse-video"
        onClick={handleSearch}
      >
        <Video className="h-6 w-6" />
      </Button>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {showVideo ? (
        <>
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-transparent">
            <div className="flex items-center">
              <CountrySelect
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              />
              <GenderSelect
                value={selectedGender}
                onValueChange={setSelectedGender}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowVideo(false);
                router.back();
              }}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-20 left-4 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowReportDialog(true)}
              className="h-10 w-10 rounded-full text-white bg-black/30 backdrop-blur-sm"
            >
              <Flag className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 w-full h-full relative flex items-center justify-center">
            {isSearching && !isConnected ? (
              <SearchingAnimation />
            ) : (
              <div className="text-center">
                <p className="text-white/50 text-xl mt-4">
                  {isConnected && matchedUser
                    ? `Connected ${matchedUser.gender === 'male' ? '♂️' : '♀️'} ${
                        countries.find((c) => c.value === matchedUser.country)?.flag
                      }`
                    : "Click the video button to start"}
                </p>
              </div>
            )}

            <video
              ref={selfVideoRef}
              className="absolute top-20 right-4 w-24 h-32 md:w-48 md:h-64 object-cover rounded-lg z-10 border-2 border-white/20 shadow-lg"
              autoPlay
              muted
              playsInline
            />
          </div>

          {emojiBlast.length > 0 && <EmojiBlast emojiBlast={emojiBlast} />}

          {showChat && <ChatHistory chatHistory={chatHistory} />}

          <ReportDialog open={showReportDialog} onOpenChange={setShowReportDialog} />

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent z-20">
            <div className="flex justify-center items-center">
              {renderToolbar()}
            </div>
          </div>

          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
            .font-cursive {
              font-family: "Dancing Script", cursive;
            }
            @keyframes pulse-video {
              0%,
              100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
            }
            .animate-pulse-video {
              animation: pulse-video 1.5s ease-in-out infinite;
            }
            @keyframes blast {
              from {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
              to {
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))
                  scale(0.5);
                opacity: 0;
              }
            }
            @keyframes worm {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-worm {
              display: inline-block;
              animation: worm 1.5s ease-in-out infinite;
            }
          `}</style>
        </>
      ) : (
        <AlertDialog open={!showVideo} onOpenChange={() => router.back()}>
          <AlertDialogContent className="max-w-md bg-card text-card-foreground">
            <AlertDialogHeader className="bg-muted p-4 rounded-t-lg">
              <AlertDialogTitle className="text-center text-lg font-bold text-foreground">
                Warning: This Website is for Adults Only!
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription asChild>
              <ScrollArea className="h-64 w-full p-4 border-y">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    This Website is for use solely by responsible adults over
                    18-years old and the age of consent in the jurisdiction from
                    which it is being accessed. The materials that are available
                    within this Website may include graphic visual depictions
                    and descriptions of nudity and sexual activity and must not
                    be accessed by anyone who is younger than 18-years old and
                    the age of majority in their jurisdiction. Visiting this
                    Website if you are under 18-years old and the age of
                    majority may be prohibited by the law of your jurisdiction.
                  </p>
                  <p>
                    By clicking “I Agree” below, you state that the following
                    statements are accurate:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      I am an adult, at least 18-years old and the age of
                      majority, and I have the legal right to access and
                      possess adult material in my community.
                    </li>
                    <li>
                      I am voluntarily choosing to access this Website, because
                      I want to view, read, or hear the various materials that
                      are available.
                    </li>
                    <li>
                      I do not find depictions of nude adults, adults engaged
                      in sexual acts, or other sexual material to be offensive
                      or objectionable.
                    </li>
                    <li>
                      I understand and will abide by the standards and laws of
                      my community.
                    </li>
                    <li>
                      By logging on and viewing any part of the Website, I will
                      not hold the Website’s owners or its employees
                      responsible for any materials located on the Website.
                    </li>
                    <li>
                      I acknowledge that my use of the Website is governed by
                      the Website’s Terms-of-Use Agreement, which I have
                      reviewed and agree to be bound by.
                    </li>
                    <li>
                      I confirm that I have reviewed and accept the website's
                      Privacy Policy.
                    </li>
                  </ul>
                  <p>
                    If you do not agree, click on the “I Disagree” button below
                    and exit the Website.
                  </p>
                </div>
              </ScrollArea>
            </AlertDialogDescription>

            <div className="px-6 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms-agree"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <Label htmlFor="terms-agree" className="text-xs">
                  I acknowledge that my use of the Website’s Terms-of-Use Agreement, which I have
                  reviewed and agree to be bound by.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy-agree"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(!!checked)}
                />
                <Label htmlFor="privacy-agree" className="text-xs">
                  I confirm that I have reviewed and accept the website's
                  Privacy Policy.
                </Label>
              </div>
            </div>

            <AlertDialogFooter className="grid grid-cols-2 gap-4 pt-4 px-6 pb-6">
              <Button variant="outline" onClick={() => router.back()}>
                I Disagree
              </Button>
              <Button
                onClick={handleAgree}
                disabled={!termsAccepted || !privacyAccepted}
                className={cn(
                  "bg-red-600 hover:bg-red-700 text-white",
                  termsAccepted &&
                    privacyAccepted &&
                    "ring-2 ring-offset-2 ring-green-500"
                )}
              >
                I Agree
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
