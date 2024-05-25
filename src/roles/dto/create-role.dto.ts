import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly value: string
}