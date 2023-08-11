import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const start = async () => {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [''],
          queue: 'main_products_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    );
    await app.listen();
  } catch (error) {
    console.log(error);
  }
};
start();
