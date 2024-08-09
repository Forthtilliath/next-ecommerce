import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
	const data = await db.orders.getSales();

	return {
		amount: (data._sum.pricePaidInCents ?? 0) / 100,
		numberOfSales: data._count.id,
	};
}

async function getUsersData() {
	const [userCount, orderData] = await Promise.all([
		db.users.getCountUsers(),
		db.orders.getSumOfAllOrders(),
	]);

	return {
		userCount,
		averageValuePerUser:
			userCount > 0 ? (orderData._sum.pricePaidInCents || 0) / userCount / 100 : 0,
	};
}

async function getProductsData() {
	const [activeCount, inactiveCount] = await Promise.all([
		db.products.getCountActiveProducts(),
		db.products.getCountInactiveProducts(),
	]);

	return {
		activeCount,
		inactiveCount,
	};
}

export default async function AdminDashboard() {
	const [salesData, usersData, productsData] = await Promise.all([
		getSalesData(),
		getUsersData(),
		getProductsData(),
	]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<DashboardCard
				title="Sales"
				subtile={`${formatNumber(salesData.numberOfSales)} Orders`}
				body={formatCurrency(salesData.amount)}
			/>
			<DashboardCard
				title="Customers"
				subtile={`${formatCurrency(usersData.averageValuePerUser)} Average Value`}
				body={formatNumber(usersData.userCount)}
			/>
			<DashboardCard
				title="Active Products"
				subtile={`${formatNumber(productsData.inactiveCount)} Inactive Products`}
				body={formatNumber(productsData.activeCount)}
			/>
		</div>
	);
}

type DashboardCardProps = {
	title: string;
	subtile: string;
	body: string;
};
function DashboardCard({ title, subtile, body }: DashboardCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtile}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{body}</p>
			</CardContent>
		</Card>
	);
}
