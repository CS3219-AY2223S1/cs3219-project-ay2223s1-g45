/* eslint-disable no-else-return */
import ormCreateUser from '../model/user-orm';

export default async function createUser(req: any, res: any) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const resp = await ormCreateUser(username, password);
      // eslint-disable-next-line no-console
      console.log(resp);
      if (
        (
          resp as {
            err: unknown;
          }
        ).err
      ) {
        return res.status(400).json({ message: 'Could not create a new user!' });
      } else {
        // eslint-disable-next-line no-console
        console.log(`Created new user ${username} successfully!`);
        return res.status(201).json({ message: `Created new user ${username} successfully!` });
      }
    } else {
      return res.status(400).json({ message: 'Username and/or Password are missing!' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Database failure when creating new user!' });
  }
}
