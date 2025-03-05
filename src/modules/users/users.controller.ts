import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import {
  CreateUserDTO,
  CreateUserSchema,
  LoginUserDTO,
  LoginUserSchema,
  UserI,
} from '@/types/schemas/user.schema';
import { EmailExistsPipe } from '@/pipes/users-email-validation.pipe';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users', type: [UserI] })
  async findAllUsers() {
    return this.usersService.findAllUSers();
  }

  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ status: 200, description: 'Login user', type: UserI })
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.usersService.login(loginUserDTO);
  }
  @Post('register')
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'Register user', type: UserI })
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @UsePipes(EmailExistsPipe)
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.register(createUserDTO);
  }
}
