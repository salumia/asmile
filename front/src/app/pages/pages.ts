export class Pages {
	id: number;
    title: string;
    type: number;
    template: string;
    redirect_url: string;
    description: string;
    cover_image: string;
    static_menu_link: number;
    files:any;
    created_at: Date;
    updated_at: Date;
    constructor(data: any) {
        // Set normal fields
        this.id = data.id;
        this.title = data.title;
        this.type = data.type;
        this.template = data.template;
        this.redirect_url = data.redirect_url;
        this.description = data.description;
        this.cover_image = data.cover_image;
        this.static_menu_link = data.static_menu_link;
        this.files  = data.get_files;

        // Parse date fields
        this.created_at = new Date(Date.parse(data.created_at));
        this.updated_at = new Date(Date.parse(data.updated_at));
        // Parse other fields
    }
}
