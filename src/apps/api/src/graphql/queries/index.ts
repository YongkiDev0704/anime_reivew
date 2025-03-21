import * as users from "./user";
import * as reviews from "./review"

export const Query: any = {
  ...users,
  ...reviews
};
