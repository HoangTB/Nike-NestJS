import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './database/review.entity';
import { ReviewDTO } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Reviews)
    private ReviewRepo: Repository<Reviews>,
  ) {}
  async getReview(): Promise<ReviewDTO[] | { message: string }> {
    try {
      const review = await this.ReviewRepo.find();
      return review;
    } catch (err) {
      return { message: err.message };
    }
  }

  async getReviewId(id: number): Promise<ReviewDTO[] | { message: string }> {
    try {
      const review = await this.ReviewRepo.find({
        where: { product_id: id },
      });
      return review;
    } catch (err) {
      return { message: err.message };
    }
  }
  async getReviewIdProMegUser(
    id: number,
  ): Promise<ReviewDTO[] | { message: string }> {
    try {
      const review = await this.ReviewRepo.find({
        where: { product_id: id },
        relations: ['User'],
      });
      return review;
    } catch (err) {
      return { message: err.message };
    }
  }
  async createReview(data: ReviewDTO): Promise<{ message: string }> {
    try {
      const review = this.ReviewRepo.create(data);
      await this.ReviewRepo.save(review);
      return { message: 'Create Successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }
}
