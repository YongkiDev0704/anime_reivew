import { ReviewModel } from "@pnani/core";
import { AniReview } from "@pnani/shared";

import { Resolver } from "../../types";

export const createReview: Resolver<
  {
    data: Pick<
      AniReview,
      "username" |
      "review_rating" |
      "review_comment" 
    >;
  }, {
    success: boolean;
    error?: string;
    review?: AniReview
  }
> = async (_, { data }) => {
  try {
    const review = await ReviewModel.create(data);

    return {
      success: true,
      review
    };

  } catch (e: any) {

    return {
      success: false,
      error: e.message,
    } as any;

  }
};
