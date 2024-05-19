import { User } from '../entities/User';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('user1', 'Ay An', []);
  });

  it('should create a new user with provided properties', () => {
    expect(user.id).toBe('user1');
    expect(user.name).toBe('Ay An');
    expect(user.fleets).toEqual([]);
  });

  it('should add a new fleet', () => {
    user.addNewFleet('fleet1');

    expect(user.fleets).toContain('fleet1');
  });
});
