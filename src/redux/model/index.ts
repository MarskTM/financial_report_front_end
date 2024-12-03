
// ------------------------------- Authentication model ---------------------------
export interface User {
	id: string;
	username: string;
	role: string[];
}

export interface Credentials {
	username: string;
	password: string;
}

// -------------------------------- News Model --------------------------------
export interface News {
	id: string;
	title: string;
	content: string;
	author: string;
	createdAt: Date;
}

