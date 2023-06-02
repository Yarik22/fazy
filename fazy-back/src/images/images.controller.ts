import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import * as multer from 'multer';
import * as path from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() image:multer.Multer.File): Promise<string> {
    return await this.imagesService.savePicture(image);
  }

  @Get()
  getAllImagesNames() {
    const imagesDirectory = path.join(__dirname, '..', 'pictures');
    const imageNames = fs.readdirSync(imagesDirectory);
    return imageNames;
  }

  @Get(':filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, '..', 'pictures', filename);
    res.sendFile(imagePath);
  }

  @Post('swap')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@UploadedFiles() images:multer.Multer.File[]) {
    console.log(images)
    return await images;
  }

  @Delete(':filename')
  async deleteImage(@Param('filename') filename: string) {
    const imagePath = path.join(__dirname, '..', 'pictures', `${filename}`);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return true;
      }
      console.log('Image deleted successfully.');
    });
  }
}
