import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './database/favorites.entity';
import { FavoriteDTO } from './dto/favorites.dto';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorites)
    private FavoriteRepo: Repository<Favorites>,
  ) {}
  async getFavorite(): Promise<FavoriteDTO[] | { message: string }> {
    try {
      const favorites = await this.FavoriteRepo.find();
      return favorites;
    } catch (err) {
      return { message: err.message };
    }
  }
  async getFavoriteID(
    id: number,
  ): Promise<FavoriteDTO[] | { message: string }> {
    try {
      const favorite = await this.FavoriteRepo.find({
        where: { user_id: id },
        relations: ['Product'],
      });
      return favorite;
    } catch (err) {
      return { message: err.message };
    }
  }
  async createFavorite(data: FavoriteDTO): Promise<{ message: string }> {
    try {
      const favorites = await this.FavoriteRepo.findOne({
        where: {
          product_id: data.product_id,
          user_id: data.user_id,
        },
      });
      if (!favorites) {
        const favorite = this.FavoriteRepo.create(data);
        await this.FavoriteRepo.save(favorite);
        return { message: 'Create Successfully' };
      } else {
        return { message: 'The product is already in favorite' };
      }
    } catch (err) {
      return { message: 'Please Login !' };
    }
  }
  async deleteFavoriteID(id: number): Promise<{ message: string }> {
    try {
      const favorites = await this.FavoriteRepo.findOneBy({ product_id: id });
      if (favorites) {
        await this.FavoriteRepo.delete({ product_id: id });
        return { message: 'Delete Successfully' };
      } else {
        return { message: 'The product is not in favorites' };
      }
    } catch (err) {
      return { message: err.message };
    }
  }
}
