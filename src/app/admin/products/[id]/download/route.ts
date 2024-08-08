import { getProduct } from "@/app/admin/_actions/products";
import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: Params<{ id: string }>
) {
  const product = await getProduct(id, { filePath: true, name: true });

  if (!product) return notFound();

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const filename = product.name.replace(/\s+/g, "-");
  const extension = product.filePath.split(".").pop();

  return new NextResponse(file, {
    status: 200,
    headers: {
      "Content-Length": size.toString(),
      "Content-Disposition": `attachment; filename="${filename}.${extension}"`,
    },
  });
}
