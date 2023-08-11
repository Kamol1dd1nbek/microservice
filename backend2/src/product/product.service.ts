import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    const products = await this.productModel.find({});
    if (products.length === 0) {
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
    return products;
  }

  async findOne(id: number) {
    const product = await this.productModel.findOne({ id });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { id },
      updateProductDto,
      {
        new: true,
      },
    );
    if (updatedProduct) {
      return {
        statusCode: 200,
        message: 'Successfully updated',
      };
    }
    throw new HttpException(`Product not found with id: ${id}`, HttpStatus.OK);
  }

  async remove(id: number) {
    const removedProduct = await this.productModel.findOneAndDelete({ id });
    if (removedProduct) {
      return {
        statusCode: 200,
        message: 'Successfully deleted',
      };
    }
    throw new HttpException(
      `Product not found with id: ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
