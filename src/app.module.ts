/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentaController } from './interfaces/controllers/venta.controller';
import { VentaService } from './application/services/venta.service';
import { VentaRepositoryImpl } from './infrastructure/repositories/venta.repository.impl';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { UsersModule } from './users/users.module';
import { SqsModule } from './sqs/sqs.module';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/schemas/message.module';  // Importa MessageModule
import { MESSAGE_MODEL_NAME, MessageSchema } from './message/schemas/message.schema';
import { BffModule } from './bff/bff.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: MESSAGE_MODEL_NAME, schema: MessageSchema }]),
    BffModule,
    AuthModule,
    KafkaModule,
    UsersModule,
    ProductsModule,
    SqsModule,
    MessageModule,  // Añade MessageModule a los imports
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-group-id',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, VentaController],
  providers: [
    AppService,
    VentaService,
    { provide: 'VentaRepository', useClass: VentaRepositoryImpl },
  ],
})
export class AppModule {}
