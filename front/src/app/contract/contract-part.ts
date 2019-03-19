export class ContractPart {
	id: number;
	body: string;
	title: string;
	contract_id: number;
	is_deleted: number;
	is_edited: number;
	modified: number;
	newly_added: number;
	status: number;
	
	created_at: Date;
	updated_at: Date;
	
	constructor(data: any) {
		// Set normal fields
		this.id = data.id;
		this.body = data.body;
		this.title = data.title;
		this.contract_id = data.contract_id;
		this.is_deleted = data.is_deleted;
		this.is_edited = data.is_edited;
		this.modified = data.modified;
		this.newly_added = data.newly_added;		
		this.status = data.status;
				
		this.created_at = new Date(Date.parse(data.created_at));
		this.updated_at = new Date(Date.parse(data.updated_at));
	}
}
