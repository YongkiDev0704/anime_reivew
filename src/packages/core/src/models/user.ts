import { IUser, UserRole } from "@pnani/shared";
import { 
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType
} from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class User extends IUser {
  @prop({ required: true })
  declare public email: string;

  @prop({ required: true })
  declare public password: string;

  @prop({ required: true })
  declare public userRole: UserRole;
};

export const UserModel: ReturnModelType<typeof User> = 
  getModelForClass(User);
  