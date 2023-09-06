import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './database/product.entity';
import { ProductDTO } from './dto/product.dto';
import * as ProductJson from '../../libraries/database/product.json';
import { Between } from 'typeorm';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private ProductRepo: Repository<Products>,
  ) {}

  async getProduct(): Promise<ProductDTO[] | { message: string }> {
    try {
      const products = await this.ProductRepo.find({
        relations: ['Image'],
      });
      return products;
    } catch (err) {
      return { message: err };
    }
  }
  async getProductLast(): Promise<ProductDTO | { message: string }> {
    try {
      const products = await this.ProductRepo.find();
      if (products.length > 0) {
        const lastProduct = products.pop();
        return lastProduct;
      } else {
        return { message: 'No products found' };
      }
    } catch (err) {
      return { message: err };
    }
  }

  async searchProductType(query: {
    type: string;
  }): Promise<ProductDTO[] | { message: string }> {
    try {
      let queryBuilder = this.ProductRepo.createQueryBuilder(
        'Products',
      ).leftJoinAndSelect('Products.Image', 'Image');
      if (Array.isArray(query.type)) {
        // Nếu type là một mảng
        const products = await queryBuilder
          .where('Products.type IN (:...types)', { types: query.type })
          .getMany();
        return products;
      } else {
        const products = await queryBuilder
          .where('Products.type = :type', { type: query.type })
          .getMany();
        return products;
      }
    } catch (err) {
      return { message: err.message || 'Error searching product' };
    }
  }

  async searchProductPrice(query: {
    type: string;
    minPrice: number;
    maxPrice: number;
  }): Promise<ProductDTO[] | { message: string }> {
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const type = query.type;

    try {
      const products = await this.ProductRepo.createQueryBuilder('Products')
        .leftJoinAndSelect('Products.Image', 'Image') // Thay thế 'image' bằng tên quan hệ thực tế của bạn.
        .where('Products.type IN (:...type)', { type })
        .andWhere('Products.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        })
        .getMany();
      return products;
    } catch (err) {
      return { message: err };
    }
  }
  async getProductById(id: number): Promise<ProductDTO | { message: string }> {
    try {
      const product = await this.ProductRepo.findOne({
        where: { id },
        relations: ['Image'],
      });
      return product;
    } catch (err) {
      return { message: err };
    }
  }

  async postProduct(): Promise<{ message: string }> {
    try {
      const jsonData = ProductJson as ProductDTO[];
      await Promise.all(
        jsonData.map(async (data) => {
          const product = this.ProductRepo.create(data);
          await this.ProductRepo.save(product);
        }),
      );
      return { message: 'Create Successfully' };
    } catch (err) {
      return { message: err };
    }
  }
  async postProductNotJson(data: ProductDTO): Promise<{ message: string }> {
    try {
      const product = this.ProductRepo.create(data);
      await this.ProductRepo.save(product);
      return { message: 'Create Successfully' };
    } catch (err) {
      return { message: err };
    }
  }
  async deleteProductById(id: number): Promise<{ message: string }> {
    try {
      await this.ProductRepo.delete({ id });
      return { message: 'Delete Successfully' };
    } catch (err) {
      return { message: err };
    }
  }
  async updateProductById(
    data: ProductDTO,
    id: number,
  ): Promise<{ message: string }> {
    try {
      const dataFind = await this.ProductRepo.findOneBy({ id });
      if (dataFind) {
        await this.ProductRepo.update(id, data);
        return { message: 'Update Successfully' };
      } else {
        return { message: 'Product not found' };
      }
    } catch (err) {
      return { message: err };
    }
  }

  async updateProductNotJson(data: ProductDTO, id: number) {
    try {
      const dataFind = await this.ProductRepo.findOneBy({ id });
      if (dataFind) {
        await this.ProductRepo.update(id, data);
        return { message: 'Update Successfully' };
      }
    } catch (err) {
      return { message: err };
    }
  }
}
