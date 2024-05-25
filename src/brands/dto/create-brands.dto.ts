import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBrandsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @ApiProperty()
    readonly value: string
}