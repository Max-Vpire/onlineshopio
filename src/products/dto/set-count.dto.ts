import { ApiProperty } from "@nestjs/swagger";

export class SetCountDto {
    @ApiProperty()
    readonly count: number
}