import fs from "node:fs/promises";
import db from "@/lib/db";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params: { downloadVerificationId } }: Params<{ downloadVerificationId: string }>,
) {
	const data = await db.downloadVerifications.get(downloadVerificationId);
	if (!data) {
		return NextResponse.redirect(new URL("/products/download/expired", req.url));
	}

	const { size } = await fs.stat(data.product.filePath);
	const file = await fs.readFile(data.product.filePath);
	const filename = data.product.name.replace(/\s+/g, "-");
	const extension = data.product.filePath.split(".").pop();

	return new NextResponse(file, {
		status: 200,
		headers: {
			"Content-Length": size.toString(),
			"Content-Disposition": `attachment; filename="${filename}.${extension}"`,
		},
	});
}
