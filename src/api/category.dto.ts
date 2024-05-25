import { ApiProperty } from "@nestjs/swagger"

export class CategoryDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly value: string

    @ApiProperty()
    readonly brand: string
}