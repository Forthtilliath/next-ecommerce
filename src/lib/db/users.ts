import type { Product, User } from "@prisma/client";
import prisma from "./prisma";

export async function createOrUpdate({
	email,
	pricePaidInCents,
	productId,
}: {
	email: User["email"];
	pricePaidInCents: number;
	productId: Product["id"];
}) {
	return prisma.user.upsert({
		where: { email },
		create: { email, orders: { create: { pricePaidInCents, productId } } },
		update: { email, orders: { create: { pricePaidInCents, productId } } },
		select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
	});
}

export async function getCountUsers() {
	return prisma.user.count();
}

export async function get<T extends UserSelect>(email: User["email"], select: T = {} as T) {
	return prisma.user.findUnique({ where: { email }, select });
}

export async function getAll() {
	return prisma.user.findMany({
		select: {
			id: true,
			email: true,
			orders: {
				select: {
					pricePaidInCents: true,
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
}

export async function remove(id: User["id"]) {
	return prisma.user.delete({ where: { id } });
}
