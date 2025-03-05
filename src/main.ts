import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Boxful API')
    .setDescription('Boxful API for test application')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(3000);
  const server = app.getHttpServer();
  const address = server.address();
  console.log(
    `Application is running on: http://${address.address}:${address.port}`,
  );
}
bootstrap();
