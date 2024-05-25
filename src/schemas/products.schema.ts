import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Colors } from "./colors.schema";
import { Descripions } from "./description.schema";
import { Comments } from "./comments.schema";
import { Rates } from "./rates.schema";


@Schema()
export class Products {
    @Prop({unique: true}) name: string
    @Prop({unique: true}) brand: string
    @Prop({unique: true}) category: string
    @Prop() price: number
    @Prop({unique: true}) image: string
    @Prop() count: number
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Colors' }] })
    colors: Colors[];
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Descriptions'}]})
    descriptions: Descripions[];
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]})
    comments: Comments[]
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rates'}]})
    rates: Rates[]
}

export const ProductsSchema = SchemaFactory.createForClass(Products)