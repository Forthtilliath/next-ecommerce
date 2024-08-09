import db from "@/lib/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({ params: { id } }: Params<{ id: string }>) {
	const product = await db.products.get(id);
	return (
		<>
			<PageHeader>Edit Product</PageHeader>
			<ProductForm product={product} />
		</>
	);
}
