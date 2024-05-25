import { ApiProperty } from "@nestjs/swagger"

export class ColorDto {
    
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly color: string

    @ApiProperty()
    readonly code: string

    @ApiProperty()
    readonly product: string
}