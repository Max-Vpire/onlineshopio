import { ApiProperty } from "@nestjs/swagger"
import { Basket } from "src/schemas/basket.schema"
import { Comments } from "src/schemas/comments.schema"
import { Rates } from "src/schemas/rates.schema"

export class UsersDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly name: string
 
    @ApiProperty()
    readonly surname: string
 
    @ApiProperty()
    readonly number: number
 
    @ApiProperty()
    readonly password: string
 
    @ApiProperty()
    readonly role: string
 
    @ApiProperty()
    readonly banned: boolean
 
    @ApiProperty({example: ['_id']})
    readonly comments: Comments[]
 
    @ApiProperty({example: ['_id']})
    readonly rates: Rates[]
 
    @ApiProperty({example: ['_id']})
    readonly basket: Basket[]
}