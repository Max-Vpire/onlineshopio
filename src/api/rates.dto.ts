import { ApiProperty } from "@nestjs/swagger"

export class RatesDto {

    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly rate: number

    @ApiProperty()
    product: string

    @ApiProperty()
    readonly user: string
}