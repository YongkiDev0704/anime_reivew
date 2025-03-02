import { UserModel } from "@pnani/core";
import { IUser } from "@pnani/shared";

import { Resolver } from "../../types";

export const getUserByEmail: Resolver<
  {
    email: string;
  }, {
    success: boolean;
    erorr?: string;
    data?: IUser
  }
> = async (_, { email }) => {
  try {
    const data = await UserModel.findOne({ email }).lean();

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
