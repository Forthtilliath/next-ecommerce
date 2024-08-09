"use server";

import fs from "node:fs/promises";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine((file) => {
	return file.size === 0 || file.type.startsWith("image/");
});

const createSchema = z.object({
	name: z.string().min(1),
	priceInCents: z.coerce.number().int().min(1),
	description: z.string().min(1),
	file: fileSchema.refine((file) => file.size > 0, "Required"),
	image: imageSchema.refine((file) => file.size > 0, "Required"),
});

const updateSchema = createSchema.extend({
	file: fileSchema.optional(),
	image: imageSchema.optional(),
});

export async function createProduct(_prevState: unknown, formData: FormData) {
	const result = createSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) {
		return result.error.formErrors.fieldErrors;
	}

	const { name, priceInCents, description, file, image } = result.data;

	// Save files
	fs.mkdir("products", { recursive: true });
	const filePath = `products/${crypto.randomUUID()}-${file.name}`;
	fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

	fs.mkdir("public/products", { recursive: true });
	const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
	fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()));

	await db.products.create({
		name,
		priceInCents,
		description,
		filePath,
		imagePath,
	});

	redirect("/admin/products");
}

export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
	const result = updateSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) {
		return result.error.formErrors.fieldErrors;
	}

	const { name, priceInCents, description, file, image } = result.data;
	const product = await db.products.get(id);
	if (!product) return notFound();

	let filePath = product.filePath;
	if (file && file.size > 0) {
		fs.unlink(product.filePath);
		filePath = `products/${crypto.randomUUID()}-${file.name}`;
		fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
	}

	let imagePath = product.imagePath;
	if (image && image.size > 0) {
		fs.unlink(`public${product.imagePath}`);
		imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
		fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()));
	}

	await db.products.update({ id, name, priceInCents, description, filePath, imagePath });

	redirect("/admin/products");
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
	await db.products.update({ id, isAvailableForPurchase });
}

export async function deleteProduct(id: string) {
	const product = await db.products.delete(id);
	if (!product) return notFound();

	fs.unlink(product.filePath);
	fs.unlink(`public/${product.imagePath}`);
}
