import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Colors } from 'src/schemas/colors.schema';
import { Products } from 'src/schemas/products.schema';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
    constructor(
        @InjectModel(Colors.name) private colorsModel: Model<Colors>,
        @InjectModel(Products.name) private productsModel: Model<Products>,
    ) { }

    async create({ productId, ...dto }: CreateColorDto) {
        const findProduct = await this.productsModel.findById(productId)
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!findProduct) throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);

        const newColor = await this.colorsModel.create({ ...dto, product: productId })
            .then(color => {
                return color;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findProduct.updateOne({
            $push: {
                colors: newColor._id
            },
        })
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });


        return newColor;
    }


    async findAll() {
        const colors = await this.colorsModel.find()
            .then(colors => {
                return colors;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        return colors;
    }

    async findById(idx: ObjectId) {
        const color = await this.colorsModel.findById(idx)
            .then(color => {
                return color;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!color) {
            throw new HttpException('Color not found!', HttpStatus.NOT_FOUND);
        }

        return color;

    }

    async findByProductId(productId: string) {
        const colors = await this.colorsModel.find({ product: productId })
            .then(colors => {
                return colors;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!colors) {
            throw new HttpException('Colors not found!', HttpStatus.NOT_FOUND);
        }

        return colors;
    }

    async delete(idx: ObjectId) {
        const color = await this.colorsModel.findByIdAndDelete(idx)
            .then(color => {
                return color;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!color) {
            throw new HttpException('Colors not found!', HttpStatus.NOT_FOUND);
        }

        return color;
    }

}
