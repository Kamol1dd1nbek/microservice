import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, image } = createProductDto;
    return this.productRepository.save({ title, image });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    if ( products.length === 0 ) {
      throw new HttpException("Products not found", HttpStatus.NOT_FOUND)
    }
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if ( !product ) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<{
    statusCode: number,
    message: string
  }> {
    const updatedProduct = await this.productRepository.update({ id }, updateProductDto);
    if ( updatedProduct.affected ===1 ) {
      return {
        statusCode: 200,
        message: "Successfully updated"
      }
    }
    throw new HttpException(`Product not found with id: ${id}`, HttpStatus.OK);
  }

  async remove(id: number): Promise<{
    statusCode: number,
    message: string
  }> {
    const removedProduct = await this.productRepository.delete({ id });
    if ( removedProduct.affected ===1 ) {
      return {
        statusCode: 200,
        message: "Successfully deleted"
      }
    }
    throw new HttpException(`Product not found with id: ${id}`, HttpStatus.NOT_FOUND);
  }
}