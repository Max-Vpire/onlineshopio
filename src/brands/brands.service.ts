import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Brands } from 'src/schemas/brands.schema';
import { CreateBrandsDto } from './dto/create-brands.dto';

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brands.name) private brandsModel: Model<Brands>) { }

    async create(dto: CreateBrandsDto) {
        const brand = await this.brandsModel.create(dto)
            .then(brand => {
                return brand
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return brand;
    }

    async findAll() {
        const brands = await this.brandsModel.find()
            .then(brands => {
                return brands;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return brands
    }

    async findById(idx: ObjectId) {
        const brand = await this.brandsModel.findById(idx)
            .then(brand => {
                return brand;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!brand) {
            throw new HttpException('Brand with this ID is not found...', HttpStatus.NOT_FOUND);
        }

        return brand;
    }

    async findByValue(value: string) {
        const brand = await this.brandsModel.findOne({value: value})
            .then(brand => {
                return brand;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!brand) {
            throw new HttpException('Brand with this value is not found...', HttpStatus.NOT_FOUND);
        }

        return brand;
    }

    async searchByValue(value: string) {
        const brands = await this.brandsModel.find({value: {$regex: value}})
        .then(brands => {
            return brands;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
        
        if(!brands.length){
            throw new HttpException('Brands with this value is not found...', HttpStatus.NOT_FOUND);
        }
        return brands;
    }

    async update(idx: ObjectId, dto: CreateBrandsDto) {
        const newBrand = await this.brandsModel.findByIdAndUpdate(idx, {
            value: dto.value
        }).then(newbrand => {
            return newbrand
           })
          .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
          });

          return newBrand;
    }

    async delete(idx: ObjectId) {
        const brand = await this.brandsModel.findByIdAndDelete(idx)
        .then(brand => {
            return brand;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!brand){
            throw new HttpException('Brand with this value is not found for removing...', HttpStatus.NOT_FOUND);
        }

        return brand;
    }

}
