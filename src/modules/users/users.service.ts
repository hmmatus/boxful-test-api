import { CreateUserDTO, UserI } from '@/types/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from 'src/consts/mongo';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private readonly userModel: Model<UserI>,
  ) {}

  async findAllUSers(): Promise<UserI[]> {
    return this.userModel.find().exec();
  }

  async register(data: CreateUserDTO): Promise<UserI> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }
}
