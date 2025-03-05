import { Connection } from 'mongoose';
import { MONGO_DATABASE_CONNECTION, USER_MODEL } from 'src/consts/mongo';
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [MONGO_DATABASE_CONNECTION],
  },
];
