import { AniReview } from "@pnani/shared";
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
export class Review extends AniReview {
  // Not required, but we set it as anonymous if there is no input
  @prop({ required: false, default: "Anonymous" })
  declare public username?: string;

  @prop({ required: true })
  declare public review_rating: number;

  @prop({ required: true })
  declare public review_comment: string;
};

export const ReviewModel: ReturnModelType<typeof Review> = 
  getModelForClass(Review);
  