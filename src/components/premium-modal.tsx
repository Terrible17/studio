"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function PremiumModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
          <>
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
                    <p className="font-semibold text-foreground">
                      Once-off Payment (No Subscription)
                    </p>
                    <p>$8 for 15 days.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Payment will be handled by PayPal.
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">
                      Watch Ads for Limited Access
                    </p>
                    <p>
                      Enjoy Premium Features for a limited time of 5 minutes
                      when opting into viewing 2 ads. No cap on how many times
                      premium features can be unlocked with ads.
                    </p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Activate Premium</AlertDialogAction>
            </AlertDialogFooter>
          </>
      </AlertDialogContent>
    </AlertDialog>
  );
}