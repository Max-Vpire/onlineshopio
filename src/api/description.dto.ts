import { ApiProperty } from "@nestjs/swagger";

export class DescriptionDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly description: string
    
    @ApiProperty()
    readonly products: string
}