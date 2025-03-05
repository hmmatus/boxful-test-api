import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  CreateOrderDTO,
  createOrderSchema,
} from 'src/types/schemas/order.schema';
import { OrdersService } from './orders.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Post()
  @UsePipes(new ZodValidationPipe(createOrderSchema))
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    try {
      return this.orderService.createOrder(createOrderDTO);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.message,
        });
      }
      throw new BadRequestException(error);
    }
  }
}
