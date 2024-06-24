/* eslint-disable prettier/prettier */
// src/infrastructure/repositories/venta.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { VentaRepository } from '../../domain/repositories/venta.repository';
import { Venta } from '../../domain/entities/venta.entity';

@Injectable()
export class VentaRepositoryImpl implements VentaRepository {
  private ventas: Venta[] = [];

  async save(venta: Venta): Promise<void> {
    this.ventas.push(venta);
  }

  async findById(id: string): Promise<Venta> {
    return this.ventas.find((venta) => venta.id === id);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventas;
  }
}
