import { AniReview } from "@pnani/shared";
import { ReviewModel } from "@pnani/core";

import { Resolver } from "../../types";

export const getReviewsByUsername: Resolver<
  {
    username: string;
  }, {
    success: boolean;
    erorr?: string;
    data?: AniReview[]
  }
> = async (_, { username }) => {
  try {
    const data = await ReviewModel.find({ username }).lean();

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

export const getReviewsByAnilistId: Resolver<
  {
    anilist_id: number;
  }, {
    success: boolean;
    erorr?: string;
    data?: AniReview[]
  }
> = async (_, { anilist_id }) => {
  try {
    const data = await ReviewModel.find({ anilist_id }).lean();

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