import prisma from "./prisma";

export async function getCountUsers() {
	return prisma.user.count();
}
