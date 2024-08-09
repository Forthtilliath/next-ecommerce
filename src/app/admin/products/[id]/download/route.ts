import fs from "node:fs/promises";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: Params<{ id: string }>) {
	const product = await db.products.get(id, { filePath: true, name: true });
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
