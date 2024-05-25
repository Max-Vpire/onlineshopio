import { ApiProperty } from "@nestjs/swagger"

export class CommentsDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly value: string

    @ApiProperty()
    readonly product: string

    @ApiProperty()
    readonly user: string
}