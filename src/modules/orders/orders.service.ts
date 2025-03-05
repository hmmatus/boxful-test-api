import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDTO } from '@/types/schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    const formattedData: Prisma.OrderCreateInput = {
      recolectionAddress: data.recolectionAddress,
      scheduledDate: data.scheduledDate,
      names: data.names,
      lastNames: data.lastNames,
      email: data.email,
      phone: data.phone,
      destinyAddress: data.destinyAddress,
      department: data.department,
      municipality: data.municipality,
      reference: data.reference,
      notes: data.notes,
      lumps: {
        create: data.lumps.map((lump) => ({
          length: lump.length,
          width: lump.width,
          height: lump.height,
          weight: lump.weight,
          content: lump.content,
        })),
      },
    };
    return this.prismaService.order.create({ data: formattedData });
  }

  async getAllOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
}
