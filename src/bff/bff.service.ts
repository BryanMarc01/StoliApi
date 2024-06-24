/* eslint-disable prettier/prettier */
// src/bff/bff.service.ts
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { VentaService } from '../application/services/venta.service';
import { UsersService } from '../users/users.service';
import { Venta } from '../domain/entities/venta.entity';


@Injectable()
export class BffService {
  constructor(
    private readonly ventaService: VentaService,
    private readonly usersService: UsersService,
  ) {}

  async getVentasForFrontend(param: string) {
    const ventas = await this.ventaService.listarVentas();
    return ventas.filter(venta => venta.param === param);
  }

  async createVenta(venta: Venta) {
    return this.ventaService.crearVenta(venta);
  }

  async getUsersForFrontend() {
    const users = await this.usersService.findAll();
    return users;
  }

  async createUser(username: string, password: string) {
    return this.usersService.create(username, password);
  }

  async getUser(username: string) {
    const user = await this.usersService.findOne(username);
    return user;
  }
}
