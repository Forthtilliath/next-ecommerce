declare global {
	// biome-ignore lint/complexity/noBannedTypes: accept no props with children
	type WithChildren<T = {}> = Readonly<T & { children?: React.ReactNode }>;

	type Params<T> = Readonly<{ params: T }>;
	// biome-ignore lint/suspicious/noExplicitAny: callback function
	type Callback = (...args: any[]) => void;
	// biome-ignore lint/suspicious/noExplicitAny: callback function
	type CallbackReturnsValue<T = any> = (...args: any[]) => T;
	// biome-ignore lint/suspicious/noExplicitAny: callback function
	type CallbackReturnsPromise<T = any> = (...args: any[]) => Promise<T>;

	namespace NodeJS {
		interface ProcessEnv {
			// app
			// NODE_ENV: "development" | "production" | "test";
			NEXT_PUBLIC_SERVER_URL: string;

			// admin
			ADMIN_USERNAME: string;
			ADMIN_HASHED_PASSWORD: string;

			// stripe
			NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;

			// mails
			RESEND_API_KEY: string;
			SENDER_EMAIL: string;
		}
	}
}

export type {};
