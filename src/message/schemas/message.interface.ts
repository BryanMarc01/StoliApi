/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Message extends Document {
  message: string;
  timestamp: Date;
}
