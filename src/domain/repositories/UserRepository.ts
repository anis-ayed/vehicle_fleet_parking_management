import { User } from '../entities/User';

export interface UserRepository {
  save(user: User): void;
  findUserById(id: string): User;
}
