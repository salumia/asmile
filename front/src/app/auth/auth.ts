export class Auth {

  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

}

export class ResetEmail {
  email: string;
  constructor(email: string) {
     this.email = email;
  }
}
