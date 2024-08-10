import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import { PageHeader } from "../_components/PageHeader";
import { DeleteDropDownItem } from "./_components/OrderActions";

export default function OrdersPage() {
	return (
		<>
			<PageHeader>Sales</PageHeader>
			<OrdersTable />
		</>
	);
}

async function OrdersTable() {
	const orders = await db.orders.getAll();

	if (orders.length === 0) {
		return <p>No sales found</p>;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Orders</TableHead>
					<TableHead>Value</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id}>
						<TableCell>{order.product.name}</TableCell>
						<TableCell>{order.user.email}</TableCell>
						<TableCell>{formatCurrency(order.pricePaidInCents / 100)}</TableCell>
						<TableCell className="text-center">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreVertical />
									<span className="sr-only">Actions</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DeleteDropDownItem id={order.id} />
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
