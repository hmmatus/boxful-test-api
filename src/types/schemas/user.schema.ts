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

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UserI = CreateUserDTO;
export { CreateUserSchema, LoginUserSchema };
