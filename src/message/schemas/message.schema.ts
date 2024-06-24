/* eslint-disable prettier/prettier */
// src/schemas/message.schema.ts
// message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop()
  value: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const MESSAGE_MODEL_NAME = 'Message';
