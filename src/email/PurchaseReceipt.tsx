import type { Order, Product } from "@prisma/client";
import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./_components/OrderInformation";

type Props = {
	product: Pick<Product, "name" | "imagePath" | "description">;
	order: Pick<Order, "id" | "createdAt" | "pricePaidInCents">;
	downloadVerificationId: string;
};
PurchaseReceiptEmail.PreviewProps = {
	product: {
		name: "Product name",
		description: "Product description",
		imagePath: "/products/40e38640-9b9a-4548-bda9-b39e26b03773-IMG_2526.JPG",
	},
	order: {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		pricePaidInCents: 10000,
	},
	downloadVerificationId: crypto.randomUUID(),
} satisfies Props;
export default function PurchaseReceiptEmail({ product, order, downloadVerificationId }: Props) {
	return (
		<Html>
			<Preview>Download {product.name} and view receipt</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Purchase Receipt</Heading>
						<OrderInformation
							product={product}
							order={order}
							downloadVerificationId={downloadVerificationId}
						/>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
