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

    // 로그인 한 유저는 password 가 필요 없으므로 나중에 user id 나 name 을 확인하는 식으로 짜야함
    const review = await ReviewModel.findOneAndUpdate(
        { _id: data._id, review_password: data.review_password },
        {
            $set: {
                review_rating: data.review_rating,
                review_comment: data.review_comment
            }
        },
        { new: true } // Updated Data return, necessary?
    );

    if (!review) {
        throw new Error("Review not found or Incorrect password");
    }

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
