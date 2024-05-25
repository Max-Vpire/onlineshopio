import { ObjectId } from "mongoose";

export class PayloadDto {
    readonly id: ObjectId
    readonly name: string
    readonly surname: string
    readonly number: number
    readonly password: string
    readonly banned: boolean
}