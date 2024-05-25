import { ApiProperty } from "@nestjs/swagger";

export class BasketDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly product: string
    
    @ApiProperty()
    readonly user: string
}