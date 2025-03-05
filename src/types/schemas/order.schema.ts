import { z } from 'zod';

// Lump Schema
const LumpSchema = z.object({
  id: z.number().optional(), // Optional because it's auto-generated
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  content: z.string().min(1, { message: 'Content is required' }),
  orderId: z.number().optional(), // Optional because it's a foreign key
});

// Order Schema
const createOrderSchema = z.object({
  id: z.number().optional(), // Optional because it's auto-generated
  recolectionAddress: z
    .string()
    .min(1, { message: 'Recolection address is required' }),
  scheduledDate: z.string().datetime({ message: 'Invalid date format' }), // Use string for datetime
  names: z.string().min(1, { message: 'Names are required' }),
  lastNames: z.string().min(1, { message: 'Last names are required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  destinyAddress: z.string().min(1, { message: 'Destiny address is required' }),
  department: z.string().min(1, { message: 'Department is required' }),
  municipality: z.string().min(1, { message: 'Municipality is required' }),
  reference: z.string().min(1, { message: 'Reference is required' }),
  notes: z.string().optional(), // Optional field
  lumps: z.array(LumpSchema).optional(), // Optional array of lumps
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type OrderI = CreateOrderDTO;
// Export the schemas
export { LumpSchema, createOrderSchema };
