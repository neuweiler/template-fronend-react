import {User} from "./User";

export interface Owner {
	id: number;
	name: string;
	active: boolean;
	users?: User[];
}

export const defaultOwner = () => {
	return {name: '', active: true} as Owner;
}
