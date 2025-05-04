import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRoles } from "src/common/types";
interface Avatar {
    public_id: string;
    secure_url: string;
  }
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class user {
    @Prop({ type: String, required: true, minlength: 2, maxlength: 20, match: /^[a-zA-Z0-9]+$/, })
    userName: string;
    @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
    displayName: string;
    @Prop({ type: String, required: true, unique: true, trim: true })
    email: string;
    @Prop({ type: String, required: true, minlength: 8, maxlength: 80, select: false })
    password: string;    
    @Prop({ type: Boolean, default: false })
    confirmed: boolean;
    @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
    role: string;
    @Prop({type: {public_id: { type: String, required: true },secure_url: { type: String, required: true },},required: true,})
    avatar: Avatar;
    @Prop({ type: Number, default: 0 })
    wins: number;
    @Prop({ type: Number, default: 0 })
    losses: number;
}
export type userDocument = HydratedDocument<user> & { _id: string };
export const userSchema = SchemaFactory.createForClass(user);