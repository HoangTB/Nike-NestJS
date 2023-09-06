import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDTO } from './dto/review.dto';

@Controller('/api/v1/review')
export class ReviewController {
  constructor(private readonly ReviewService: ReviewService) {}
  @Get()
  getReviewIdUser() {
    return this.ReviewService.getReviewIdUser();
  }
  @Get('/proID-user/:id')
  getReviewIdProMegUser(@Param('id') id: number) {
    return this.ReviewService.getReviewIdProMegUser(id);
  }
  @Post()
  createReview(@Body() data: ReviewDTO) {
    return this.ReviewService.createReview(data);
  }
}
