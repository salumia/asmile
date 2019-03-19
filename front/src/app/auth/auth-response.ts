export class AuthResponse {
  data: AuthData;
}

export class AuthData {

  id: number;
  name: string;
  email: string;
  role: string;
  api_token: string;
  api_token_expires: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.api_token = data.api_token;
    this.api_token_expires = data.api_token_expires;
  }

}
