import { createSession } from './repository';

// need to separate orm functions from repository to decouple business logic from persistence
export default function ormCreateSession(token: any) {
  const newSession = createSession({ token });
  return newSession;
}
