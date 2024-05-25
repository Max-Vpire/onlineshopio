import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
    @ApiProperty()
    readonly value: string
}