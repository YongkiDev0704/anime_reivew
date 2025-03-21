import { BaseEntity } from "./base";

export class IReview extends BaseEntity {

  /**
   * username of user posting review
   */
  public review_rating!: number;

  /**
   * animation review that are written by user
   */
  public review_comment!: string;
};
