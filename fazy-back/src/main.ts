import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import path from "path";
import express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000, () => console.log("Ported on " + 3000));
}
bootstrap();
