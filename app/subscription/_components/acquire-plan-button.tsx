"use client";

import { Button } from "@/app/components/ui/button";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );
    if (!stripe) {
      throw new Error("Stripe não carregado");
    }

    await stripe?.redirectToCheckout({ sessionId });
  };

  const isPremium = user?.publicMetadata.subscriptionPlan === "premium";
  if (isPremium) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user?.emailAddresses[0].emailAddress}`}
          // href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
