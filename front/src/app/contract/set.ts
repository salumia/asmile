export class Set {
	id: number;
	title: string;
	user_id: number;
	status: number;
	
	parts_data:any;
	
	created_at: Date;
	updated_at: Date;
	
	constructor(data: any) {
		// Set normal fields
		this.id = data.id;
		this.title = data.title;
		this.user_id = data.user_id;
		this.status = data.status;
		this.parts_data = data.get_parts;
		
		this.created_at = new Date(Date.parse(data.created_at));
		this.updated_at = new Date(Date.parse(data.updated_at));
	}
}
