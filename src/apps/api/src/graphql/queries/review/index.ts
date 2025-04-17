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

    const formattedData = data.map((review) => ({
      ...review,
      id: review._id.toString(),  // map _id into plain id
    }));

    return {
      success: true,
      data: formattedData || []
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

    const formattedData = data.map((review) => ({
      ...review,
      id: review._id.toString(),  // map _id into plain id
    }));

    return {
      success: true,
      data: formattedData || []
    };
    
  } catch (e: any) {

    return {
      success: false,
      error: e.message
    }

  }
};

type ReviewAverageResult = {
  averageRating: string;
  totalReviews: number;
};

export const getReviewAverageByAnilistId: Resolver <
  {
    anilist_id: number;
  }, {
    success: boolean;
    error?: string;
    data?: ReviewAverageResult;
  }
> = async (_, { anilist_id }) => {
  try {

    const data = await ReviewModel.aggregate([
      { $match: { anilist_id } },
      {
        $set: {
          review_rating_num: { $toDouble: "$review_rating" }, // String → Number
        },
      },
      {
        $group: {
          _id: "$anilist_id",
          averageRating: { $avg: "$review_rating_num" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const average = data[0]?.averageRating ?? 0;
    const total = data[0]?.totalReviews ?? 0;

    // Make it to 2 decimal string ex.(8.51).
    const formattedAverage = average.toFixed(2);

    return {
      success: true,  
      data: {
        averageRating: formattedAverage,
        totalReviews: total,
      } 
    }

  } catch (e: any) {
    return {
      success: false,
      error: e.message
    }
  }
};