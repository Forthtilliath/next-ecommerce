declare global {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	type WithChildren<T = {}> = Readonly<T & { children?: React.ReactNode }>;

	type Params<T> = Readonly<{ params: T }>;
}

export type {};
