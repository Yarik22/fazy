import { Injectable } from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import * as multer from "multer";
import * as fs from "fs";

@Injectable()
export class ImagesService {
  async savePicture(file: multer.Multer.File): Promise<string> {
    const pictureName = `${Date.now()}-${file.originalname}`;
    const picturePath = `dist/pictures/${pictureName}`;

    // Create the directory if it doesn't exist
    if (!fs.existsSync("dist/pictures")) {
      fs.mkdirSync("dist/pictures", { recursive: true });
    }

    // Save the picture to the specified path
    fs.writeFileSync(picturePath, file.buffer);

    return picturePath;
  }
}
