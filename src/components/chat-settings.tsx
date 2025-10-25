"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Gem } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PremiumModal } from "./premium-modal";

interface ChatSettingsProps {
    isPremium: boolean;
}

const languages = [
    "English", "Spanish", "French", "German", "Mandarin", "Hindi", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Lahnda", "Javanese", "Wu", "Telugu", "Marathi", "Vietnamese", "Korean", "Tamil", "Urdu"
];

export function ChatSettings({ isPremium }: ChatSettingsProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            Chat Settings 
            <span className={`ml-2 h-3 w-3 rounded-full ${isPremium ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="intro-message">Intro Message</Label>
                <Textarea id="intro-message" placeholder="Type your intro message here." />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="auto-translate">Auto Translate</Label>
                <Switch id="auto-translate" />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="hide-location">Hide Location</Label>
                <Switch id="hide-location" disabled={!isPremium} />
            </div>
            
            <div>
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="English">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div>
                <p className="text-sm text-muted-foreground pb-2">Account Settings</p>
                <PremiumModal isPremium={isPremium}>
                    <Button className="w-full" variant="premium">
                        <Gem className="mr-2 h-4 w-4" />
                        Activate Premium
                    </Button>
                </PremiumModal>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full mt-2">Report a User</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Report a User</AlertDialogTitle>
                            <AlertDialogDescription>
                                To report a user, please send an email to <a href="mailto:report@example.com" className="text-blue-500">report@example.com</a> with the user\'s ID and a description of the issue.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full mt-2">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
