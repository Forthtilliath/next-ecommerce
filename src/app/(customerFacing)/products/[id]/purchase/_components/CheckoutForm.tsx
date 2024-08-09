"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useState } from "react";

type Props = {
	product: Pick<Product, "name" | "priceInCents" | "imagePath" | "description">;
	clientSecret: string;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export function CheckoutForm({ product, clientSecret }: Props) {
	return (
		<div className="max-w-5xl w-full mx-auto space-y-8">
			<div className="flex gap-4 items-center">
				<div className="aspect-video flex-shrink-0 w-1/3 relative">
					<Image src={product.imagePath} alt={product.name} fill className="object-cover" />
				</div>
				<div>
					<div className="text-lg">{formatCurrency(product.priceInCents / 100)}</div>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<div className="line-clamp-3 text-muted-foreground">{product.description}</div>
				</div>
			</div>
			<Elements stripe={stripePromise} options={{ clientSecret }}>
				<Form priceInCents={product.priceInCents} />
			</Elements>
		</div>
	);
}

function Form({ priceInCents }: Pick<Props["product"], "priceInCents">) {
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!stripe || !elements || isLoading) return;

		setIsLoading(true);

		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
				},
			})
			.then(({ error }) => {
				if (error.type === "card_error" || error.type === "validation_error") {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unexpected error occurred.");
				}
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					{errorMessage && <CardDescription className="text-destructive">Error</CardDescription>}
				</CardHeader>
				<CardContent>
					<PaymentElement />
				</CardContent>
				<CardFooter>
					<Button className="w-full" size="lg" disabled={!stripe || !elements}>
						{isLoading ? "Loading..." : `Purchase - ${formatCurrency(priceInCents / 100)}`}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
