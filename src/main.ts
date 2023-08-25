import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import e, { Express, NextFunction, json } from 'express';
import { Server } from 'http';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import express from 'express';
import { ArrayValidationModule } from './array-validation/array-validation.module';
import { developmentBodyParsermiddleware } from './development-body-parser-middleware';
let cachedServer: Server;
async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    ArrayValidationModule,
    new ExpressAdapter(expressApp)
  );
  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createExpressApp(expressApp);
  app.use(json())
  await app.init();
  return createServer(expressApp);
}
export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }

  console.log("EVENTO BODY", event.body)
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}