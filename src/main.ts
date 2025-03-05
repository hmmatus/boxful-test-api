import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  const server = app.getHttpServer();
  const address = server.address();
  console.log(
    `Application is running on: http://${address.address}:${address.port}`,
  );
}
bootstrap();
