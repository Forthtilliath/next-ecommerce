"use server";

import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function deleteOrder(id: string) {
	const order = await db.orders.delete(id);
	if (!order) return notFound();

	return order;
}
