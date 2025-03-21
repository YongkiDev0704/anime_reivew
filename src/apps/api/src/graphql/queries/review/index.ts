import { AniReview } from "@pnani/shared";
import { ReviewModel } from "@pnani/core";

import { Resolver } from "../../types";

export const getReviewByUsername: Resolver<
  {
    username: string;
  }, {
    success: boolean;
    erorr?: string;
    data?: AniReview
  }
> = async (_, { username }) => {
  try {
    const data = await ReviewModel.findOne({ username }).lean();

    return {
      success: true,
      data: data || undefined
    };
    
  } catch (e: any) {

    return {
      success: false,
      error: e.message
    }

  }
};
