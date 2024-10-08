import db from "@/lib/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function PurchasePage({ params: { id } }: Params<{ id: string }>) {
	const product = await db.products.get(id);
	if (!product) return notFound();

	const paymentIntent = await stripe.paymentIntents.create({
		amount: product.priceInCents,
		currency: "usd",
		metadata: {
			productId: product.id,
		},
	});

	if (!paymentIntent.client_secret) {
		throw Error("Stripe failed to create payment intent");
	}

	return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />;
}
