import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Products } from "./products.schema";
import { User } from "./users.schema";

@Schema()
export class Comments {
    @Prop() 
    value: string
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]})
    product: Products
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    user: User
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);