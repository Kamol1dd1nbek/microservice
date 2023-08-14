import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Product ]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://gapwmdal:kIspfXDETGc0WLvc6Yx_9Ogfu0hgyVan@toad.rmq.cloudamqp.com/gapwmdal'],
          queue: 'main_products_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
