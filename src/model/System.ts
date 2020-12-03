import {SystemType} from "./SystemType";
import {Owner} from "./Owner";

export interface System {
	id: number;
	owner: Owner;
	name: string;
	type: SystemType;
	start: Date;
	end: Date;
}
