import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import {
  CreateUserDTO,
  CreateUserSchema,
  LoginUserDTO,
  LoginUserSchema,
} from '@/types/schemas/user.schema';
import { EmailExistsPipe } from '@/pipes/users-email-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUSers();
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.usersService.login(loginUserDTO);
  }
  @UsePipes()
  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @UsePipes(EmailExistsPipe)
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.register(createUserDTO);
  }
}
