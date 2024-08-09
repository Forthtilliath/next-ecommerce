import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/lib/db";
import { Suspense } from "react";

export default function ProductsPage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{/* biome-ignore lint/suspicious/noArrayIndexKey: display array of skeleton products */}
			<Suspense fallback={Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)}>
				<ProductsSuspense />
			</Suspense>
		</div>
	);
}

async function ProductsSuspense() {
	const products = await db.products.getAllActive();

	return products.map((product) => <ProductCard key={product.id} {...product} />);
}
