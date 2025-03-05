import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Lump Schema
const LumpSchema = z.object({
  id: z.number().optional().describe('Lump Id'), // Optional because it's auto-generated
  length: z.number().positive().describe('Lump length'),
  width: z.number().positive().describe('Lump Width'),
  height: z.number().positive().describe('Lump height'),
  weight: z.number().positive().describe('Lump weight'),
  content: z
    .string()
    .min(1, { message: 'Content is required' })
    .describe('Lump content'),
  orderId: z.number().optional().describe('Lump orderId'), // Optional because it's a foreign key
});

// Order Schema
const createOrderSchema = z.object({
  id: z.number().optional().describe('Order Id'), // Optional because it's auto-generated
  recolectionAddress: z
    .string()
    .min(1, { message: 'Recolection address is required' })
    .describe('Order recolectionAddress'),
  scheduledDate: z
    .string()
    .datetime({ message: 'Invalid date format' })
    .describe('Order scheduledDate'), // Use string for datetime
  names: z
    .string()
    .min(1, { message: 'Names are required' })
    .describe('Order names'),
  lastNames: z
    .string()
    .min(1, { message: 'Last names are required' })
    .describe('Order LastNames'),
  email: z.string().email({ message: 'Invalid email address' }).describe(''),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .describe('Order phone'),
  destinyAddress: z
    .string()
    .min(1, { message: 'Destiny address is required' })
    .describe('Order destinyAddress'),
  department: z
    .string()
    .min(1, { message: 'Department is required' })
    .describe(''),
  municipality: z
    .string()
    .min(1, { message: 'Municipality is required' })
    .describe('Order municipality'),
  reference: z
    .string()
    .min(1, { message: 'Reference is required' })
    .describe('order reference'),
  notes: z.string().optional().describe(''), // Optional field
  lumps: z.array(LumpSchema).optional().describe(''), // Optional array of lumps
});

export class CreateOrderDTO extends createZodDto(createOrderSchema) {}
export class OrderI extends CreateOrderDTO {}
// Export the schemas
export { LumpSchema, createOrderSchema };
