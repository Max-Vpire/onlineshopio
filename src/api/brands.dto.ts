import { ApiProperty } from "@nestjs/swagger";

export class BrandsDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly value: string
}