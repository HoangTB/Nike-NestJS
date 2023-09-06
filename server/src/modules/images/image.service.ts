import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './database/image.entity';
import { ImageDTO } from './dto/image.dto';
import * as ImageJson from '../../libraries/database/image.json';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Images)
    private ImageRepo: Repository<Images>,
  ) {}
  async postImage(): Promise<{ message: string }> {
    try {
      const jsonData = ImageJson as ImageDTO[];
      await Promise.all(
        jsonData.map(async (data) => {
          const image = this.ImageRepo.create(data);
          await this.ImageRepo.save(image);
        }),
      );
      return { message: 'Created Successfully' };
    } catch (err) {
      return { message: err };
    }
  }
  async postImageNotJson(data: ImageDTO): Promise<{ message: string }> {
    try {
      const images = this.ImageRepo.create(data);
      await this.ImageRepo.save(images);
      return { message: 'Created Successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }
  async updateImageNotJson(data: ImageDTO, id: number) {
    try {
      const imageFind = await this.ImageRepo.findOneBy({ product_id: id });

      if (imageFind) {
        await this.ImageRepo.update({ product_id: id }, data);
        return { message: 'Updated Success' };
      }
    } catch (err) {
      return { message: err.message };
    }
  }
}
