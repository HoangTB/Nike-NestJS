import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './database/product.entity';
import { ProductDTO } from './dto/product.dto';
import * as ProductJson from '../../libraries/database/product.json';
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
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  }): Promise<ProductDTO[] | { message: string }> {
    try {
      let queryBuilder = this.ProductRepo.createQueryBuilder(
        'Products',
      ).leftJoinAndSelect('Products.Image', 'Image');

      if (query.type) {
        if (Array.isArray(query.type)) {
          // Nếu query.type là một mảng
          queryBuilder = queryBuilder.where('Products.type IN (:...types)', {
            types: query.type,
          });
        } else {
          queryBuilder = queryBuilder.where('Products.type = :type', {
            type: query.type,
          });
        }
      }

      if (query.minPrice && query.maxPrice) {
        queryBuilder = queryBuilder.andWhere(
          'Products.price BETWEEN :minPrice AND :maxPrice',
          {
            minPrice: query.minPrice,
            maxPrice: query.maxPrice,
          },
        );
      }

      const products = await queryBuilder.getMany();
      return products;
    } catch (err) {
      return { message: err.message || 'Error searching product' };
    }
  }
  async searchProductName(query: {
    name: string;
  }): Promise<ProductDTO[] | { message: string }> {
    console.log(query);

    try {
      let queryBuilder = this.ProductRepo.createQueryBuilder(
        'Products',
      ).leftJoinAndSelect('Products.Image', 'Image');
      if (query.name) {
        queryBuilder = queryBuilder.where('Products.name LIKE :name', {
          name: `%${query.name}%`,
          // Dấu % ở đầu và cuối để tìm kiếm bất kỳ chữ nào chứa trong name
        });
      }
      const products = await queryBuilder.getMany();
      return products;
    } catch (err) {
      return { message: err.message };
    }
  }

  async searchProductManager(query: {
    type: string;
  }): Promise<ProductDTO[] | { message: string }> {
    try {
      let queryBuilder = this.ProductRepo.createQueryBuilder(
        'Products',
      ).leftJoinAndSelect('Products.Image', 'Image');

      if (query.type === 'All') {
        queryBuilder = queryBuilder;
      } else if (query.type === 'Price A - Z') {
        queryBuilder = queryBuilder.orderBy('Products.name', 'ASC');
      } else if (query.type === 'Price Z - A') {
        queryBuilder = queryBuilder.orderBy('Products.name', 'DESC');
      } else if (
        query.type === "Men's Shoes" ||
        query.type === "Woman's Shoes" ||
        query.type === "Kid's Shoes"
      ) {
        queryBuilder = queryBuilder.where('Products.type = :type', {
          type: query.type,
        });
      } else if (query.type === 'Quantity Inventory < 5') {
        queryBuilder = queryBuilder.where('Products.quantity_inventory <= 5');
      } else {
        queryBuilder = queryBuilder;
      }
      const products = await queryBuilder.getMany();
      console.log(products);

      return products;
    } catch (err) {
      return { message: err.message };
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
      const currentProduct = await this.ProductRepo.findOneBy({ id });
      if (currentProduct) {
        const newStatus = currentProduct.status === 0 ? 1 : 0;
        await this.ProductRepo.update(id, { status: newStatus });
        return { message: 'Delete Successfully' };
      }
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
