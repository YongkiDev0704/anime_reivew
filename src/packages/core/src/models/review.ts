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
  declare public review_rating: string;

  @prop({ required: true })
  declare public review_comment: string;

  // Possibly need update later?
  @prop({ required: false, default: "101010" })
  declare public review_password: string;

  @prop({ required: true })
  declare public anilist_id: number;

  @prop({ required: true })
  declare public anime_name: string;
  
};

export const ReviewModel: ReturnModelType<typeof Review> = 
  getModelForClass(Review);
  