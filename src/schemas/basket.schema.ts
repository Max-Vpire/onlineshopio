import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { Products } from "./products.schema";
import * as mongoose from "mongoose"

@Schema()
export class Basket {
    @Prop({ 
        type: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }] 
    }) product: Products
    @Prop({ 
        type: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }] 
    }) user: User
}

export const BasketSchema = SchemaFactory.createForClass(Basket);