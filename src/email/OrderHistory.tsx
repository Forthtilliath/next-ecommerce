import type { Order, Product } from "@prisma/client";
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
} from "@react-email/components";
import React from "react";
import { OrderInformation } from "./_components/OrderInformation";

type Props = {
	orders: Array<
		Pick<Order, "id" | "createdAt" | "pricePaidInCents"> & {
			product: Pick<Product, "name" | "imagePath" | "description">;
		} & {
			downloadVerificationId: string;
		}
	>;
};
OrderHistoryEmail.PreviewProps = {
	orders: [
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: "Product name",
				description: "Product description",
				imagePath: "/products/40e38640-9b9a-4548-bda9-b39e26b03773-IMG_2526.JPG",
			},
		},
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: "Product 2",
				description: "Product 2 description",
				imagePath:
					"/products/feb6a309-1912-4538-8b19-3b9205d16300-screencapture-green-bank-swart-vercel-app-simulator-2024-08-07-00_03_55.png",
			},
		},
	],
} satisfies Props;
export default function OrderHistoryEmail({ orders }: Props) {
	return (
		<Html>
			<Preview>Order History & Downloads</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Order History</Heading>
						{orders.map((order, index) => (
							<React.Fragment key={order.id}>
								<OrderInformation
									order={order}
									product={order.product}
									downloadVerificationId={order.downloadVerificationId}
								/>
								{index < orders.length - 1 && <Hr />}
							</React.Fragment>
						))}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
