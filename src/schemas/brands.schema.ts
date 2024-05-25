import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type BrandsDocument = HydratedDocument<Brands>;

@Schema()
export class Brands {
    @ApiProperty()
    @Prop({unique: true}) value: string
}

export const BrandsSchema = SchemaFactory.createForClass(Brands)