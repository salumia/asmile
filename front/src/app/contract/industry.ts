export class Industry {
	id: number;
	name: string;
	status: number;
	created_at: Date;
	updated_at: Date;
	
	constructor(data: any) {
		// Set normal fields
		this.id = data.id;
		this.name = data.name;
		this.status = data.status;
		this.created_at = new Date(Date.parse(data.created_at));
		this.updated_at = new Date(Date.parse(data.updated_at));
	}
}
