/* eslint-disable prettier/prettier */
// src/application/services/venta.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { VentaRepository } from '../../domain/repositories/venta.repository';
import { Venta } from '../../domain/entities/venta.entity';

@Injectable()
export class VentaService {
  constructor(
    @Inject('VentaRepository') private readonly ventaRepository: VentaRepository,
  ) {}

  async crearVenta(venta: Venta): Promise<void> {
    await this.ventaRepository.save(venta);
  }

  async obtenerVenta(id: string): Promise<Venta> {
    return this.ventaRepository.findById(id);
  }

  async listarVentas(): Promise<Venta[]> {
    return this.ventaRepository.findAll();
  }
}
