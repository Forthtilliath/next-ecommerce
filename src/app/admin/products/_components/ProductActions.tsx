"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import db from "@/lib/db";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";

export function ActiveToggleDropdownItem({
	id,
	isAvailableForPurchase,
}: {
	id: string;
	isAvailableForPurchase: boolean;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await db.products.update({ id, isAvailableForPurchase: !isAvailableForPurchase });
					router.refresh();
				});
			}}
		>
			{isAvailableForPurchase ? "Deactivate" : "Activate"}
		</DropdownMenuItem>
	);
}

export function DeleteDropdownItem({
	id,
	disabled,
}: {
	id: string;
	disabled: boolean;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			variant="destructive"
			disabled={disabled || isPending}
			onClick={() => {
				startTransition(async () => {
					await deleteProduct(id);
					router.refresh();
				});
			}}
		>
			Delete
		</DropdownMenuItem>
	);
}
