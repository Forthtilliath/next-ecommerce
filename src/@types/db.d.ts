import type { Prisma } from "@prisma/client";

declare global {
	type ProductSelect = Prisma.ProductSelect<object>;
	type ProductCreate = Prisma.ProductCreateInput;
	type ProductUpdate = {
		id: Required<Prisma.ProductWhereUniqueInput["id"]>;
	} & Omit<Prisma.ProductUpdateInput, "id">;

	type UserSelect = Prisma.UserSelect<object>;
	// type UserPayload<T> = Prisma.UserGetPayload<{
	// 	select: T;
	// }>;
}
