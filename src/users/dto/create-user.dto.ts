import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3,10)
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3,10)
    surname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    number: number

    @ApiProperty()
    @IsNotEmpty()
    @Length(8,15)
    password: string
}