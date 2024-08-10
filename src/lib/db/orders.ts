"use server";

import type { Order, Product } from "@prisma/client";
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

export async function getAll() {
	return prisma.order.findMany({
		select: {
			id: true,
			pricePaidInCents: true,
			product: { select: { name: true } },
			user: { select: { email: true } },
		},
		orderBy: { createdAt: "desc" },
	});
}

export async function remove(id: Order["id"]) {
	return prisma.order.delete({ where: { id } });
}
