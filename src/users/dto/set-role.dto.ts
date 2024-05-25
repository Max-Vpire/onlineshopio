import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SetRoleDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly role: string
}