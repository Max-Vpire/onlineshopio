import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Descripions } from 'src/schemas/description.schema';
import { Products } from 'src/schemas/products.schema';
import { CreateDecriptionDto } from './dto/create-description.dto';

@Injectable()
export class DescriptionsService {
    constructor(
        @InjectModel(Descripions.name) private descriptionModel: Model<Descripions>,
        @InjectModel(Products.name) private productsModel: Model<Products>,
    ) { }

    async create({ productId, ...dto }: CreateDecriptionDto) {
        const findProduct = await this.productsModel.findById(productId)
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!findProduct) throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);

        const newDescription = await this.descriptionModel.create({ ...dto, products: productId })
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findProduct.updateOne({
            $push: {
                descriptions: newDescription._id
            }
        })
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return newDescription;

    }

    async findAll() {
        const descriptions = await this.descriptionModel.find()
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return descriptions;
    }

    async findById(idx: ObjectId) {
        const description = await this.descriptionModel.findById(idx)
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!description) {
            throw new HttpException('Description not found!', HttpStatus.NOT_FOUND);
        }

        return description;
    }

    async findByProductId(productId: ObjectId) {
        const description = await this.descriptionModel.find({ products: productId })
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return description;
    }

    async editDescription(idx: ObjectId, val: string) {
        const description = await this.descriptionModel.findByIdAndUpdate(idx, {
            description: val
        })
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!description) {
            throw new HttpException('Description not found!', HttpStatus.NOT_FOUND);
        }

        return description;
    }

    async deleteDescription(idx: ObjectId) {
        const description = await this.descriptionModel.findByIdAndDelete(idx)
            .then(description => {
                return description;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!description) {
            throw new HttpException('Description not found!', HttpStatus.NOT_FOUND);
        }

        return description;
    }

}