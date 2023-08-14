import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from "@nestjs/microservices"

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy
    ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
     const product = await this.productService.create(createProductDto);
     console.log(product);

     this.client.emit("product_created", product);
     return product;
  }

  @Get()
  findAll() {
    this.client.emit('hello', "Hello from another server");
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
