import type { Product } from "@prisma/client";
import prisma from "./prisma";

const EXPIRATION = 60 * 60 * 24 * 1000;

export async function create(productId: Product["id"]) {
	return (
		await prisma.downloadVerification.create({
			data: {
				productId,
				expiresAt: new Date(Date.now() + EXPIRATION),
			},
		})
	).id;
}

export async function get(id: string) {
	return prisma.downloadVerification.findUnique({
		where: {
			id,
			expiresAt: { gt: new Date() },
		},
		select: {
			product: {
				select: {
					name: true,
					filePath: true,
				},
			},
		},
	});
}
