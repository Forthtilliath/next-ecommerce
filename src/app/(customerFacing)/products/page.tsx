import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { cache } from "@/lib/cache";
import db from "@/lib/db";
import { Suspense } from "react";

const getProducts = cache(db.products.getAllActive, ["/products", "getProducts"], {
	revalidate: 60 * 60 * 24,
});

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
	const products = await getProducts();

	return products.map((product) => <ProductCard key={product.id} {...product} />);
}
