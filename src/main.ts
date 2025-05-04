import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { resolve } from 'path';
import chalk from 'chalk';
import * as Table from 'cli-table3';

config({ path: resolve("./config/.env") });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce Application')
    .setDescription('API documentation for my E-commerce application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const table = new Table({
    head: ['Service Name', 'Status', 'Link'], 
    colWidths: [50, 15, 50], 
    style: { 'head': ['green'], 'border': ['green'] }
  });

  table.push(
    ['Server', chalk.green('🟢 Active'), chalk.blue.bold(`http://localhost:${port}`)],
    ['API Docs', chalk.green('🟢 Available'), chalk.blue.bold(`http://localhost:${port}/api-docs`)]
  );
  await app.listen(port)
  console.log(table.toString())
}

bootstrap();
