import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "./images.service";
import * as multer from "multer";
import * as path from "path";
import { Response } from "express";
import * as fs from "fs";
import * as childProcess from "child_process";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // Upload a single image
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @UploadedFile() image: multer.Multer.File
  ): Promise<string> {
    return await this.imagesService.savePicture(image);
  }

  // Get the names of all images
  @Get()
  getAllImagesNames() {
    const imagesDirectory = path.join(__dirname, "..", "pictures");
    const imageNames = fs.readdirSync(imagesDirectory);
    return imageNames;
  }

  // Get an image by filename
  @Get(":filename")
  getImage(@Param("filename") filename: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, "..", "pictures", filename);
    res.sendFile(imagePath);
  }

  // Swap faces in two images
  @Post("swap")
  @UseInterceptors(FilesInterceptor("files"))
  async uploadImages(
    @UploadedFiles() images: multer.Multer.File[],
    @Res() res: Response
  ) {
    const imageBuffer1 = images[0].buffer;
    const imageBuffer2 = images[1].buffer;
    const tempImageFile1 = path.join(
      __dirname,
      "..",
      "temp",
      "temp_image1.png"
    );
    const tempImageFile2 = path.join(
      __dirname,
      "..",
      "temp",
      "temp_image2.png"
    );
    fs.writeFileSync(tempImageFile1, imageBuffer1);
    fs.writeFileSync(tempImageFile2, imageBuffer2);

    // Execute Python script for face swapping
    const pythonScript = path.join(
      __dirname,
      "..",
      "python",
      "photos_face_swapping.py"
    );
    const pythonProcess = childProcess.spawn("python", [
      pythonScript,
      tempImageFile1,
      tempImageFile2,
    ]);

    // Clean up swapped face directory
    const directoryPath = path.join(__dirname, "..", "swapped_face");
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      // Iterate over the files and delete each one
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }

          console.log("File deleted:", filePath);
        });
      });
    });

    // Handle Python script output
    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString().trim());
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code === 0) {
        fs.unlinkSync(tempImageFile1);
        fs.unlinkSync(tempImageFile2);
        console.log("Temporary image files deleted.");

        // Send the swapped image back to the client
        const imagePath = path.join(__dirname, "..", "swapped_face");
        const imageSwappedName = fs.readdirSync(imagePath);
        res.send(imageSwappedName);
      }
    });
  }

  // Delete an image by filename
  @Delete(":filename")
  async deleteImage(@Param("filename") filename: string) {
    const imagePath = path.join(__dirname, "..", "pictures", `${filename}`);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
        return true;
      }
      console.log("Image deleted successfully.");
    });
  }

  // Get a swapped image by filename
  @Get("swap/:filename")
  getSwappedImage(@Param("filename") filename: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, "..", "swapped_face", filename);
    res.sendFile(imagePath);
  }
}
