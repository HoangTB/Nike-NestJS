import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './database/favorites.entity';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
