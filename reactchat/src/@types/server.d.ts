export interface Server {
	id: number;
	name: string;
	server: string;
	description: string;
	icon: string;
	category: string;
	banner: string;
	channels: {
		id: number;
		name: string;
		server: string;
		topic: string;
		owner: string;
	}[];
}
