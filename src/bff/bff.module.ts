/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// bff.module.ts
// src/bff/bff.module.ts
import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './bff.service';
import { VentaService } from '../application/services/venta.service';  
import { UsersService } from '../users/users.service';  
import { VentaRepositoryImpl } from 'src/infrastructure/repositories/venta.repository.impl';
import { VentaRepository } from 'src/domain/repositories/venta.repository';

@Module({
  imports: [
  ],
  controllers: [BffController],
  providers: [BffService, VentaService, UsersService, VentaService,
    { provide: 'VentaRepository', useClass: VentaRepositoryImpl },
  ] 
})
export class BffModule {}
