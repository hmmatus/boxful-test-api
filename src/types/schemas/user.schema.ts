import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
const CreateUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});
export class LoginUserDTO extends createZodDto(LoginUserSchema) {}
export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
export class UserI extends CreateUserDTO {}
export { CreateUserSchema, LoginUserSchema };
