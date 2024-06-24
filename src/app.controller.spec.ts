import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsService } from './sqs/sqs.service';
import { KafkaService } from './kafka/kafka.service';
import { Message } from './message/schemas/message.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        KafkaService,
        SqsService,
        {
          provide: getModelToken(Message.name),
          useValue: {}, // Mock Message model
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
