declare global {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	type WithChildren<T = {}> = Readonly<T & { children?: React.ReactNode }>;

	type Params<T> = Readonly<{ params: T }>;

	namespace NodeJS {
		interface ProcessEnv {
			// NODE_ENV: "development" | "production" | "test";
			ADMIN_USERNAME: string;
			ADMIN_HASHED_PASSWORD: string;
		}
	}
}

export type {};
