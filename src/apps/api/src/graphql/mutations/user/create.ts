import { UserModel } from "@pnani/core";
import { IUser } from "@pnani/shared";

import { Resolver } from "../../types";

export const createUser: Resolver<
  {
    data: Pick<
      IUser,
      "email" |
      "password" |
      "userRole" 
    >;
  }, {
    success: boolean;
    error?: string;
    user?: IUser
  }
> = async (_, { data }) => {
  try {
    const user = await UserModel.create(data);

    return {
      success: true,
      user
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    } as any;
  }
};
