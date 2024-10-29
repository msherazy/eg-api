import { type User } from '../../user';

export interface AuthenticatedRequest extends Request {
	user: Omit<User, 'password'>;
}
