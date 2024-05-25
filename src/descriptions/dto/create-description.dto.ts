import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDecriptionDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly productId: string
}   