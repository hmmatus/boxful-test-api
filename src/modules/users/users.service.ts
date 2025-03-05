import {
  CreateUserDTO,
  LoginUserDTO,
  UserI,
} from '@/types/schemas/user.schema';
import { comparePasswords, encodePassword } from '@/utils/bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

  async findByEmail(email: string): Promise<UserI | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async register(data: CreateUserDTO): Promise<UserI> {
    const encodedPassword = encodePassword(data.password);
    const newUser = new this.userModel({ ...data, password: encodedPassword });
    return newUser.save();
  }

  async login(data: LoginUserDTO): Promise<{
    jwt: string;
  }> {
    const user = await this.findByEmail(data.email);
    const isPasswordValid = comparePasswords(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      jwt: 'test',
    };
  }
}
