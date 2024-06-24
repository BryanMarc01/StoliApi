/* eslint-disable prettier/prettier */
// src/domain/repositories/venta.repository.ts
import { Venta } from '../entities/venta.entity';

export interface VentaRepository {
  save(venta: Venta): Promise<void>;
  findById(id: string): Promise<Venta>;
  findAll(): Promise<Venta[]>;
}