import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    readonly value: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    readonly brand: string
}