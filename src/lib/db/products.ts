"use server";

import type { Product } from "@prisma/client";
import prisma from "./prisma";

export async function create(data: ProductCreate) {
	return prisma.product.create({ data });
}

export async function get<T extends ProductSelect>(id: Product["id"], select: T = {} as T) {
	return prisma.product.findUnique({ where: { id }, select });
}

export async function getAll() {
	return prisma.product.findMany({
		select: {
			id: true,
			name: true,
			priceInCents: true,
			isAvailableForPurchase: true,
			_count: { select: { orders: true } },
		},
		orderBy: { name: "asc" },
	});
}

export async function getAllActive() {
	return prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { name: "asc" },
	});
}

export async function update({ id, ...data }: ProductUpdate) {
	return prisma.product.update({
		where: { id },
		data,
	});
}

export async function remove(id: Product["id"]) {
	return prisma.product.delete({ where: { id } });
}

export async function getNewestProducts() {
	return prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { createdAt: "desc" },
		take: 6,
	});
}

export async function getMostPopularProducts() {
	return prisma.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { orders: { _count: "desc" } },
		take: 6,
	});
}

export async function getCountActiveProducts() {
	return prisma.product.count({ where: { isAvailableForPurchase: true } });
}

export async function getCountInactiveProducts() {
	return prisma.product.count({ where: { isAvailableForPurchase: false } });
}
