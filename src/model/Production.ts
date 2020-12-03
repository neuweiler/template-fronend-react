import {System} from "./System";

export interface Production {
	id: number;
	system: System;
	value: number;
	year: number;
	month: number;
	createdAt: string;
	createdBy: string;
}
