import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  file(@UploadedFile() image): string {
    return image;
  }
}
