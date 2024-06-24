/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message/schemas/message.schema';
import { MESSAGE_MODEL_NAME } from '../message/schemas/message.schema';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private messages: string[] = [];

  constructor(
    @InjectModel(MESSAGE_MODEL_NAME) private readonly messageModel: Model<Message>,
  ) {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'my-group-id' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const receivedMessage = message.value.toString();
        console.log({
          partition,
          offset: message.offset,
          value: receivedMessage,
        });
        this.messages.push(receivedMessage);
        await this.saveMessageToMongoDB(receivedMessage);
      },
    });
  }

  async saveMessageToMongoDB(message: string) {
    // Verifica si this.messageModel es un constructor
    if (typeof this.messageModel !== 'function') {
      console.error('messageModel is not a constructor:', this.messageModel);
      throw new Error('messageModel is not a constructor');
    }
    
    const newMessage = new this.messageModel({ value: message });
    await newMessage.save();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage(message: { message: string }) {
    await this.producer.send({
      topic: 'test-topic',
      messages: [{ value: message.message }],
    });
  }

  getMessages() {
    return this.messages;
  }
}
