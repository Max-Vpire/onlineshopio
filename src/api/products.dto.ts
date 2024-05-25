import { ApiProperty } from "@nestjs/swagger"
import { Colors } from "src/schemas/colors.schema"
import { Comments } from "src/schemas/comments.schema"
import { Descripions } from "src/schemas/description.schema"
import { Rates } from "src/schemas/rates.schema"

export class ProductsDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly brand: string

    @ApiProperty()
    readonly category: string

    @ApiProperty()
    readonly price: number

    @ApiProperty()
    readonly image: string

    @ApiProperty()
    readonly count: number

    @ApiProperty({example: ['_id']})
    readonly colors: Colors[];

    @ApiProperty({example: ['_id']})
    readonly descriptions: Descripions[];

    @ApiProperty({example: ['_id']})
    readonly comments: Comments[]

    @ApiProperty({example: ['_id']})
    readonly rates: Rates[]
}