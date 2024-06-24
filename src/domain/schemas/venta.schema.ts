/* eslint-disable prettier/prettier */
// src/domain/schemas/venta.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Venta extends Document {
  @Prop({ required: true })
  producto: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  fecha: Date;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);
