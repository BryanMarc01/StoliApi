/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaService } from './kafka.service';
import { MessageSchema, MESSAGE_MODEL_NAME } from '../message/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MESSAGE_MODEL_NAME, schema: MessageSchema }]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}

