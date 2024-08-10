"use server";

import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function deleteUser(id: string) {
	const user = await db.users.delete(id);
	if (!user) return notFound();

	return user;
}
