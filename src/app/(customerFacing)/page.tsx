import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import type { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
	return (
		<main className="space-y-12">
			<ProductGridSection
				title="Most Popular"
				productsFetcher={db.products.getMostPopularProducts}
			/>
			<ProductGridSection title="Newest   " productsFetcher={db.products.getNewestProducts} />
		</main>
	);
}

type ProductsFetcher = () => Promise<Product[]>;
type ProductGridSectionProps = {
	title: string;
	productsFetcher: ProductsFetcher;
};

function ProductGridSection({ title, productsFetcher }: ProductGridSectionProps) {
	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<h2 className="text-3xl font-bold">{title}</h2>
				<Button variant="outline" asChild>
					<Link href="/products" className="space-x-2">
						<span>View All</span>
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* biome-ignore lint/suspicious/noArrayIndexKey: display array of skeleton products */}
				<Suspense fallback={Array.from({ length: 3 }, (_, i) => <ProductCardSkeleton key={i} />)}>
					<ProductSuspense productsFetcher={productsFetcher} />
				</Suspense>
			</div>
		</div>
	);
}

type ProductSuspenseProps = {
	productsFetcher: ProductsFetcher;
};
async function ProductSuspense({ productsFetcher }: ProductSuspenseProps) {
	const products = await productsFetcher();
	return products.map((product) => <ProductCard key={product.id} {...product} />);
}
