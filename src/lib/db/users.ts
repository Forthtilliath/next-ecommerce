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
