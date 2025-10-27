'use client';

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
import { useEffect } from "react";

declare global {
  interface Window {
    paypal: any;
  }
}

export function PremiumModal({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        style: {
          layout: 'vertical'
        },
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '8.00'
              }
            }]
          });
        },
        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);

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
                  <div id="paypal-button-container"></div>
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
            </AlertDialogFooter>
          </>
      </AlertDialogContent>
    </AlertDialog>
  );
}