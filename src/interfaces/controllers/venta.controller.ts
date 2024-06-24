/* eslint-disable prettier/prettier */
// src/interfaces/controllers/venta.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { VentaService } from '../../application/services/venta.service';
import { CreateVentaDto } from '../dtos/create-venta.dto';
import { Venta } from '../../domain/entities/venta.entity';

@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  async crearVenta(@Body() createVentaDto: CreateVentaDto): Promise<void> {
    const { cliente, arma, cantidad, precioTotal } = createVentaDto;
    const venta = new Venta(
      Math.random().toString(36).substring(7), // Generar ID aleatorio
      cliente,
      arma,
      cantidad,
      precioTotal,
      new Date(),
    );
    await this.ventaService.crearVenta(venta);
  }

  @Get(':id')
  async obtenerVenta(@Param('id') id: string): Promise<Venta> {
    return this.ventaService.obtenerVenta(id);
  }

  @Get()
  async listarVentas(): Promise<Venta[]> {
    return this.ventaService.listarVentas();
  }
}
