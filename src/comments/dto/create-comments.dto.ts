import { IsNotEmpty, IsString } from "class-validator"
import { Products } from "src/schemas/products.schema"
import { User } from "src/schemas/users.schema"

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    readonly value: string

    @IsNotEmpty()
    readonly productId: string
    
    @IsNotEmpty()
    readonly userId: string
}