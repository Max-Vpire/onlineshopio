import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Products } from "./products.schema";
import { User } from "./users.schema";


export enum rates {
    half = 0.5,
    one = 1,
    halfone = 1.5,
    two = 2,
    halftwo = 2.5,
    three = 3,
    halfthree = 3.5,
    four = 4,
    halffour = 4.5,
    five = 5
}

@Schema()
export class Rates {
    @Prop({type: Number, enum: rates})
    rate: number

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product: Products

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User
}

export const RatesSchema = SchemaFactory.createForClass(Rates);