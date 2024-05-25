import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Comments } from "./comments.schema";
import { Rates } from "./rates.schema";
import { Basket } from "./basket.schema";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class User {
   @ApiProperty()
   @Prop() 
   name: string

   @ApiProperty()
   @Prop() 
   surname: string

   @ApiProperty()
   @Prop({unique: true}) 
   number: number

   @ApiProperty()
   @Prop() 
   password: string

   @ApiProperty()
   @Prop()
   role: string

   @ApiProperty()
   @Prop({default: false}) 
   banned: boolean

   @ApiProperty({example: ['_id']})
   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]})
   comments: Comments[]

   @ApiProperty({example: ['_id']})
   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rates'}]})
   rates: Rates[]

   @ApiProperty({example: ['_id']})
   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Basket'}]})
   basket: Basket[]
}

export const UsersSchema = SchemaFactory.createForClass(User)