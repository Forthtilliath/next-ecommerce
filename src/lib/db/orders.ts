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
