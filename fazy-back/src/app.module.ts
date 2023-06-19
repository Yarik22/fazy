import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ImagesModule } from "./images/images.module";

@Module({
  imports: [ImagesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
