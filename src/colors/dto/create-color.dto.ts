import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly color: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly code: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly productId: string
}