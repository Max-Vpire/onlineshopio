import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comments } from 'src/schemas/comments.schema';
import { Products } from 'src/schemas/products.schema';
import { User } from 'src/schemas/users.schema';
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comments.name) private commentsModel: Model<Comments>,
        @InjectModel(Products.name) private productsModel: Model<Products>,
        @InjectModel(User.name) private usersModel: Model<User>,
    ) { }

    async create({ userId, productId, ...dto }: CreateCommentDto) {

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

        const newComment = await this.commentsModel.create({
            ...dto,
            product: productId,
            user: userId
        })
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findUser.updateOne({
            $push: {
                comments: newComment._id
            }
        })
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        await findProduct.updateOne({
            $push: {
                comments: newComment._id
            }
        })
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return newComment;
    }

    async findAll() {
        const comments = await this.commentsModel.find()
            .then(comments => {
                return comments;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        return comments;
    }

    async findById(idx: ObjectId) {
        const comment = await this.commentsModel.findById(idx)
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!comment) {
            throw new HttpException('Comments not found!', HttpStatus.NOT_FOUND);
        }

        return comment;
    }


    async findByUserId(userId: ObjectId) {
        const comment = await this.commentsModel.find({ user: userId })
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!comment) {
            throw new HttpException('Comments not found!', HttpStatus.NOT_FOUND);
        }

        return comment;

    }

    async findByProductId(productId: ObjectId) {
        const comment = await this.commentsModel.find({ product: productId })
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!comment) {
            throw new HttpException('Comments not found!', HttpStatus.NOT_FOUND);
        }

        return comment;

    }

    async delete(idx: ObjectId) {
        const comment = await this.commentsModel.findByIdAndDelete(idx)
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!comment) {
            throw new HttpException('Comments not found!', HttpStatus.NOT_FOUND);
        }

        return comment;

    }

}