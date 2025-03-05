import { UsersService } from '@/modules/users/users.service';
import { LoginUserDTO } from '@/types/schemas/user.schema';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: LoginUserDTO) {
    const user = await this.usersService.findByEmail(value.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return value;
  }
}
