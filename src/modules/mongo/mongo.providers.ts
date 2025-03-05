import * as mongoose from 'mongoose';
import config from '@/config/config';
import { MONGO_DATABASE_CONNECTION } from 'src/consts/mongo';
export const mongoDatabaseProviders = [
  {
    provide: MONGO_DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(config.MONGO_DATABASE_URL),
  },
];
