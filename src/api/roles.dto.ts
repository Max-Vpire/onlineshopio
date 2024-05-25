import { ApiProperty } from "@nestjs/swagger"

export class RolesDto {
    @ApiProperty()
    readonly _id: string

    @ApiProperty()
    readonly value: string
}