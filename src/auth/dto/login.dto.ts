import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, Length } from "class-validator"

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly number: number

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string
}