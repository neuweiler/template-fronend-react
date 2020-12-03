import {Owner} from "./Owner";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	owner: Owner;
}
