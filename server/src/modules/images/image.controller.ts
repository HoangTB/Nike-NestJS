import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { multerUpload } from '../../utils/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ImageDTO } from './dto/image.dto';

@Controller('/api/v1/images')
export class ImageController {
  constructor(private readonly ImageService: ImageService) {}
  @Post()
  postImage() {
    return this.ImageService.postImage();
  }
  @Post('/admin-create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 4 }], multerUpload),
  )
  postImageNotJson(@UploadedFiles() files: any, @Body() data: ImageDTO) {
    console.log(111, files);
    if (files.images) {
      data.image_1 = files.images[0].path;
      data.image_2 = files.images[1].path;
      data.image_3 = files.images[2].path;
      data.image_4 = files.images[3].path;
    }
    return this.ImageService.postImageNotJson(data);
  }

  @Patch('/admin-update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 4 }], multerUpload),
  )
  updateImageNotJson(
    @UploadedFiles() files: any,
    @Body() data: ImageDTO,
    @Param('id') id: number,
  ) {
    if (files.images) {
      data.image_1 = files.images[0].path;
      data.image_2 = files.images[1].path;
      data.image_3 = files.images[2].path;
      data.image_4 = files.images[3].path;
    }
    return this.ImageService.updateImageNotJson(data, id);
  }
}
