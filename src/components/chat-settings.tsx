
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Settings, Languages, Map, ShieldCheck, Gem, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PremiumIcon } from './icons/premium-icon';


interface ChatSettingsProps {
    isPremium: boolean;
}

export function ChatSettings({ isPremium }: ChatSettingsProps) {
    const [isLocationHidden, setIsLocationHidden] = useState(false);
    const [isAutoTranslate, setIsAutoTranslate] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/20">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat Settings</SheetTitle>
           <div className="absolute right-4 top-4">
               <div className={isPremium ? 'text-green-500' : 'text-red-500'}>
                    <PremiumIcon className="h-6 w-6" />
               </div>
            </div>
        </SheetHeader>
        <div className="py-4 space-y-6">
            <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Report
                </Button>
                 <Select defaultValue="en">
                    <SelectTrigger className="w-full">
                         <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4" />
                            <SelectValue placeholder="Language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                </Select>

            </div>

          <div className="space-y-4">
             <h3 className="text-sm font-medium text-muted-foreground">Premium Features</h3>
             <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                    <Label htmlFor="hide-location" className="flex items-center gap-2">
                        <Map className="h-4 w-4"/>
                        Hide Location
                    </Label>
                    <p className="text-xs text-muted-foreground">Prevent others from seeing your country.</p>
                </div>
                <Switch
                    id="hide-location"
                    checked={isLocationHidden}
                    onCheckedChange={setIsLocationHidden}
                    disabled={!isPremium}
                />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                    <Label htmlFor="auto-translate" className="flex items-center gap-2">
                        <Languages className="h-4 w-4"/>
                        Auto Translate
                    </Label>
                     <p className="text-xs text-muted-foreground">Automatically translate incoming messages to English.</p>
                </div>
                <Switch
                    id="auto-translate"
                    checked={isAutoTranslate}
                    onCheckedChange={setIsAutoTranslate}
                    disabled={!isPremium}
                />
            </div>
          </div>
        </div>
        <SheetFooter>
            {!isPremium && <Button className="w-full" variant="premium"><Gem className="mr-2 h-4 w-4"/>Upgrade to Premium</Button>}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

declare module "tailwind-variants" {
    interface ButtonVariantConfig {
        variant: {
            premium: string;
        };
    }
}

    