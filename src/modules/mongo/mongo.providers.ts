import * as mongoose from 'mongoose';
import config from '@/config/config';
export const mongoDatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(config.MONGO_DATABASE_URL),
  },
];
