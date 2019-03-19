import { User } from './user';

export class UserChangeResponse {
  message: string;
  statusCode: number;
  user: User;
}
