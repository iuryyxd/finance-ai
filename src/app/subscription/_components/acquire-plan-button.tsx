"use client";

import { Button } from "@/components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAdquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      throw new Error(" Stripe publishable key not found");

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("Stripe not found");

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      onClick={handleAdquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
