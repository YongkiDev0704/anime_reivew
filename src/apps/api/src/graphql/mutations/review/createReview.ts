import argon2 from "argon2";

import { ReviewModel } from "@pnani/core";
import { AniReview } from "@pnani/shared";

import { Resolver } from "../../types";

export const createReview: Resolver<
  {
    data: Pick<
      AniReview,
      "username" |
      "review_rating" |
      "review_comment" |
      "review_password" |
      "anilist_id" |
      "anime_name"
    >;
  }, {
    success: boolean;
    error?: string;
  }
> = async (_, { data }) => {

  if(data.review_password) {
    const hashedP = await argon2.hash(data.review_password);
    data.review_password = hashedP;
  }

  try {
    const review = await ReviewModel.create(data);

    return {
      success: true
    };

  } catch (e: any) {

    return {
      success: false,
      error: e.message,
    } as any;

  }
};
