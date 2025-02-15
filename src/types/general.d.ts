export type TBaseColors = "default" | "primary" | "secondary" | "danger" | "warning" | "success";

export type TBaseVariants = "solid" | "bordered" | "light";

export type TBaseSize =
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl"
	| "7xl"
	| "8xl"
	| "full";

export type TBaseRadius = Extract<TBaseSize, "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"> | "none";

export interface IAPIResponse<T = any> {
	status: "success" | "fail" | "error";
	message?: string;
	results: T;
}

export type TContentType = "application/json" | "multipart/form-data";
