import bcryptjs from 'bcryptjs';
import { createUser } from './repository';

// need to separate orm functions from repository to decouple business logic from persistence
export default async function ormCreateUser(username: any, password: any) {
  const saltRounds = 10;
  const salt = await bcryptjs.genSalt(saltRounds);
  const passwordHash = await bcryptjs.hash(password, salt);
  const newUser = await createUser({ username, password: passwordHash });
  return newUser;
}
