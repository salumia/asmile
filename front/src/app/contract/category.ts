export class Category {
	id: number;
	industry_id: number;
	name: string;
	status: number;
	
	industry_data:any;
	
	created_at: Date;
	updated_at: Date;
	
	constructor(data: any) {
		// Set normal fields
		this.id = data.id;
		this.industry_id = data.industry_id;
		this.name = data.name;
		this.status = data.status;
		this.industry_data = data.get_industry_data;
		this.created_at = new Date(Date.parse(data.created_at));
		this.updated_at = new Date(Date.parse(data.updated_at));
	}
}
