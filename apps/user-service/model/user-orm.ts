import createUser from './repository';

// need to separate orm functions from repository to decouple business logic from persistence
export default async function ormCreateUser(username: any, password: any) {
  try {
    const newUser = await createUser({ username, password });
    newUser.save();
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR: Could not create new user');
    return { err };
  }
}
