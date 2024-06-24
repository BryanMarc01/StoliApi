/* eslint-disable prettier/prettier */
// bff.controller.ts
// src/bff/bff.controller.ts
// src/bff/bff.controller.ts
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { BffService } from './bff.service';
import { Venta } from '../domain/entities/venta.entity';
import { User } from '../users/users.service';

@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Get('ventas')
  getVentas(@Query('param') param: string) {
    return this.bffService.getVentasForFrontend(param);
  }

  @Post('ventas')
  createVenta(@Body() venta: Venta) {
    return this.bffService.createVenta(venta);
  }

  @Get('users')
  getUsers() {
    return this.bffService.getUsersForFrontend();
  }

  @Post('users')
  createUser(@Body() user: User) {
    return this.bffService.createUser(user.username, user.password);
  }

  @Get('users/:username')
  getUser(@Param('username') username: string) {
    return this.bffService.getUser(username);
  }
}
