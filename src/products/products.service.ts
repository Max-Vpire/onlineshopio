import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Products } from 'src/schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name) private productsModel: Model<Products>,
        private categoryService: CategoryService
    ) { }

    async create(dto: CreateProductDto) {

        const checkBrand = await this.categoryService.doubleSelect(dto.category, dto.brand)
            .then(caategory => {
                return caategory;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!checkBrand) {
            throw new HttpException(`The brand not found`, HttpStatus.NOT_FOUND);
        }

        const product = await this.productsModel.create(dto)
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return product;
    }

    async findAll() {
        const products = await this.productsModel.find()
            .then(products => {
                return products;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return products;
    }

    async findById(idx: ObjectId) {
        const product = await this.productsModel.findById(idx)
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!product) {
            throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
        }

        return product;
    }

    async searchByName(name: string) {
        const products = await this.productsModel.find({name: {$regex: name}})
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        return products;
    }

    async searchByCategory(category: string) {
        const products = await this.productsModel.find({category: {$regex: category}})
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        return products;
    }

    async searchByBrands(brand: string) {
        const products = await this.productsModel.find({brand: {$regex: brand}})
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        return products;
    }

    async SelectByPrice(price: number) {
        const products = await this.productsModel.find({price: price})
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        if(!products.length) {
            throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);

        }

        return products;
    }

    async sellProduct(idx: ObjectId) {
        const findById = await this.findById(idx);
        if(!findById) {
            throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
        }

        const product = await this.productsModel.findByIdAndUpdate(idx, {
            count: findById.count -1
        })
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        return product;
    }

    async PlusCountOfProduct(prod: number, idx: ObjectId) {
        const product = await this.productsModel.findByIdAndUpdate(idx, {
            count: prod
        })
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        if(!product) {
            throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
        }

        return product;
    }

    async delete(idx: ObjectId) {
        const product = await this.productsModel.findByIdAndDelete(idx)
        .then(products => {
            return products;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        });

        if(!product) {
            throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
        }

        return product;
    }

}
