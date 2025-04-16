import argon2 from "argon2";

import { ReviewModel } from "@pnani/core";
import { AniReview } from "@pnani/shared";

import { Resolver } from "../../types";

export const deleteReview: Resolver<
  {
    data: Pick<AniReview, "_id" | "review_password">;
  },
  {
    success: boolean;
    error?: string;
  }
> = async (_, { data }) => {
  try {
    const review = await ReviewModel.findById(data._id);

    if (!review) {
      throw new Error("Review not found");
    }

    if (review.review_password) {
      if (!data.review_password) {
        throw new Error("Password is required to delete this review");
      }

    const matchPass = await argon2.verify(review.review_password, data.review_password);
      if (!matchPass) {
        throw new Error("Incorrect password");
      }
    }

    await review.deleteOne();

    return {
      success: true,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
};
