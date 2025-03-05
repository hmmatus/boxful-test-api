import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { CreateUserDTO, CreateUserSchema } from '@/types/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUSers();
  }
  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.register(createUserDTO);
  }
}
