import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Roles {
    @Prop({unique: true}) value: string
}

export const RolesSchema = SchemaFactory.createForClass(Roles);