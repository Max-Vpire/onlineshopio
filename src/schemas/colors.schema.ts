import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as MongooseSchema from 'mongoose'
import { Products } from "./products.schema";

@Schema()
export class Colors {
    @Prop({unique: true}) color: string
    @Prop({unique: true}) code: string
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Products' })
    product: Products
}

export const ColorsSchema = SchemaFactory.createForClass(Colors);