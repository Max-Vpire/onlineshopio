import { ApiProperty } from "@nestjs/swagger";

export class UpdateDescriptionDto {
    @ApiProperty()
    readonly description: string
}