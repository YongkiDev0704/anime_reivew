import argon2 from "argon2";

import { ReviewModel } from "@pnani/core";
import { AniReview } from "@pnani/shared";

import { Resolver } from "../../types";

export const editReview: Resolver<
  {
    data: Pick<
      AniReview,
      "_id" |
      "review_rating" |
      "review_comment" |
      "review_password"
    >;
  }, {
    success: boolean;
    error?: string;
  }
> = async (_, { data }) => {
  try {

    const review = await ReviewModel.findById(data._id);
    
    if (!review) {
      throw new Error("Review not found");
    }

    // 로그인 한 유저는 password 가 필요 없으므로 나중에 user id 나 name 을 확인하는 식으로 짜야함
    if (review.review_password) {
      // 로그인 한 유저가 아닌 경우 Password 가 Web 에서 제대로 건너 왔는지 확인
      if (!data.review_password) {
        throw new Error("Password is required to edit this review");
      }
      
      // Password Verify
      const matchPass = await argon2.verify(review.review_password, data.review_password);
      if (!matchPass) {
        throw new Error("Incorrect password");
      }
    }

    review.review_rating = data.review_rating;
    review.review_comment = data.review_comment;
    await review.save();

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
