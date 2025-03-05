import { Module } from '@nestjs/common';
import { MongoDatabaseModule } from '../mongo/mongo.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import config from '@/config/config';
@Module({
  imports: [
    MongoDatabaseModule,
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
