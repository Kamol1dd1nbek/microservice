import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    await app.listen(3000, () => console.log(`Server is running on port: 3000`));
  } catch (error) {
    console.log(error);
  }
}
start();