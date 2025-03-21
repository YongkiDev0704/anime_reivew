import * as users from "./user";
import * as reviews from "./review"

export const Mutation = {
  ...users,
  ...reviews
};
