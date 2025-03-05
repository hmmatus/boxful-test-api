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
  OrderI,
} from 'src/types/schemas/order.schema';
import { OrdersService } from './orders.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all orders', type: [OrderI] })
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Post()
  @UsePipes(new ZodValidationPipe(createOrderSchema))
  @ApiBody({ type: CreateOrderDTO })
  @ApiResponse({ type: OrderI, status: 201, description: 'Create order' })
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
