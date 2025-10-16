
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Video, PhoneOff, SkipForward, MessageSquare, Settings, RotateCw, Send, Flag, Languages, Map, ShieldCheck, Gem } from "lucide-react";
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
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChatSettings } from "@/components/chat-settings";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function VideoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);


  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // Mock state for premium

  const allAccepted = termsAccepted && privacyAccepted;

  useEffect(() => {
    if (showVideo) {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Camera API is not supported by this browser.");
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Unsupported Browser",
            description: "Your browser does not support the necessary video features.",
          });
          return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (selfVideoRef.current) {
            selfVideoRef.current.srcObject = stream;
          }
          // When connected, the remote video would be attached to remoteVideoRef.
          // For now, we can mirror the self-view for demonstration.
          if (remoteVideoRef.current) {
             remoteVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings.",
          });
        }
      };

      getCameraPermission();
    }
  }, [showVideo, toast]);

  const handleAgree = () => {
    if (allAccepted) {
      setShowVideo(true);
    }
  };

  const startSearch = () => {
    setIsSearching(true);
    // Mock connection
    setTimeout(() => {
      setIsSearching(false);
      setIsConnected(true);
      toast({
        description: (
          <div className="flex items-center gap-2">
            <span>♀️</span>
            <span>South Africa</span>
            <span>🇿🇦</span>
          </div>
        ),
      });
    }, 3000);
  };

  const endCall = () => {
    setIsConnected(false);
    setIsSearching(false);
    setIsMessaging(false);
  };

  const skipCall = () => {
    setIsConnected(false);
    startSearch();
  };

  const renderFooter = () => {
    if (!isSearching && !isConnected) {
      return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <Button
            size="icon"
            className="h-20 w-20 rounded-full bg-green-500 hover:bg-green-600"
            onClick={startSearch}
          >
            <Video className="h-8 w-8" />
          </Button>
        </div>
      );
    }

    return (
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 z-20">
        {isMessaging ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
                <input type="text" placeholder="Type a message..." className="w-full bg-gray-700/50 rounded-full py-2 px-4 text-white placeholder:text-gray-400" />
                <Button size="icon" variant="ghost" className="absolute right-12 top-1/2 -translate-y-1/2">
                 😍
                </Button>
            </div>
            <Button size="icon" className="rounded-full bg-primary"><Send className="h-5 w-5" /></Button>
          </div>
        ) : (
          <div className="flex justify-around items-center">
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20">
              <RotateCw />
            </Button>
            <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={endCall}>
              <PhoneOff />
            </Button>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20" onClick={skipCall}>
              <SkipForward />
            </Button>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20" onClick={() => setIsMessaging(true)}>
              <MessageSquare />
            </Button>
            <ChatSettings isPremium={isPremium} />
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {showVideo ? (
        <>
          <div className="absolute top-4 left-4 z-20">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>
          
           <div className="absolute inset-0 w-full h-full">
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <p className="text-destructive">Camera access denied. Please enable it in your browser settings.</p>
                </div>
            )}
            
            {/* Remote video feed (hidden when not connected) */}
            <video
              ref={remoteVideoRef}
              className={cn(
                "w-full h-full object-cover",
                !isConnected && "hidden"
              )}
              autoPlay
              playsInline
            />

             {/* Self-preview, full screen when not connected */}
            <video
              ref={selfVideoRef}
              className={cn(
                "w-full h-full object-cover",
                isConnected && "hidden" 
              )}
              autoPlay
              muted
              playsInline
            />

            {hasCameraPermission && !isConnected && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
                    <h1 className="text-6xl font-cursive text-white/90">Pleasure X</h1>
                     {isSearching && (
                        <div className="mt-4 text-lg text-white/80">Searching...</div>
                    )}
                </div>
            )}

            {isConnected && (
                 <video
                    className="absolute top-4 right-4 h-40 w-32 object-cover rounded-md border-2 border-primary z-10"
                    autoPlay
                    muted
                    playsInline
                    ref={selfVideoRef}
                />
            )}
          </div>
         
          {renderFooter()}

        </>
      ) : (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      )}

      <AlertDialog open={!showVideo}>
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
                  within this Website may include graphic visual depictions and
                  descriptions of nudity and sexual activity and must not be
                  accessed by anyone who is younger than 18-years old and the
                  age of majority in their jurisdiction. Visiting this Website
                  if you are under 18-years old and the age of majority may be
                  prohibited by the law of your jurisdiction.
                </p>
                <p>
                  By clicking “I Agree” below, you state that the following
                  statements are accurate:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    I am an adult, at least 18-years old and the age of
                    majority, and I have the legal right to access and possess
                    adult material in my community.
                  </li>
                  <li>
                    I am voluntarily choosing to access this Website, because I
                    want to view, read, or hear the various materials that are
                    available.
                  </li>
                  <li>
                    I do not find depictions of nude adults, adults engaged in
                    sexual acts, or other sexual material to be offensive or
                    objectionable.
                  </li>
                  <li>
                    I understand and will abide by the standards and laws of my
                    community.
                  </li>
                  <li>
                    By logging on and viewing any part of the Website, I will
                    not hold the Website’s owners or its employees responsible
                    for any materials located on the Website.
                  </li>
                  <li>
                    I acknowledge that my use of the Website is governed by the
                    Website’s Terms-of-Use Agreement, which I have reviewed and
                    agree to be bound by.
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
                  I acknowledge that my use of the Website is governed by the Website’s Terms-of-Use Agreement, which I have reviewed and agree to be bound by.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy-agree"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(!!checked)}
                />
                <Label htmlFor="privacy-agree" className="text-xs">
                  I confirm that I have reviewed and accept the website's Privacy Policy.
                </Label>
              </div>
          </div>
          
          <AlertDialogFooter className="grid grid-cols-2 gap-4 pt-4 px-6 pb-6">
            <Button variant="outline" onClick={() => router.back()}>
              I Disagree
            </Button>
            <Button
              onClick={handleAgree}
              disabled={!allAccepted}
              className={cn(
                "bg-red-600 hover:bg-red-700 text-white",
                allAccepted && "ring-2 ring-offset-2 ring-green-500"
              )}
            >
              I Agree
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
