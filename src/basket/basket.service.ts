import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Basket } from 'src/schemas/basket.schema';
import { User } from 'src/schemas/users.schema';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Products } from 'src/schemas/products.schema';

@Injectable()
export class BasketService {
    
    constructor(
        @InjectModel(User.name) private usersModel: Model<User>,
        @InjectModel(Basket.name) private basketModel: Model<Basket>,
        @InjectModel(Products.name) private productsModel: Model<Products>
    ) {}

    async create({userId, productId}: CreateBasketDto) {
        const findUser = await this.usersModel.findById(userId)
        .then(user => {
            return user;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!findUser) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }

        const findProuct = await this.productsModel.findById(productId)
        .then(product => {
            return product;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!findProuct) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }

        const newBasket = await this.basketModel.create({user: userId, product: productId})

        await findUser.updateOne({
            $push: {
                basket: newBasket._id
            }
        })

        return newBasket;

    }

    async findAll() {
        const baskets = await this.basketModel.find()
        .then(baskets => {
            return baskets;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        return baskets;
    }

    async findById(idx: ObjectId) {
        const basket = await this.basketModel.findById(idx)
        .then(basket => {
            return basket;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!basket) {
            throw new HttpException('Baket not found!', HttpStatus.NOT_FOUND);
        }

        return basket;
    }

    async findByUserId(userIdx: ObjectId) {
        const basket = await this.basketModel.find({user: userIdx})
        .then(basket => {
            return basket;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!basket.length) {
            throw new HttpException('Basket is empty!', HttpStatus.OK);
        }

        return basket;

    }

    async findByProductId(productIdx: ObjectId) {
        const basket = await this.basketModel.find({product: productIdx})
        .then(basket => {
            return basket;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!basket.length) {
            throw new HttpException('Basket not found!', HttpStatus.OK);
        }

        return basket;
    }

    async delete(idx: ObjectId) {
        const basket = await this.basketModel.findByIdAndDelete(idx)
        .then(basket => {
            return basket;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });

        if(!basket) {
            throw new HttpException('Basket not found!', HttpStatus.OK);
        }

        return basket;

    }

}