export class Contract {
	id: number;
	type: string;
	name: string;
	description: string;
	industry_id: number;
	category_id: number;
	sender_id: number;
	receiver_id: number;
	email: string;
	receiver_role: string;
	sender_flag: number;
	receiver_flag: number;
	status: number;
	
	get_category_data:any;
	get_contract_parts:any;
	get_sender_data:any;
	get_receiver_data:any;
	
	created_at: Date;
	updated_at: Date;
	
	constructor(data: any) {
		// Set normal fields
		this.id = data.id;
		this.type = data.type;
		this.name = data.name;
		this.description = data.description;
		this.industry_id = data.industry_id;
		this.category_id = data.category_id;
		this.sender_id = data.sender_id;
		this.receiver_id = data.receiver_id;
		this.email = data.email;
		this.receiver_role = data.receiver_role;
		this.sender_flag = data.sender_flag;
		this.receiver_flag = data.receiver_flag;
		this.status = data.status;
		
		this.get_category_data = data.get_category_data;
		this.get_contract_parts = data.get_contract_parts;
		this.get_sender_data = data.get_sender_data;
		this.get_receiver_data = data.get_receiver_data;
		
		this.created_at = new Date(Date.parse(data.created_at));
		this.updated_at = new Date(Date.parse(data.updated_at));
	}
}
