import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateBasketDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: string
    
    @ApiProperty()
    @IsNotEmpty()
    readonly productId: string
}