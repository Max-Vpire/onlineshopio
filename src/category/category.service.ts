import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BrandsService } from 'src/brands/brands.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        private brandsService: BrandsService
    ) { }

    async create(dto: CreateCategoryDto) {
        const brand = await this.brandsService.findByValue(dto.brand);
        if (!brand) {
            throw new HttpException('The brand with this value not found for creating category', HttpStatus.NOT_FOUND)
        }
        const category = await this.categoryModel.create(dto)
            .then(category => {
                return category
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });

        return category;
    }

    async findAll() {
        const category = await this.categoryModel.find()
            .then(category => {
                return category
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });

        return category;
    }

    async findById(idx: ObjectId) {
        const category = await this.categoryModel.findById(idx)
            .then(category => {
                return category
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        if (!category) {
            throw new HttpException('The category with this ID not found...', HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async findByValue(val: string) {
        const category = await this.categoryModel.findOne({ value: val })
            .then(category => {
                return category;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        if (!category) {
            throw new HttpException('The category with this value not found...', HttpStatus.NOT_FOUND)
        }

        return category;
    }

    async findByBrands(brand: string) {
        const checkBrand = await this.brandsService.findByValue(brand);
        if (!checkBrand) {
            throw new HttpException('The brand with this value not found...', HttpStatus.NOT_FOUND)
        }

        const category = await this.categoryModel.find({ brand: brand })
            .then(category => {
                return category;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });

        if (!category) {
            throw new HttpException(`Category in the brand ${brand} not created away`, HttpStatus.NOT_FOUND)
        }

        return category;
    }

    async SearchCategory(value: string) {
        const category = await this.categoryModel.find({value: {$regex: value}})
        .then(category => {
            return category;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
        
        if(!category.length){
            throw new HttpException('Category not found...', HttpStatus.NOT_FOUND);
        }
        return category;
    }

    async doubleSelect(val: string, brand: string) {
        const category = await this.categoryModel.findOne({value: val, brand: brand})
        .then(category => {
            return category;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });

        if(!category) {
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async SearchByBrand(brand: string) {
        const searchedBrand = await this.categoryModel.find({brand: {$regex: brand}})
        .then(brand => {
            return brand;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
        
        if(!brand.length){
            throw new HttpException('Brand with this value is not found...', HttpStatus.NOT_FOUND);
        }
        return brand;
    }

    async editCategory(idx: ObjectId, dto: UpdateCategoryDto) {
        const newCategory = await this.categoryModel.findByIdAndUpdate(idx, {
            value: dto.value
        })
            .then(category => {
                return category;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!newCategory) {
            throw new HttpException('The category with this ID not found...', HttpStatus.NOT_FOUND)
        }

        return newCategory;
    }

    async Remove(idx: ObjectId) {
        const category = await this.categoryModel.findByIdAndDelete(idx)
            .then(category => {
                return category;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!category) {
            throw new HttpException('The category with this ID not found for removing', HttpStatus.NOT_FOUND)
        }

        return category;
    }

}
