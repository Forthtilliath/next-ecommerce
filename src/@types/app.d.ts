declare global {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  type WithChildren<T = {}> = Readonly<T & { children?: React.ReactNode }>;
}

export type {};
