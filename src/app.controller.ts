/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { SqsService } from './sqs/sqs.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafkaService: KafkaService,
    private readonly sqsService: SqsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send/kafka')
  async sendKafkaMessage(@Body('message') message: string) {
    try {
      await this.kafkaService.sendMessage({ message });
      return { message: 'Message sent to Kafka successfully' };
    } catch (error) {
      console.error('Error sending message to Kafka:', error);
      throw error;
    }
  }

  @Get('receive/kafka')
  async receiveKafkaMessages() {
    const messages = this.kafkaService.getMessages();
    return { messages };
  }

  @Post('send/sqs')
  async sendSqsMessage(@Body('message') message: string) {
    try {
      await this.sqsService.sendMessage(message);
      return { message: 'Message sent to SQS successfully' };
    } catch (error) {
      console.error('Error sending message to SQS:', error);
      throw error;
    }
  }

  @Get('receive/sqs')
  async receiveSqsMessages() {
    try {
      await this.sqsService.receiveMessages();
      return { message: 'Messages received and processed from SQS successfully' };
    } catch (error) {
      console.error('Error receiving messages from SQS:', error);
      throw error;
    }
  }
}
