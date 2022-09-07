import { createSession } from './repository';

// need to separate orm functions from repository to decouple business logic from persistence
export default async function ormCreateSession(token: any) {
  const newSession = await createSession({ token });
  return newSession;
}
