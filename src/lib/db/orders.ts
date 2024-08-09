"use server";

import type { Product } from "@prisma/client";
import prisma from "./prisma";

export async function getSales() {
	return prisma.order.aggregate({
		_sum: { pricePaidInCents: true },
		_count: { id: true },
	});
}

export async function getSumOfAllOrders() {
	return prisma.order.aggregate({ _sum: { pricePaidInCents: true } });
}

export async function getUserOrder(email: string, productId: Product["id"]) {
	return prisma.order.findFirst({
		where: {
			user: { email },
			productId,
		},
		select: { id: true },
	});
}
