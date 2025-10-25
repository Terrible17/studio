"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  Settings,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CountrySelect } from "@/components/country-select";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function VideoPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const allAccepted = termsAccepted && privacyAccepted;

  const handleAgree = () => {
    if (allAccepted) {
      setShowVideo(true);
    }
  };

  useEffect(() => {
    if (showVideo) {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Camera API is not supported by this browser.");
          return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (selfVideoRef.current) {
            selfVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      };

      getCameraPermission();
    }
  }, [showVideo]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {showVideo ? (
        <>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-transparent">
            <div>
              <CountrySelect />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowVideo(false)}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Body */}
          <div className="flex-1 flex flex-col items-center justify-center text-center w-full h-full">
            <div className="relative w-full h-full">
              <video
                ref={selfVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h1 className="text-8xl font-cursive" style={{
                  background: 'linear-gradient(to right, #A7E6FF, #FFAFCC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'fill-animation 4s ease-in-out forwards',
                }}>
                  PleasureX
                </h1>
              </div>
            </div>
          </div>

           {/* Footer Controls */}
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent z-20">
              <div className="flex justify-evenly items-center bg-black/30 backdrop-blur-sm rounded-full max-w-md mx-auto p-2">
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <MicOff /> : <Mic />}
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera-reverse"><path d="M13 16.5V14l4 2.5v-9l-4 2.5V8"/><path d="M18 8h-6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="m2 2 20 20"/><path d="M9.5 10.5c.3-.3.6-.5.9-.7"/><path d="M6.5 6.5C8 5.6 10 5 12 5c2.5 0 4.5 1 6 2.5"/></svg>
                </Button>
                <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full">
                  <VideoOff />
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white">
                  <MessageSquare />
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white">
                  <Settings />
                </Button>
              </div>
            </div>

            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
              .font-cursive {
                font-family: 'Dancing Script', cursive;
              }
              @keyframes fill-animation {
                from {
                  background-size: 200% 100%;
                  background-position: 100% 0;
                }
                to {
                  background-size: 200% 100%;
                  background-position: 0 0;
                }
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
      )}
    </div>
  );
}
