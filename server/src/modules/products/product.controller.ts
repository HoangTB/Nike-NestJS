import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Query,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { multerUpload } from '../../utils/multer';

@Controller('/api/v1/products')
export class ProductController {
  constructor(public ProductService: ProductService) {}
  @Get('/')
  getProduct() {
    return this.ProductService.getProduct();
  }
  @Get('/last')
  getProductLast() {
    return this.ProductService.getProductLast();
  }
  @Get('/search')
  searchProductType(@Query() query: { type: string }) {
    return this.ProductService.searchProductType(query);
  }
  @Get('/search-price')
  searchProductPrice(
    @Query() query: { type: string; minPrice: number; maxPrice: number },
  ) {
    return this.ProductService.searchProductPrice(query);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.ProductService.getProductById(id);
  }

  @Post('/create')
  postProduct() {
    return this.ProductService.postProduct();
  }

  @Post('/admin-create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerUpload),
  )
  postProductNotJson(@UploadedFiles() files: any, @Body() data: ProductDTO) {
    if (files.image) {
      data.image = files.image[0].path;
    }
    return this.ProductService.postProductNotJson(data);
  }
  @Delete('/delete/:id')
  deleteProductById(@Param('id') id: number) {
    return this.ProductService.deleteProductById(id);
  }
  @Patch('/update/:id')
  updateProductById(@Body() data: ProductDTO, @Param('id') id: number) {
    return this.ProductService.updateProductById(data, id);
  }
  @Patch('/admin-update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerUpload),
  )
  updateProductNotJson(
    @UploadedFiles() files: any,
    @Body() data: ProductDTO,
    @Param('id') id: number,
  ) {
    if (files.image) {
      data.image = files.image[0].path;
    }
    return this.ProductService.updateProductNotJson(data, id);
  }
}
