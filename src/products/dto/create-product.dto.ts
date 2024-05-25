import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    readonly brand: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    readonly category: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly image: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly count: number
}