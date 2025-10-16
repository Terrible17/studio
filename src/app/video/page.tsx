
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function VideoPage() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const allAccepted = termsAccepted && privacyAccepted;

  const handleAgree = () => {
    if (allAccepted) {
      setShowVideo(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      {showVideo ? (
        <>
          <div className="absolute top-4 left-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>
          <h1 className="text-4xl font-bold">Live Video</h1>
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
