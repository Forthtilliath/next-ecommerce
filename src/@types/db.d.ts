import type { Prisma } from "@prisma/client";

declare global {
  type ProductSelect = Prisma.ProductSelect<object>;
}
