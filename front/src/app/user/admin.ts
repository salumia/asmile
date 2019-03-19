export class Admin {
  id: number;
  name: string;
  email: string;
  phone: number;
  password: string;

  api_token_expires: Date;
  created_at: Date;
  updated_at: Date;

  isLoggedIn: boolean;

  constructor(data: any) {
    // Set normal fields
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;

    // Parse date fields
    this.api_token_expires = new Date(Date.parse(data.api_token_expires));
    this.created_at = new Date(Date.parse(data.created_at));
    this.updated_at = new Date(Date.parse(data.updated_at));

    // Parse other fields
    this.isLoggedIn = this.api_token_expires.getTime() > Date.now();
  }
}
