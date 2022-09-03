import bcryptjs from 'bcryptjs';
import createUser from './repository';

const { hashSync } = bcryptjs;

// need to separate orm functions from repository to decouple business logic from persistence
export default function ormCreateUser(username: any, password: any) {
  const salt = 8;
  const passwordHash = hashSync(password, salt);
  const newUser = createUser({ username, password: passwordHash });
  return newUser;
}
