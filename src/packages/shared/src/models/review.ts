import { BaseEntity } from "./base";

export class AniReview extends BaseEntity {

  /**
   * username of user posting review
   */
  public username?: string;

  /**
   * rating score given by user posting review
   */
  public review_rating!: number;

  /**
   * animation review that are written by user
   */
  public review_comment!: string;
};
