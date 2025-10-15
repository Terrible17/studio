"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ConsentButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-xs space-y-2"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full transition-all",
            isChecked
              ? "border-green-500 ring-2 ring-green-500/50"
              : "border-destructive",
            "bg-transparent hover:bg-white/10 text-white"
          )}
        >
          18+ Consent
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 rounded-md border border-border bg-background/80 p-4 text-sm backdrop-blur-sm">
        <h4 className="font-semibold">Age Verification & Content Consent</h4>
        <p className="text-muted-foreground">
          By checking the box below, you confirm that you are 18 years of age or
          older and consent to view adult-oriented content. You understand that
          this content may be explicit and is intended for a mature audience.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="consent"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            className="border-primary data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
          />
          <label
            htmlFor="consent"
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm I am 18+ and agree to the terms.
          </label>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
