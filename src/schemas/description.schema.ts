import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as MongooseSchema from 'mongoose'
import { Products } from "./products.schema";

@Schema()
export class Descripions {
    @Prop() description: string
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Products' })
    products: Products
}

export const DescripionsSchema = SchemaFactory.createForClass(Descripions);