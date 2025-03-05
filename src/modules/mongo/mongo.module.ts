import { Module } from '@nestjs/common';
import { mongoDatabaseProviders } from './mongo.providers';

@Module({
  providers: [...mongoDatabaseProviders],
  exports: [...mongoDatabaseProviders],
})
export class MongoDatabaseModule {}
