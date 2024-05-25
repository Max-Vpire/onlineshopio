import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Products } from 'src/schemas/products.schema';
import { User } from 'src/schemas/users.schema';
import { CreateRateDto } from './dto/create-rates.dto';
import { Rates } from 'src/schemas/rates.schema';


@Injectable()
export class RatesService {

    constructor(
        @InjectModel(Rates.name) private ratesModel: Model<Rates>,
        @InjectModel(Products.name) private productsModel: Model<Products>,
        @InjectModel(User.name) private usersModel: Model<User>,
    ) { }

    async create({ userId, productId, ...dto }: CreateRateDto) {

        const findUser = await this.usersModel.findById(userId)
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!findUser) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

        const findProduct = await this.productsModel.findById(productId)
            .then(product => {
                return product;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!findProduct) throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);

        const newRate = await this.ratesModel.create({
            ...dto,
            product: productId,
            user: userId
        })
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findUser.updateOne({
            $push: {
                rates: newRate._id
            }
        })
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findProduct.updateOne({
            $push: {
                rates: newRate._id
            }
        })
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return newRate;
    }

    async findAll() {
        const rates = await this.ratesModel.find()
            .then(rates => {
                return rates;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return rates;
    }

    async findById(idx: ObjectId) {
        const rate = await this.ratesModel.findById(idx)
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!rate) {
            throw new HttpException('Rate not found!', HttpStatus.NOT_FOUND);
        }

        return rate;

    }

    async findByProductId(idx: ObjectId) {
        const rates = await this.ratesModel.find({ product: idx })
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!rates) {
            throw new HttpException('Rates not found!', HttpStatus.NOT_FOUND);
        }

        return rates;

    }

    async findByUserId(idx: ObjectId) {
        const rates = await this.ratesModel.find({ user: idx })
            .then(rates => {
                return rates;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!rates) {
            throw new HttpException('Rates not found!', HttpStatus.NOT_FOUND);
        }

        return rates;

    }

    async delete(idx: ObjectId) {
        const rate = await this.ratesModel.findByIdAndDelete(idx)
            .then(rate => {
                return rate;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!rate) {
            throw new HttpException('Rate not found!', HttpStatus.NOT_FOUND);
        }

        return rate;
    }

}