import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { FavoriteDTO } from './dto/favorites.dto';

@Controller('/api/v1/favorite')
export class FavoriteController {
  constructor(private readonly FavoriteService: FavoriteService) {}
  @Get()
  getFavorite() {
    return this.FavoriteService.getFavorite();
  }
  @Get('/:id')
  getFavoriteID(@Param('id') id: number) {
    return this.FavoriteService.getFavoriteID(id);
  }
  @Post()
  createFavorite(@Body() data: FavoriteDTO) {
    return this.FavoriteService.createFavorite(data);
  }
  @Delete('/:id')
  deleteFavoriteID(@Param('id') id: number) {
    return this.FavoriteService.deleteFavoriteID(id);
  }
}
