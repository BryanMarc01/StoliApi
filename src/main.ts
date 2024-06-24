/* eslint-disable prettier/prettier */
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();  // Cargar las variables de entorno desde el archivo .env

  console.log('AWS_REGION:', process.env.AWS_REGION);
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
  console.log('SQS_QUEUE_URL:', process.env.SQS_QUEUE_URL);
  console.log('KAFKA_BROKER:', process.env.KAFKA_BROKER);
  console.log('KAFKA_GROUP_ID:', process.env.KAFKA_GROUP_ID);
  console.log('MONGO_URL:', process.env.MONGO_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(8080);
}
bootstrap();
