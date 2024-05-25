import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"



export class CreateRateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly rate: number

    @ApiProperty()
    @IsNotEmpty()
    readonly productId: string
    
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: string
}