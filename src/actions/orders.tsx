"use server";

import OrderHistoryEmail from "@/email/OrderHistory";
import db from "@/lib/db";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.object({ email: z.string().email() });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function emailOrderHistory(
	_prevState: unknown,
	formData: FormData,
): Promise<{ message?: string; error?: string }> {
	const result = emailSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) {
		return { error: "Invalid email address" };
	}

	const user = await db.users.get(result.data.email, {
		email: true,
		orders: {
			select: {
				pricePaidInCents: true,
				id: true,
				createdAt: true,
				product: {
					select: {
						id: true,
						name: true,
						imagePath: true,
						description: true,
					},
				},
			},
		},
	});

	if (!user) {
		return { message: "Check your email to view your order history and download your products" };
	}

	const orders = user.orders.map(async (order) => ({
		...order,
		downloadVerificationId: await db.downloadVerifications.create(order.product.id),
	}));

	const data = await resend.emails.create({
		from: `Support <${process.env.SENDER_EMAIL}>`,
		to: user.email,
		subject: "Your order history",
		react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
	});

	if (data.error) {
		return { error: "There was an error sending your email. Please try again" };
	}

	return { message: "Check your email to view your order history and download your products" };
}
