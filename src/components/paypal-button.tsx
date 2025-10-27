'use client';
import React, { useEffect, useRef } from 'react';

type Props = {
  productId: string;
  amount: string;
  currency?: string;
  description?: string;
  className?: string;
};

export default function PaypalButton({ productId, amount, currency='USD', description, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      console.warn('NEXT_PUBLIC_PAYPAL_CLIENT_ID not set. PayPal button will not load.');
      return;
    }
    const existing = document.getElementById('paypal-sdk');
    if (!existing) {
      const s = document.createElement('script');
      s.id = 'paypal-sdk';
      s.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      s.async = true;
      document.body.appendChild(s);
      s.onload = renderButton;
    } else {
      renderButton();
    }

    function renderButton() {
      // @ts-ignore
      if (!window.paypal || !containerRef.current) return;
      // clear previous
      containerRef.current.innerHTML = '';
      // @ts-ignore
      window.paypal.Buttons({
        createOrder: async () => {
          const r = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, currency, description, productId }),
          });
          const j = await r.json();
          if (j?.id) return j.id;
          throw new Error('Failed to create order');
        },
        onApprove: async (data: any) => {
          const r = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const j = await r.json();
          // client should verify with server for entitlement. For now navigate to success if completed.
          if (j?.status === 'COMPLETED' || (j?.status === 'PAYER_ACTION_REQUIRED' || j?.status === undefined)) {
            // call a client-side unlock or notify user
            // You should implement server-side entitlement check in production.
            alert('Payment completed. Server response: ' + JSON.stringify(j));
            // optional: redirect
            // window.location.href = '/premium-success';
          } else {
            alert('Payment not completed. ' + JSON.stringify(j));
          }
        },
        onError: (err:any) => {
          console.error('PayPal error', err);
          alert('Payment error');
        }
      }).render(containerRef.current);
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [productId, amount, currency, description]);

  return <div className={className}><div ref={containerRef}></div></div>;
}
