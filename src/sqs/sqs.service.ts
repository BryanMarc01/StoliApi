/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string = 'https://sqs.us-east-2.amazonaws.com/211125389226/ColaSqs';
  private readonly logger = new Logger(SqsService.name);

  constructor() {
    this.sqsClient = new SQSClient({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      },
    });
  }

  async sendMessage(messageBody: string): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: messageBody,
    });

    try {
      const response = await this.sqsClient.send(command);
      this.logger.log(`Message sent successfully: ${response.MessageId}`);
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
    }
  }

  async receiveMessages(): Promise<void> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
    });

    try {
      const response = await this.sqsClient.send(command);
      if (response.Messages) {
        for (const message of response.Messages) {
          this.logger.log(`Received message: ${message.Body}`);
          // Process the message here

          // Delete the message after processing
          await this.deleteMessage(message.ReceiptHandle);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to receive messages: ${error.message}`);
    }
  }

  private async deleteMessage(receiptHandle: string): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    try {
      await this.sqsClient.send(command);
      this.logger.log(`Message deleted successfully`);
    } catch (error) {
      this.logger.error(`Failed to delete message: ${error.message}`);
    }
  }
}
