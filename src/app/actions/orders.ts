"use server";

import db from "@/lib/db";
import type { Product } from "@prisma/client";

export async function userOrderExists(email: string, productId: Product["id"]) {
	return (await db.orders.getUserOrder(email, productId)) !== null;
}
