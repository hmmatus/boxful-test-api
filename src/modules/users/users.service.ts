import {
  CreateUserDTO,
  LoginUserDTO,
  UserI,
} from '@/types/schemas/user.schema';
import { comparePasswords, encodePassword } from '@/utils/bcrypt';
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { USER_MODEL } from 'src/consts/mongo';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @Inject(USER_MODEL)
    private readonly userModel: Model<UserI>,
    private readonly jwtService: JwtService,
  ) {}

  async findAllUSers(): Promise<UserI[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<UserI | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async register(data: CreateUserDTO): Promise<UserI> {
    this.logger.log(`Registering user with email: ${data.email}`);
    const encodedPassword = encodePassword(data.password);
    const newUser = new this.userModel({ ...data, password: encodedPassword });
    return newUser.save();
  }

  async login(data: LoginUserDTO): Promise<{
    jwt: string;
  }> {
    this.logger.log(`Logging in user with email: ${data.email}`);
    const user = await this.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = comparePasswords(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      jwt: await this.jwtService.signAsync({
        sub: user.id,
        username: user.email,
      }),
    };
  }
}
