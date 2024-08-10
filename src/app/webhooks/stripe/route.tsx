import PurchaseReceiptEmail from "@/email/PurchaseReceipt";
import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const event = stripe.webhooks.constructEvent(
			await req.text(),
			req.headers.get("Stripe-Signature") as string,
			process.env.STRIPE_WEBHOOK_SECRET,
		);

		if (event.type === "charge.succeeded") {
			const charge = event.data.object as Stripe.Charge;
			const productId = charge.metadata.productId;
			const email = charge.billing_details.email;
			const pricePaidInCents = charge.amount;

			const product = await db.products.get(productId);
			if (!product || !email) return new NextResponse("Bad request", { status: 400 });

			const {
				orders: [order],
			} = await db.users.createOrUpdate({
				email,
				pricePaidInCents,
				productId,
			});

			const downloadVerificationId = await db.downloadVerifications.create(productId);

			const { data, error } = await resend.emails.send({
				from: `Support <${process.env.SENDER_EMAIL}>`,
				to: email,
				subject: "Order Confirmation",
				react: (
					<PurchaseReceiptEmail
						product={product}
						order={order}
						downloadVerificationId={downloadVerificationId}
					/>
				),
			});

			if (error) {
				return NextResponse.json({ error }, { status: 500 });
			}

			return NextResponse.json(data);
		}

		return new NextResponse();
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
