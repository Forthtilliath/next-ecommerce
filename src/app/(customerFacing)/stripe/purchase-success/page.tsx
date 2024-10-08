import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function PurchaseSuccessPage({
	searchParams,
}: { searchParams: { payment_intent: string } }) {
	const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);
	if (!paymentIntent.metadata.productId) return notFound();

	const product = await db.products.get(paymentIntent.metadata.productId);
	if (!product) return notFound();

	const isSuccess = paymentIntent.status === "succeeded";

	return (
		<div className="max-w-5xl w-full mx-auto space-y-8">
			<h1 className="text-4xl font-bold">{isSuccess ? "Payment Successful" : "Payment Failed"}</h1>
			<div className="flex gap-4 items-center">
				<div className="aspect-video flex-shrink-0 w-1/3 relative">
					<Image src={product.imagePath} alt={product.name} fill className="object-cover" />
				</div>
				<div>
					<div className="text-lg">{formatCurrency(product.priceInCents / 100)}</div>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<div className="line-clamp-3 text-muted-foreground">{product.description}</div>
					<Button className="mt-4" size="lg" asChild>
						{isSuccess ? (
							<a href={`/products/download/${await createDownloadVerification(product.id)}`}>
								Download
							</a>
						) : (
							<Link href={`/products/${product.id}/purchase`}>Try Again</Link>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

function createDownloadVerification(productId: Product["id"]) {
	return db.downloadVerifications.create(productId);
}
